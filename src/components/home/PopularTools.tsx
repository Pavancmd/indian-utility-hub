import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { popularTools } from "../../data/tools";

function getToolPath(toolName: string) {
  const paths: Record<string, string> = {
    "Unit Converter": "/unit-converter",
    "EMI Calculator": "/emi-calculator",
    "Percentage Calculator": "/percentage-calculator",
    "Age Calculator": "/age-calculator",
    "Image Compressor": "/image-compressor",
    "JPG to PDF": "/jpg-to-pdf",
    "CGPA Calculator": "/cgpa-calculator",
    "Attendance Calculator": "/attendance-calculator",
    "BMI Calculator": "/bmi-calculator",
    "Time Converter": "/time-converter",
    "Weight Converter": "/weight-converter",
    "GST Calculator": "/gst-calculator",
  };

  return paths[toolName] || "#";
}

export default function PopularTools() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleToolClick = (toolName: string) => {
    const path = getToolPath(toolName);

    if (path !== "#") {
      window.location.href = path;
    }
  };

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-50/70 py-16 sm:py-20"
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={`popular-tools-glow absolute -left-32 top-20 h-64 w-64 rounded-full bg-white/80 blur-3xl ${
            isVisible ? "popular-tools-glow-active" : ""
          }`}
        />

        <div
          className={`popular-tools-glow-two absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-slate-200/40 blur-3xl ${
            isVisible ? "popular-tools-glow-two-active" : ""
          }`}
        />
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes popularToolsReveal {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes popularToolsHeadingReveal {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes popularToolsGlow {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(35px, -20px, 0);
          }
        }

        @keyframes popularToolsGlowTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(-30px, 20px, 0);
          }
        }

        .popular-tools-heading {
          opacity: 0;
        }

        .popular-tools-heading-active {
          animation: popularToolsHeadingReveal 0.65s ease-out forwards;
        }

        .popular-tool-card {
          opacity: 0;
        }

        .popular-tool-card-active {
          animation: popularToolsReveal 0.65s ease-out forwards;
        }

        .popular-tools-glow-active {
          animation: popularToolsGlow 10s ease-in-out infinite;
        }

        .popular-tools-glow-two-active {
          animation: popularToolsGlowTwo 12s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .popular-tools-heading,
          .popular-tool-card {
            opacity: 1;
          }

          .popular-tools-heading-active,
          .popular-tool-card-active,
          .popular-tools-glow-active,
          .popular-tools-glow-two-active {
            animation: none !important;
          }
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div
          className={`popular-tools-heading ${
            isVisible ? "popular-tools-heading-active" : ""
          } mb-8 flex items-end justify-between gap-4`}
        >
          <div>
            <p className="text-sm font-semibold text-slate-500">
              START HERE
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Popular tools
            </h2>
          </div>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="hidden text-sm font-semibold text-slate-700 transition duration-200 hover:text-slate-950 sm:block"
          >
            View all
          </button>
        </div>

        {/* Tool cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((tool, index) => {
            const Icon = tool.icon;

            return (
              <button
                key={tool.name}
                type="button"
                onClick={() => handleToolClick(tool.name)}
                style={{
                  animationDelay: `${index * 90}ms`,
                }}
                className={`popular-tool-card ${
                  isVisible ? "popular-tool-card-active" : ""
                } group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-300/20 focus:outline-none focus:ring-2 focus:ring-slate-300`}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition duration-300 group-hover:scale-105 group-hover:bg-slate-900 group-hover:text-white group-hover:shadow-md">
                    <Icon size={21} />
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="text-slate-300 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-700"
                  />
                </div>

                <h3 className="mt-5 font-semibold text-slate-950 transition duration-200 group-hover:text-slate-800">
                  {tool.name}
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-slate-500">
                  {tool.description}
                </p>

                <span className="mt-4 inline-block text-xs font-semibold text-slate-400 transition duration-200 group-hover:text-slate-600">
                  {tool.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}