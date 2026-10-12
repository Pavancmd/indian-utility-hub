import {
  ArrowRight,
  GraduationCap,
  IndianRupee,
  FileText,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const packs = [
  {
    title: "Student Pack",
    description:
      "Everything students need for marks, CGPA and attendance.",
    icon: GraduationCap,
    path: "/category/student-tools",
  },
  {
    title: "Finance Pack",
    description:
      "Useful calculators for loans, savings and percentages.",
    icon: IndianRupee,
    path: "/category/calculators",
  },
  {
    title: "Document Pack",
    description:
      "Quick image and PDF tools for everyday documents.",
    icon: FileText,
    path: "/category/pdf-tools",
  },
];

export default function ToolPacks() {
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

  const handlePackClick = (path: string) => {
    window.location.href = path;
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-50 py-16 sm:py-20"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={`toolpacks-glow absolute -left-40 top-10 h-72 w-72 rounded-full bg-white/80 blur-3xl ${
            isVisible ? "toolpacks-glow-active" : ""
          }`}
        />

        <div
          className={`toolpacks-glow-two absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-slate-200/50 blur-3xl ${
            isVisible ? "toolpacks-glow-two-active" : ""
          }`}
        />
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes toolPacksHeadingReveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes toolPacksCardReveal {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes toolPacksGlow {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(35px, -20px, 0);
          }
        }

        @keyframes toolPacksGlowTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(-35px, 20px, 0);
          }
        }

        .toolpacks-heading {
          opacity: 0;
        }

        .toolpacks-heading-active {
          animation: toolPacksHeadingReveal 0.7s ease-out forwards;
        }

        .toolpack-card {
          opacity: 0;
        }

        .toolpack-card-active {
          animation: toolPacksCardReveal 0.7s ease-out forwards;
        }

        .toolpacks-glow-active {
          animation: toolPacksGlow 11s ease-in-out infinite;
        }

        .toolpacks-glow-two-active {
          animation: toolPacksGlowTwo 13s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .toolpacks-heading,
          .toolpack-card {
            opacity: 1;
          }

          .toolpacks-heading-active,
          .toolpack-card-active,
          .toolpacks-glow-active,
          .toolpacks-glow-two-active {
            animation: none !important;
          }
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div
          className={`toolpacks-heading ${
            isVisible ? "toolpacks-heading-active" : ""
          } mb-8`}
        >
          <p className="text-sm font-semibold text-slate-500">
            CURATED FOR YOU
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Tool packs
          </h2>
        </div>

        {/* Pack cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {packs.map((pack, index) => {
            const Icon = pack.icon;

            return (
              <button
                key={pack.title}
                type="button"
                onClick={() => handlePackClick(pack.path)}
                style={{
                  animationDelay: `${index * 120}ms`,
                }}
                className={`toolpack-card ${
                  isVisible ? "toolpack-card-active" : ""
                } group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-300/20 focus:outline-none focus:ring-2 focus:ring-slate-300`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white transition duration-300 group-hover:scale-105 group-hover:bg-slate-800 group-hover:shadow-md">
                    <Icon size={22} />
                  </span>

                  <ArrowRight
                    size={19}
                    className="mt-1 text-slate-300 transition duration-300 group-hover:translate-x-1 group-hover:text-slate-700"
                  />
                </div>

                <h3 className="mt-5 text-base font-semibold text-slate-950 transition duration-200 group-hover:text-slate-800">
                  {pack.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {pack.description}
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition duration-200 group-hover:text-slate-950">
                  Explore pack

                  <ArrowRight
                    size={15}
                    className="transition duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}