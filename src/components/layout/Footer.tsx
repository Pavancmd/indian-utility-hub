
import {
  ArrowUpRight,
  Calculator,
  FolderOpen,
  HelpCircle,
  Home,
  Mail,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const quickLinks = [
  { label: "Home", path: "/", icon: Home },
  {
    label: "Calculators",
    path: "/category/calculators",
    icon: Calculator,
  },
  {
    label: "Categories",
    path: "/category/calculators",
    icon: FolderOpen,
  },
  { label: "FAQ", path: "/#faq", icon: HelpCircle },
];

const legalLinks = [
  {
    label: "Privacy Policy",
    path: "/privacy-policy",
    icon: ShieldCheck,
  },
  {
    label: "Terms & Conditions",
    path: "/terms",
    icon: FileText,
  },
  { label: "Contact Us", path: "/contact", icon: Mail },
];

const categoryLinks = [
  { label: "Calculators", path: "/category/calculators" },
  { label: "Image Tools", path: "/category/image-tools" },
  { label: "PDF Tools", path: "/category/pdf-tools" },
  { label: "Converters", path: "/category/converters" },
  { label: "Student Tools", path: "/category/student-tools" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
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
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  const revealClass = isVisible
    ? "footer-reveal-active"
    : "footer-reveal";

  return (
    <footer
      ref={footerRef}
      className="relative isolate overflow-hidden border-t border-slate-200 bg-white"
    >
      <style>{`
        @keyframes footerReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes footerGlow {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(22px, -14px, 0);
          }
        }

        .footer-reveal {
          opacity: 0;
        }

        .footer-reveal-active {
          animation: footerReveal 650ms ease-out forwards;
        }

        .footer-glow-active {
          animation: footerGlow 12s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-reveal {
            opacity: 1;
          }

          .footer-reveal-active,
          .footer-glow-active {
            animation: none !important;
          }
        }
      `}</style>

      {/* Subtle animated background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className={`footer-glow absolute -right-32 -top-32 h-72 w-72 rounded-full bg-slate-100 blur-3xl ${
            isVisible ? "footer-glow-active" : ""
          }`}
        />

        <div
          className={`footer-glow absolute -bottom-36 -left-32 h-72 w-72 rounded-full bg-slate-100/80 blur-3xl ${
            isVisible ? "footer-glow-active" : ""
          }`}
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div
            style={{ animationDelay: "0ms" }}
            className={`${revealClass} group`}
          >
            <button
              type="button"
              onClick={() => handleNavigation("/")}
              className="text-left"
              aria-label="Go to Indian Utility Hub home page"
            >
              <p className="text-lg font-bold tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-slate-600">
                Indian Utility Hub
              </p>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Simple, fast and practical tools for calculations,
                conversions, images and everyday tasks.
              </p>
            </button>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Free everyday utility tools
            </div>
          </div>

          {/* Quick Links */}
          <div
            style={{ animationDelay: "120ms" }}
            className={revealClass}
          >
            <h3 className="text-sm font-semibold text-slate-950">
              Quick links
            </h3>

            <div className="mt-4 space-y-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handleNavigation(link.path)}
                    className="group flex items-center gap-2 text-sm text-slate-500 transition duration-200 hover:translate-x-1 hover:text-slate-950"
                  >
                    <Icon
                      size={15}
                      className="transition-transform duration-200 group-hover:scale-110"
                    />

                    <span>{link.label}</span>

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories */}
          <div
            style={{ animationDelay: "240ms" }}
            className={revealClass}
          >
            <h3 className="text-sm font-semibold text-slate-950">
              Categories
            </h3>

            <div className="mt-4 space-y-3">
              {categoryLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavigation(link.path)}
                  className="group flex items-center gap-2 text-sm text-slate-500 transition duration-200 hover:translate-x-1 hover:text-slate-950"
                >
                  <span>{link.label}</span>

                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div
            style={{ animationDelay: "360ms" }}
            className={revealClass}
          >
            <h3 className="text-sm font-semibold text-slate-950">
              Legal &amp; Support
            </h3>

            <div className="mt-4 space-y-3">
              {legalLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handleNavigation(link.path)}
                    className="group flex items-center gap-2 text-sm text-slate-500 transition duration-200 hover:translate-x-1 hover:text-slate-950"
                  >
                    <Icon
                      size={15}
                      className="transition-transform duration-200 group-hover:scale-110"
                    />

                    <span>{link.label}</span>

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{ animationDelay: "480ms" }}
          className={`${revealClass} mt-10 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between`}
        >
          <p className="text-xs leading-5 text-slate-400">
            © {new Date().getFullYear()} Indian Utility Hub. All rights
            reserved.
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 self-start text-xs font-medium text-slate-500 transition-colors duration-200 hover:text-slate-950 sm:self-auto"
          >
            Back to top

            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 transition duration-300 group-hover:-translate-y-1 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white">
              <ArrowUpRight size={14} className="-rotate-45" />
            </span>
          </button>

          <p className="text-xs text-slate-400">
            Built for simple everyday tasks.
          </p>
        </div>
      </div>
    </footer>
  );
}
