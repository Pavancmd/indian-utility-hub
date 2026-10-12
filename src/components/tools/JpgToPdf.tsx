import { useRef, useState } from "react";

import {
  ArrowDown,
  ArrowUp,
  Download,
  FileImage,
  FileText,
  RotateCcw,
  Trash2,
  Upload,
} from "lucide-react";

import { jsPDF } from "jspdf";

import ToolHeader from "../layout/ToolHeader";

type ImageItem = {
  id: string;
  file: File;
  preview: string;
};

type PageSize = "a4" | "original";
type Orientation = "portrait" | "landscape";

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, index)).toFixed(
    index === 0 ? 0 : 2,
  )} ${units[index]}`;
}

export default function JpgToPdf() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] =
    useState<Orientation>("portrait");
  const [quality, setQuality] = useState(90);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const createImageId = () => {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  };

  const addFiles = (files: FileList | File[]) => {
    setError("");

    const validFiles = Array.from(files).filter((file) => {
      return file.type === "image/jpeg" || file.type === "image/png";
    });

    if (validFiles.length === 0) {
      setError("Please select JPG or PNG images.");
      return;
    }

    const oversizedFile = validFiles.find(
      (file) => file.size > 20 * 1024 * 1024,
    );

    if (oversizedFile) {
      setError(
        `${oversizedFile.name} is larger than the 20 MB limit.`,
      );
      return;
    }

    const newImages: ImageItem[] = validFiles.map((file) => ({
      id: createImageId(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((current) => [...current, ...newImages]);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      addFiles(event.target.files);
    }

    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.dataTransfer.files.length > 0) {
      addFiles(event.dataTransfer.files);
    }
  };

  const removeImage = (id: string) => {
    setImages((current) => {
      const image = current.find((item) => item.id === id);

      if (image) {
        URL.revokeObjectURL(image.preview);
      }

      return current.filter((item) => item.id !== id);
    });
  };

  const moveImage = (
    index: number,
    direction: "up" | "down",
  ) => {
    setImages((current) => {
      const newImages = [...current];

      const targetIndex =
        direction === "up" ? index - 1 : index + 1;

      if (
        targetIndex < 0 ||
        targetIndex >= newImages.length
      ) {
        return current;
      }

      [newImages[index], newImages[targetIndex]] = [
        newImages[targetIndex],
        newImages[index],
      ];

      return newImages;
    });
  };

  const resetTool = () => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.preview);
    });

    setImages([]);
    setError("");
    setPageSize("a4");
    setOrientation("portrait");
    setQuality(90);
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => resolve(image);

      image.onerror = () =>
        reject(new Error("Unable to load image."));

      image.src = src;
    });
  };

  const generatePdf = async () => {
    if (images.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const pdf = new jsPDF({
        orientation,
        unit: "mm",
        format: pageSize === "a4" ? "a4" : "a4",
        compress: true,
      });

      for (let index = 0; index < images.length; index++) {
        const item = images[index];

        if (index > 0) {
          pdf.addPage(
            pageSize === "a4" ? "a4" : "a4",
            orientation,
          );
        }

        const image = await loadImage(item.preview);

        const imageWidth = image.naturalWidth;
        const imageHeight = image.naturalHeight;

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const margin = pageSize === "a4" ? 10 : 0;

        const availableWidth = pageWidth - margin * 2;
        const availableHeight = pageHeight - margin * 2;

        const imageRatio = imageWidth / imageHeight;
        const pageRatio =
          availableWidth / availableHeight;

        let renderWidth: number;
        let renderHeight: number;

        if (imageRatio > pageRatio) {
          renderWidth = availableWidth;
          renderHeight = renderWidth / imageRatio;
        } else {
          renderHeight = availableHeight;
          renderWidth = renderHeight * imageRatio;
        }

        const x =
          (pageWidth - renderWidth) / 2;

        const y =
          (pageHeight - renderHeight) / 2;

        const canvas = document.createElement("canvas");

        canvas.width = imageWidth;
        canvas.height = imageHeight;

        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Unable to process image.");
        }

        context.fillStyle = "#ffffff";

        context.fillRect(
          0,
          0,
          imageWidth,
          imageHeight,
        );

        context.drawImage(
          image,
          0,
          0,
          imageWidth,
          imageHeight,
        );

        const imageData = canvas.toDataURL(
          "image/jpeg",
          quality / 100,
        );

        pdf.addImage(
          imageData,
          "JPEG",
          x,
          y,
          renderWidth,
          renderHeight,
          undefined,
          "FAST",
        );
      }

      pdf.save("images-to-pdf.pdf");
    } catch {
      setError(
        "Something went wrong while creating the PDF.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <ToolHeader />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
            <FileText size={26} />
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            JPG to PDF Converter
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Convert multiple JPG or PNG images into a single PDF
            quickly and easily.
          </p>
        </div>

        {/* Main Card */}
        <section className="mx-auto mt-10 max-w-4xl rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {/* Upload */}
          <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="group cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center transition hover:border-slate-400 hover:bg-slate-100"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm transition group-hover:bg-slate-900 group-hover:text-white">
              <Upload size={25} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              Upload images
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Drag & drop JPG or PNG files here or click to browse
            </p>

            <p className="mt-3 text-xs text-slate-400">
              You can select multiple images
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Image List */}
          {images.length > 0 && (
            <div className="mt-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Selected images
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {images.length}{" "}
                    {images.length === 1 ? "image" : "images"} •
                    Arrange the order before creating the PDF.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                >
                  <Upload size={16} />
                  Add more
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3"
                  >
                    {/* Number */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
                      {index + 1}
                    </div>

                    {/* Preview */}
                    <img
                      src={image.preview}
                      alt={`Uploaded image ${index + 1}`}
                      className="h-16 w-16 shrink-0 rounded-xl border border-slate-200 object-cover"
                    />

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {image.file.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {formatFileSize(image.file.size)}
                      </p>
                    </div>

                    {/* Controls */}
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() =>
                          moveImage(index, "up")
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
                        title="Move up"
                      >
                        <ArrowUp size={16} />
                      </button>

                      <button
                        type="button"
                        disabled={
                          index === images.length - 1
                        }
                        onClick={() =>
                          moveImage(index, "down")
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
                        title="Move down"
                      >
                        <ArrowDown size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(image.id)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          {images.length > 0 && (
            <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="font-semibold text-slate-900">
                PDF settings
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {/* Page size */}
                <div>
                  <label
                    htmlFor="pageSize"
                    className="text-sm font-medium text-slate-700"
                  >
                    Page size
                  </label>

                  <select
                    id="pageSize"
                    value={pageSize}
                    onChange={(event) =>
                      setPageSize(
                        event.target.value as PageSize,
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  >
                    <option value="a4">
                      A4
                    </option>

                    <option value="original">
                      Fit to A4
                    </option>
                  </select>
                </div>

                {/* Orientation */}
                <div>
                  <label
                    htmlFor="orientation"
                    className="text-sm font-medium text-slate-700"
                  >
                    Orientation
                  </label>

                  <select
                    id="orientation"
                    value={orientation}
                    onChange={(event) =>
                      setOrientation(
                        event.target.value as Orientation,
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  >
                    <option value="portrait">
                      Portrait
                    </option>

                    <option value="landscape">
                      Landscape
                    </option>
                  </select>
                </div>
              </div>

              {/* Quality */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="pdfQuality"
                    className="text-sm font-medium text-slate-700"
                  >
                    Image quality
                  </label>

                  <span className="text-sm font-semibold text-slate-900">
                    {quality}%
                  </span>
                </div>

                <input
                  id="pdfQuality"
                  type="range"
                  min="50"
                  max="100"
                  value={quality}
                  onChange={(event) =>
                    setQuality(Number(event.target.value))
                  }
                  className="mt-3 w-full accent-slate-900"
                />

                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>Smaller PDF</span>
                  <span>Higher quality</span>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Generate */}
          {images.length > 0 && (
            <button
              type="button"
              onClick={generatePdf}
              disabled={isGenerating}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGenerating ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating PDF...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Convert to PDF
                </>
              )}
            </button>
          )}

          {/* Reset */}
          {images.length > 0 && (
            <button
              type="button"
              onClick={resetTool}
              className="mx-auto mt-5 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
            >
              <RotateCcw size={15} />
              Start over
            </button>
          )}
        </section>

        {/* Information */}
        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-xl font-bold text-slate-950">
            JPG to PDF Converter
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Convert multiple JPG and PNG images into one PDF document.
            Arrange your images in the required order, choose the page
            orientation and create your PDF directly in the browser.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <FileImage
                size={20}
                className="text-slate-700"
              />

              <h3 className="mt-4 font-semibold text-slate-900">
                Multiple images
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Combine multiple images into a single PDF file.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <ArrowUp
                size={20}
                className="text-slate-700"
              />

              <h3 className="mt-4 font-semibold text-slate-900">
                Reorder pages
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Change the image order before generating your PDF.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <Download
                size={20}
                className="text-slate-700"
              />

              <h3 className="mt-4 font-semibold text-slate-900">
                Quick download
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Generate and download your PDF without uploading files
                to a server.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}