
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    question: "Are the tools free to use?",
    answer:
      "Yes. The core utility tools are designed to be free and accessible without requiring an account.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account is required for the basic tools. You can open a tool, enter your information and get your result quickly.",
  },
  {
    question: "Can I use the website on mobile?",
    answer:
      "Yes. Indian Utility Hub is designed to work across phones, tablets and desktop devices.",
  },
  {
    question: "Is my information stored?",
    answer:
      "Many of the tools perform calculations directly in your browser. Information entered into a tool is not automatically saved to an account.",
  },
  {
    question: "Are the calculator results accurate?",
    answer:
      "The calculators use standard mathematical formulas and conversion values. Results should be used as a practical reference and checked independently when accuracy is critical.",
  },
  {
    question: "Will more tools be added?",
    answer:
      "Yes. The platform is structured so new calculators, converters, image tools and document utilities can be added over time.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (
      typeof IntersectionObserver === "undefined"
    ) {
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
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative isolate overflow-hidden bg-slate-50 py-16 sm:py-20"
    >
      <style>{`
        @keyframes faqReveal {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes faqGlow {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(20px, -15px, 0);
          }
        }

        .faq-reveal {
          opacity: 0;
        }

        .faq-reveal-active {
          animation: faqReveal 650ms ease-out forwards;
        }

        .faq-glow-active {
          animation: faqGlow 12s ease-in-out infinite;
        }

        .faq-answer {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition:
            grid-template-rows 300ms ease,
            opacity 250ms ease;
        }

        details[open] .faq-answer {
          grid-template-rows: 1fr;
          opacity: 1;
        }

        .faq-answer-inner {
          overflow: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-reveal {
            opacity: 1;
          }

          .faq-reveal-active,
          .faq-glow-active {
            animation: none !important;
          }

          .faq-answer {
            transition: none !important;
          }
        }
      `}</style>

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className={`faq-glow absolute -left-32 top-20 h-64 w-64 rounded-full bg-white blur-3xl ${
            isVisible ? "faq-glow-active" : ""
          }`}
        />

        <div
          className={`faq-glow absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl ${
            isVisible ? "faq-glow-active" : ""
          }`}
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className={`faq-reveal ${
            isVisible ? "faq-reveal-active" : ""
          } text-center`}
        >
          <p className="text-sm font-semibold text-slate-500">
            FAQ
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Frequently asked questions
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Quick answers to common questions about Indian Utility Hub and
            its everyday tools.
          </p>
        </div>

        {/* FAQ list */}
        <div
          style={{ animationDelay: "140ms" }}
          className={`faq-reveal ${
            isVisible ? "faq-reveal-active" : ""
          } mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-300/20`}
        >
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              style={{
                animationDelay: `${index * 90}ms`,
              }}
              className={`group ${
                index !== faqs.length - 1
                  ? "border-b border-slate-200"
                  : ""
              }`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-left transition-colors duration-300 hover:bg-slate-50 sm:px-6 [&::-webkit-details-marker]:hidden">
                <span className="text-sm font-semibold leading-6 text-slate-900 transition-colors duration-200 group-open:text-slate-950 sm:text-base">
                  {faq.question}
                </span>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition duration-300 group-open:rotate-180 group-open:border-slate-900 group-open:bg-slate-900 group-open:text-white group-hover:border-slate-400">
                  <ChevronDown size={16} />
                </span>
              </summary>

              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p className="px-5 pb-5 text-sm leading-7 text-slate-500 sm:px-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>

        {/* Bottom note */}
        <div
          style={{ animationDelay: "300ms" }}
          className={`faq-reveal ${
            isVisible ? "faq-reveal-active" : ""
          } mt-6 text-center`}
        >
          <p className="text-sm text-slate-500">
            Still have questions?{" "}
            <a
              href="/contact"
              className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 transition-colors duration-200 hover:decoration-slate-900"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
