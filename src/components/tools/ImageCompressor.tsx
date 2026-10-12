import { useRef, useState } from "react";

import {
  Download,
  Image as ImageIcon,
  RotateCcw,
  Upload,
  X,
} from "lucide-react";

import ToolHeader from "../layout/ToolHeader";

type CompressedImage = {
  originalFile: File;
  compressedUrl: string;
  compressedBlob: Blob;
  originalSize: number;
  compressedSize: number;
};

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, index)).toFixed(
    index === 0 ? 0 : 2,
  )} ${units[index]}`;
}

function getReductionPercentage(original: number, compressed: number) {
  if (!original) return 0;

  return Math.max(
    0,
    Math.round(((original - compressed) / original) * 100),
  );
}

export default function ImageCompressor() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [compressedImage, setCompressedImage] =
    useState<CompressedImage | null>(null);

  const [quality, setQuality] = useState(75);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState("");

  const resetTool = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (compressedImage?.compressedUrl) {
      URL.revokeObjectURL(compressedImage.compressedUrl);
    }

    setSelectedFile(null);
    setPreviewUrl("");
    setCompressedImage(null);
    setError("");
    setQuality(75);
    setMaxWidth(1920);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileSelect = (file: File | undefined) => {
    if (!file) return;

    setError("");
    setCompressedImage(null);

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError("Image size must be less than 20 MB.");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewUrl(url);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleFileSelect(event.target.files?.[0]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    handleFileSelect(file);
  };

  const compressImage = async () => {
    if (!selectedFile || !previewUrl) return;

    setIsCompressing(true);
    setError("");

    try {
      const image = new Image();

      image.src = previewUrl;

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Unable to load image."));
      });

      let width = image.naturalWidth;
      let height = image.naturalHeight;

      if (width > maxWidth) {
        const ratio = maxWidth / width;

        width = maxWidth;
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Canvas is not supported in this browser.");
      }

      context.drawImage(image, 0, 0, width, height);

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(
          (result) => resolve(result),
          "image/jpeg",
          quality / 100,
        );
      });

      if (!blob) {
        throw new Error("Image compression failed.");
      }

      if (compressedImage?.compressedUrl) {
        URL.revokeObjectURL(compressedImage.compressedUrl);
      }

      const compressedUrl = URL.createObjectURL(blob);

      setCompressedImage({
        originalFile: selectedFile,
        compressedUrl,
        compressedBlob: blob,
        originalSize: selectedFile.size,
        compressedSize: blob.size,
      });
    } catch {
      setError("Something went wrong while compressing the image.");
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadImage = () => {
    if (!compressedImage) return;

    const link = document.createElement("a");

    link.href = compressedImage.compressedUrl;

    const originalName =
      compressedImage.originalFile.name.replace(/\.[^/.]+$/, "");

    link.download = `${originalName}-compressed.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <ToolHeader />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
            <ImageIcon size={26} />
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Image Compressor
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Compress JPG, PNG and other images quickly while reducing file
            size for websites, forms and everyday sharing.
          </p>
        </div>

        {/* Main Card */}
        <section className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {!selectedFile ? (
            <>
              {/* Upload Area */}
              <div
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="group cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center transition hover:border-slate-400 hover:bg-slate-100"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm transition group-hover:bg-slate-900 group-hover:text-white">
                  <Upload size={25} />
                </div>

                <h2 className="mt-5 text-lg font-semibold text-slate-900">
                  Upload an image
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Drag & drop your image here or click to browse
                </p>

                <p className="mt-3 text-xs text-slate-400">
                  Maximum file size: 20 MB
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                />
              </div>
            </>
          ) : (
            <>
              {/* File Information */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <img
                    src={previewUrl}
                    alt="Selected preview"
                    className="h-16 w-16 rounded-xl border border-slate-200 object-cover"
                  />

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {selectedFile.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetTool}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                >
                  <X size={16} />
                  Remove
                </button>
              </div>

              {/* Preview */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <img
                  src={previewUrl}
                  alt="Image preview"
                  className="max-h-[420px] w-full object-contain"
                />
              </div>

              {/* Settings */}
              <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Compression settings
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Adjust quality and maximum image width.
                    </p>
                  </div>
                </div>

                {/* Quality */}
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="quality"
                      className="text-sm font-medium text-slate-700"
                    >
                      Image quality
                    </label>

                    <span className="text-sm font-semibold text-slate-900">
                      {quality}%
                    </span>
                  </div>

                  <input
                    id="quality"
                    type="range"
                    min="20"
                    max="100"
                    value={quality}
                    onChange={(event) =>
                      setQuality(Number(event.target.value))
                    }
                    className="mt-3 w-full accent-slate-900"
                  />

                  <div className="mt-1 flex justify-between text-xs text-slate-400">
                    <span>Smaller file</span>
                    <span>Better quality</span>
                  </div>
                </div>

                {/* Width */}
                <div className="mt-6">
                  <label
                    htmlFor="maxWidth"
                    className="text-sm font-medium text-slate-700"
                  >
                    Maximum width
                  </label>

                  <select
                    id="maxWidth"
                    value={maxWidth}
                    onChange={(event) =>
                      setMaxWidth(Number(event.target.value))
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  >
                    <option value={1920}>1920 px</option>
                    <option value={1600}>1600 px</option>
                    <option value={1280}>1280 px</option>
                    <option value={1024}>1024 px</option>
                    <option value={800}>800 px</option>
                  </select>
                </div>
              </div>

              {/* Compress Button */}
              <button
                type="button"
                onClick={compressImage}
                disabled={isCompressing}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCompressing ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Compressing...
                  </>
                ) : (
                  <>
                    <ImageIcon size={18} />
                    Compress Image
                  </>
                )}
              </button>
            </>
          )}

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Result */}
          {compressedImage && (
            <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-emerald-700">
                    Compression complete
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-950">
                    {formatFileSize(compressedImage.compressedSize)}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Original:{" "}
                    {formatFileSize(compressedImage.originalSize)}
                    {" • "}
                    Reduced by{" "}
                    {getReductionPercentage(
                      compressedImage.originalSize,
                      compressedImage.compressedSize,
                    )}
                    %
                  </p>
                </div>

                <button
                  type="button"
                  onClick={downloadImage}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <Download size={17} />
                  Download
                </button>
              </div>
            </div>
          )}

          {/* Reset */}
          {selectedFile && (
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

        {/* SEO / Information */}
        <section className="mx-auto mt-12 max-w-3xl">
          <h2 className="text-xl font-bold text-slate-950">
            Free Image Compressor
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Reduce image file size directly in your browser. This tool is
            useful when you need smaller images for websites, online forms,
            applications, email attachments and document uploads.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">
                Easy to use
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Upload an image, choose your settings and compress it.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">
                Browser based
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Image processing happens directly in your browser.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">
                Free to use
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                No account or complicated setup is required.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}