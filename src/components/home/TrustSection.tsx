
import {
  ShieldCheck,
  Zap,
  Smartphone,
  Globe2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Privacy-friendly",
    description:
      "Many tools work directly in your browser, so you can use them without creating an account.",
  },
  {
    icon: Zap,
    title: "Fast & simple",
    description:
      "Get useful calculations and conversions instantly without unnecessary steps.",
  },
  {
    icon: Smartphone,
    title: "Works on mobile",
    description:
      "Use Indian Utility Hub comfortably on phones, tablets and desktop devices.",
  },
  {
    icon: Globe2,
    title: "Made for everyday use",
    description:
      "A growing collection of practical tools for students, professionals and everyday tasks.",
  },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-white py-16 sm:py-20"
    >
      {/* Animated background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className={`trust-glow absolute -left-32 top-10 h-72 w-72 rounded-full bg-slate-100/80 blur-3xl ${
            isVisible ? "trust-glow-active" : ""
          }`}
        />

        <div
          className={`trust-glow-two absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-slate-100/70 blur-3xl ${
            isVisible ? "trust-glow-two-active" : ""
          }`}
        />
      </div>

      <style>{`
        @keyframes trustReveal {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes trustGlow {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(28px, -20px, 0);
          }
        }

        @keyframes trustGlowTwo {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-28px, 18px, 0);
          }
        }

        .trust-reveal {
          opacity: 0;
        }

        .trust-reveal-active {
          animation: trustReveal 650ms ease-out forwards;
        }

        .trust-glow-active {
          animation: trustGlow 11s ease-in-out infinite;
        }

        .trust-glow-two-active {
          animation: trustGlowTwo 13s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .trust-reveal {
            opacity: 1;
          }

          .trust-reveal-active,
          .trust-glow-active,
          .trust-glow-two-active {
            animation: none !important;
          }
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className={`trust-reveal ${
            isVisible ? "trust-reveal-active" : ""
          } mx-auto max-w-2xl text-center`}
        >
          <p className="text-sm font-semibold text-slate-500">
            WHY INDIAN UTILITY HUB
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Simple tools you can trust
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Built to make everyday calculations, conversions and document
            tasks quicker and easier.
          </p>
        </div>

        {/* Trust cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;

            return (
              <div
                key={point.title}
                style={{ animationDelay: `${index * 110}ms` }}
                className={`trust-reveal ${
                  isVisible ? "trust-reveal-active" : ""
                } group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-300/20`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white transition duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon size={20} />
                </div>

                <h3 className="mt-5 text-base font-semibold text-slate-950">
                  {point.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom trust message */}
        <div
          style={{ animationDelay: "480ms" }}
          className={`trust-reveal ${
            isVisible ? "trust-reveal-active" : ""
          } mt-8 rounded-2xl border border-slate-200 bg-slate-950 px-5 py-6 text-center transition duration-300 hover:border-slate-700 sm:px-8`}
        >
          <p className="text-sm font-semibold text-white">
            No complicated setup. Just open a tool and get started.
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Indian Utility Hub is designed to keep everyday utilities
            accessible, fast and easy to use.
          </p>
        </div>
      </div>
    </section>
  );
}
