import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categories } from "../../data/tools";

function getCategoryPath(title: string) {
  const paths: Record<string, string> = {
    Calculators: "/category/calculators",
    "Image Tools": "/category/image-tools",
    "PDF Tools": "/category/pdf-tools",
    Converters: "/category/converters",
    "Student Tools": "/category/student-tools",
  };

  return paths[title] || "/";
}

export default function Categories() {
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

  const handleCategoryClick = (title: string) => {
    const path = getCategoryPath(title);

    window.location.href = path;
  };

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 sm:py-20"
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={`categories-glow absolute -right-40 top-16 h-80 w-80 rounded-full bg-slate-100/80 blur-3xl ${
            isVisible ? "categories-glow-active" : ""
          }`}
        />

        <div
          className={`categories-glow-two absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-slate-50 blur-3xl ${
            isVisible ? "categories-glow-two-active" : ""
          }`}
        />
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes categoriesHeadingReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes categoriesCardReveal {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes categoriesGlow {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(-30px, 25px, 0);
          }
        }

        @keyframes categoriesGlowTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(30px, -20px, 0);
          }
        }

        .categories-heading {
          opacity: 0;
        }

        .categories-heading-active {
          animation: categoriesHeadingReveal 0.7s ease-out forwards;
        }

        .category-card {
          opacity: 0;
        }

        .category-card-active {
          animation: categoriesCardReveal 0.7s ease-out forwards;
        }

        .categories-glow-active {
          animation: categoriesGlow 11s ease-in-out infinite;
        }

        .categories-glow-two-active {
          animation: categoriesGlowTwo 13s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .categories-heading,
          .category-card {
            opacity: 1;
          }

          .categories-heading-active,
          .category-card-active,
          .categories-glow-active,
          .categories-glow-two-active {
            animation: none !important;
          }
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className={`categories-heading ${
            isVisible ? "categories-heading-active" : ""
          } mx-auto max-w-2xl text-center`}
        >
          <p className="text-sm font-semibold text-slate-500">
            BROWSE BY NEED
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Find the right tool faster
          </h2>

          <p className="mt-3 text-base leading-7 text-slate-600">
            Everything is organised into simple categories so you can find
            exactly what you need without searching through endless tools.
          </p>
        </div>

        {/* Category cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <button
                key={category.title}
                type="button"
                onClick={() => handleCategoryClick(category.title)}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                className={`category-card ${
                  isVisible ? "category-card-active" : ""
                } group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-300/15 focus:outline-none focus:ring-2 focus:ring-slate-300`}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition duration-300 group-hover:scale-105 group-hover:bg-slate-900 group-hover:text-white group-hover:shadow-md">
                    <Icon size={22} />
                  </span>

                  <ArrowUpRight
                    size={19}
                    className="text-slate-300 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-700"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950 transition duration-200 group-hover:text-slate-800">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {category.description}
                </p>

                <span className="mt-5 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition duration-200 group-hover:bg-slate-900 group-hover:text-white">
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}