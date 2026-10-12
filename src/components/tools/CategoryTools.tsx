import {
  ArrowLeft,
  ArrowUpRight,
  Calculator,
  FileImage,
  FileText,
  GraduationCap,
  RefreshCw,
} from "lucide-react";

type Tool = {
  name: string;
  description: string;
  path: string;
};

type CategoryConfig = {
  title: string;
  description: string;
  icon: typeof Calculator;
  tools: Tool[];
};

const categoryData: Record<string, CategoryConfig> = {
  calculators: {
    title: "Calculators",
    description:
      "Finance, math, health and everyday calculators for quick and accurate results.",
    icon: Calculator,
    tools: [
      {
        name: "EMI Calculator",
        description: "Calculate your monthly loan EMI, interest and total payment.",
        path: "/emi-calculator",
      },
      {
        name: "Percentage Calculator",
        description: "Calculate percentages, increases, decreases and differences.",
        path: "/percentage-calculator",
      },
      {
        name: "Age Calculator",
        description: "Calculate your exact age from your date of birth.",
        path: "/age-calculator",
      },
      {
        name: "BMI Calculator",
        description: "Calculate Body Mass Index using height and weight.",
        path: "/bmi-calculator",
      },
      {
        name: "GST Calculator",
        description: "Calculate GST, CGST, SGST and final invoice amount.",
        path: "/gst-calculator",
      },
    ],
  },

  "image-tools": {
    title: "Image Tools",
    description:
      "Simple browser-based tools for compressing and working with images.",
    icon: FileImage,
    tools: [
      {
        name: "Image Compressor",
        description: "Reduce image file size while keeping good image quality.",
        path: "/image-compressor",
      },
    ],
  },

  "pdf-tools": {
    title: "PDF Tools",
    description:
      "Useful PDF utilities for creating and managing everyday documents.",
    icon: FileText,
    tools: [
      {
        name: "JPG to PDF",
        description: "Convert one or multiple images into a PDF document.",
        path: "/jpg-to-pdf",
      },
    ],
  },

  converters: {
    title: "Converters",
    description:
      "Convert units, weight and time quickly with easy-to-use tools.",
    icon: RefreshCw,
    tools: [
      {
        name: "Unit Converter",
        description: "Convert length, weight and temperature units.",
        path: "/unit-converter",
      },
      {
        name: "Weight Converter",
        description: "Convert kilograms, grams, pounds, ounces and more.",
        path: "/weight-converter",
      },
      {
        name: "Time Converter",
        description: "Convert seconds, minutes, hours, days, weeks and more.",
        path: "/time-converter",
      },
    ],
  },

  "student-tools": {
    title: "Student Tools",
    description:
      "Academic utilities for CGPA, marks, attendance and everyday student calculations.",
    icon: GraduationCap,
    tools: [
      {
        name: "CGPA Calculator",
        description: "Calculate weighted CGPA using subject credits and grades.",
        path: "/cgpa-calculator",
      },
      {
        name: "Attendance Calculator",
        description: "Calculate current attendance and required classes.",
        path: "/attendance-calculator",
      },
    ],
  },
};

function getCategoryKey() {
  const parts = window.location.pathname.split("/");

  return parts[2] || "";
}

export default function CategoryTools() {
  const categoryKey = getCategoryKey();
  const category = categoryData[categoryKey];

  if (!category) {
    window.location.href = "/";
    return null;
  }

  const Icon = category.icon;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
          >
            <ArrowLeft size={18} />
            Back to home
          </button>

          <span className="text-sm font-bold tracking-tight text-slate-950">
            Indian Utility Hub
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Category heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <Icon size={25} />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-500">
            TOOL CATEGORY
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {category.title}
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {category.description}
          </p>
        </div>

        {/* Tools */}
        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                AVAILABLE TOOLS
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-950">
                {category.tools.length}{" "}
                {category.tools.length === 1 ? "tool" : "tools"}
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.tools.map((tool) => (
              <button
                key={tool.name}
                type="button"
                onClick={() => {
                  window.location.href = tool.path;
                }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition duration-200 group-hover:bg-slate-900 group-hover:text-white">
                    <Icon size={21} />
                  </span>

                  <ArrowUpRight
                    size={19}
                    className="text-slate-300 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-700"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  {tool.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {tool.description}
                </p>

                <span className="mt-5 inline-flex items-center text-xs font-semibold text-slate-400 transition group-hover:text-slate-700">
                  Open tool
                  <ArrowUpRight
                    size={13}
                    className="ml-1 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Bottom */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Browse all categories
          </button>
        </div>
      </main>
    </div>
  );
}