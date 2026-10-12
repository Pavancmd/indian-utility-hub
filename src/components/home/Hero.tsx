import { Search, ArrowRight, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { popularTools, quickTools } from "../../data/tools";

type SearchTool = {
  name: string;
  description: string;
  category: string;
  icon: any;
};

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

export default function Hero() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const searchableTools = useMemo<SearchTool[]>(() => {
    const popular = popularTools.map((tool) => ({
      name: tool.name,
      description: tool.description,
      category: tool.category,
      icon: tool.icon,
    }));

    const quick = quickTools.map((tool) => {
      let description = "";
      let category = "Converter";

      if (tool.name === "Unit Converter") {
        description = "Convert length, weight and temperature units";
      }

      if (tool.name === "Time Converter") {
        description = "Convert time between different units";
      }

      if (tool.name === "BMI Calculator") {
        description = "Calculate your body mass index";
        category = "Health";
      }

      if (tool.name === "Weight Converter") {
        description = "Convert weight between different units";
      }

      return {
        name: tool.name,
        description,
        category,
        icon: tool.icon,
      };
    });

    const combined = [...popular, ...quick];

    return combined.filter(
      (tool, index, array) =>
        array.findIndex((item) => item.name === tool.name) === index
    );
  }, []);

  const filteredTools = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    if (!searchText) {
      return [];
    }

    return searchableTools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(searchText) ||
        tool.description.toLowerCase().includes(searchText) ||
        tool.category.toLowerCase().includes(searchText)
    );
  }, [query, searchableTools]);

  const handleSearch = () => {
    if (!query.trim()) {
      setSearched(false);
      return;
    }

    setSearched(true);
  };

  const openTool = (toolName: string) => {
    const path = getToolPath(toolName);

    if (path !== "#") {
      window.location.href = path;
    }
  };

  const handleQuickTool = (toolName: string) => {
    setQuery(toolName);
    setSearched(true);
  };

  return (
    <section className="hero-section relative isolate overflow-hidden bg-white">
      {/* Animated background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Soft base gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(226,232,240,0.75),transparent_45%)]" />

        {/* Animated glow 1 */}
        <div className="hero-orb hero-orb-one absolute -left-32 top-16 h-80 w-80 rounded-full bg-slate-200/60 blur-3xl" />

        {/* Animated glow 2 */}
        <div className="hero-orb hero-orb-two absolute -right-32 top-28 h-96 w-96 rounded-full bg-slate-300/40 blur-3xl" />

        {/* Animated glow 3 */}
        <div className="hero-orb hero-orb-three absolute left-1/2 top-72 h-72 w-72 -translate-x-1/2 rounded-full bg-slate-100/90 blur-3xl" />

        {/* Fine grid */}
        <div className="absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] [background-size:44px_44px]" />

        {/* Floating light points */}
        <span className="hero-dot hero-dot-one absolute left-[14%] top-32 h-1.5 w-1.5 rounded-full bg-slate-400/50" />
        <span className="hero-dot hero-dot-two absolute right-[18%] top-44 h-2 w-2 rounded-full bg-slate-300/70" />
        <span className="hero-dot hero-dot-three absolute left-[23%] top-[58%] h-1.5 w-1.5 rounded-full bg-slate-400/40" />
        <span className="hero-dot hero-dot-four absolute right-[25%] top-[62%] h-1.5 w-1.5 rounded-full bg-slate-400/40" />
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes heroFloatOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(45px, 28px, 0) scale(1.08);
          }
        }

        @keyframes heroFloatTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-42px, 35px, 0) scale(1.1);
          }
        }

        @keyframes heroFloatThree {
          0%,
          100% {
            transform: translate3d(-50%, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-50%, -25px, 0) scale(1.06);
          }
        }

        @keyframes heroDotFloat {
          0%,
          100% {
            opacity: 0.25;
            transform: translateY(0);
          }
          50% {
            opacity: 0.75;
            transform: translateY(-14px);
          }
        }

        @keyframes heroReveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-orb-one {
          animation: heroFloatOne 11s ease-in-out infinite;
        }

        .hero-orb-two {
          animation: heroFloatTwo 13s ease-in-out infinite;
        }

        .hero-orb-three {
          animation: heroFloatThree 10s ease-in-out infinite;
        }

        .hero-dot {
          animation: heroDotFloat 5s ease-in-out infinite;
        }

        .hero-dot-two {
          animation-delay: 1.2s;
        }

        .hero-dot-three {
          animation-delay: 2.2s;
        }

        .hero-dot-four {
          animation-delay: 3.1s;
        }

        .hero-reveal {
          animation: heroReveal 0.8s ease-out both;
        }

        .hero-reveal-delay-1 {
          animation-delay: 0.08s;
        }

        .hero-reveal-delay-2 {
          animation-delay: 0.16s;
        }

        .hero-reveal-delay-3 {
          animation-delay: 0.24s;
        }

        .hero-reveal-delay-4 {
          animation-delay: 0.32s;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-orb-one,
          .hero-orb-two,
          .hero-orb-three,
          .hero-dot,
          .hero-reveal {
            animation: none !important;
          }
        }
      `}</style>

      <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24 lg:pt-28">
        {/* Badge */}
        <div className="hero-reveal hero-reveal-delay-1 mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Free everyday tools
        </div>

        {/* Heading */}
        <h1 className="hero-reveal hero-reveal-delay-2 mx-auto max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Everything you need,
          <span className="block text-slate-500">
            in one simple place.
          </span>
        </h1>

        {/* Description */}
        <p className="hero-reveal hero-reveal-delay-3 mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Calculate, convert, compress and simplify everyday tasks — quickly,
          privately and without unnecessary complexity.
        </p>

        {/* Search */}
        <div className="hero-reveal hero-reveal-delay-4 mx-auto mt-9 max-w-2xl">
          <div className="group flex items-center rounded-2xl border border-slate-200/90 bg-white/90 p-2 shadow-xl shadow-slate-300/20 backdrop-blur-md transition duration-300 focus-within:border-slate-400 focus-within:ring-4 focus-within:ring-slate-100/80 hover:shadow-2xl hover:shadow-slate-300/25">
            <Search
              className="ml-3 shrink-0 text-slate-400 transition group-focus-within:text-slate-700"
              size={21}
            />

            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSearched(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="What do you need help with?"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
            />

            <button
              type="button"
              onClick={handleSearch}
              className="hidden rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md sm:block"
            >
              Search
            </button>
          </div>

          {/* Quick tools */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {quickTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <button
                  key={tool.name}
                  type="button"
                  onClick={() => handleQuickTool(tool.name)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/75 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:text-slate-900 hover:shadow-md"
                >
                  <Icon size={13} />
                  {tool.name}
                </button>
              );
            })}
          </div>

          {/* Search results */}
          {searched && (
            <div className="mt-5 text-left">
              {filteredTools.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-xl backdrop-blur-md">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Search results
                    </p>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {filteredTools.map((tool) => {
                      const Icon = tool.icon;
                      const path = getToolPath(tool.name);
                      const available = path !== "#";

                      return (
                        <button
                          key={tool.name}
                          type="button"
                          onClick={() => openTool(tool.name)}
                          disabled={!available}
                          className={`group flex w-full items-center gap-4 px-4 py-4 text-left transition ${
                            available
                              ? "hover:bg-slate-50"
                              : "cursor-default opacity-70"
                          }`}
                        >
                          {/* Icon */}
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition duration-200 group-hover:bg-slate-900 group-hover:text-white group-hover:shadow-md">
                            <Icon size={20} />
                          </span>

                          {/* Details */}
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold text-slate-950">
                              {tool.name}
                            </span>

                            <span className="mt-0.5 block text-sm text-slate-500">
                              {tool.description}
                            </span>

                            <span className="mt-1 block text-xs font-medium text-slate-400">
                              {tool.category}
                            </span>
                          </span>

                          {/* Arrow / status */}
                          {available ? (
                            <ArrowUpRight
                              size={19}
                              className="shrink-0 text-slate-300 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-700"
                            />
                          ) : (
                            <span className="shrink-0 text-xs font-medium text-slate-400">
                              Coming soon
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white/95 px-5 py-6 text-center shadow-xl backdrop-blur-md">
                  <p className="font-semibold text-slate-900">
                    No tools found
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Try searching for calculator, converter, image or PDF.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Explore */}
        <a
          href="#tools"
          className="hero-reveal hero-reveal-delay-4 mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition duration-200 hover:gap-3"
        >
          Explore popular tools
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}