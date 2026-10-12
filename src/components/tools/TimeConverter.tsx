import { useState } from "react";
import { Copy, RotateCcw } from "lucide-react";
import ToolHeader from "../layout/ToolHeader";

type TimeUnit = {
  name: string;
  short: string;
  toSeconds: number;
};

const units: TimeUnit[] = [
  {
    name: "Second",
    short: "sec",
    toSeconds: 1,
  },
  {
    name: "Millisecond",
    short: "ms",
    toSeconds: 0.001,
  },
  {
    name: "Minute",
    short: "min",
    toSeconds: 60,
  },
  {
    name: "Hour",
    short: "hr",
    toSeconds: 3600,
  },
  {
    name: "Day",
    short: "day",
    toSeconds: 86400,
  },
  {
    name: "Week",
    short: "week",
    toSeconds: 604800,
  },
  {
    name: "Month",
    short: "month",
    toSeconds: 2629746,
  },
  {
    name: "Year",
    short: "year",
    toSeconds: 31556952,
  },
];

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 8,
  }).format(value);
}

export default function TimeConverter() {
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("Hour");
  const [toUnit, setToUnit] = useState("Minute");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return 0;
    }

    const from = units.find((unit) => unit.name === fromUnit);
    const to = units.find((unit) => unit.name === toUnit);

    if (!from || !to) {
      return 0;
    }

    const seconds = numericValue * from.toSeconds;

    return seconds / to.toSeconds;
  };

  const result = convert();

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setCopied(false);
  };

  const handleReset = () => {
    setValue("1");
    setFromUnit("Hour");
    setToUnit("Minute");
    setCopied(false);
  };

  const handleCopy = async () => {
    const from = units.find((unit) => unit.name === fromUnit);
    const to = units.find((unit) => unit.name === toUnit);

    if (!from || !to) {
      return;
    }

    const text = `${value || "0"} ${from.short} = ${formatNumber(
      result
    )} ${to.short}`;

    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <ToolHeader />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-500">
            CONVERTER
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Time Converter
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Convert time between seconds, minutes, hours, days, weeks,
            months and years instantly.
          </p>
        </div>

        {/* Calculator */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-end">
            {/* From */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                From
              </label>

              <input
                type="number"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  setCopied(false);
                }}
                placeholder="Enter value"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />

              <select
                value={fromUnit}
                onChange={(event) => {
                  setFromUnit(event.target.value);
                  setCopied(false);
                }}
                className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              >
                {units.map((unit) => (
                  <option key={unit.name} value={unit.name}>
                    {unit.name} ({unit.short})
                  </option>
                ))}
              </select>
            </div>

            {/* Swap */}
            <button
              type="button"
              onClick={handleSwap}
              aria-label="Swap units"
              title="Swap units"
              className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-lg text-slate-600 transition hover:bg-slate-900 hover:text-white md:mb-1"
            >
              ⇄
            </button>

            {/* To */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                To
              </label>

              <div className="flex min-h-[50px] items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-2xl font-bold text-slate-950">
                  {formatNumber(result)}
                </span>
              </div>

              <select
                value={toUnit}
                onChange={(event) => {
                  setToUnit(event.target.value);
                  setCopied(false);
                }}
                className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              >
                {units.map((unit) => (
                  <option key={unit.name} value={unit.name}>
                    {unit.name} ({unit.short})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Copy size={16} />
              {copied ? "Copied!" : "Copy Result"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </section>

        {/* Common conversions */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-950">
            Common Time Conversions
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <strong className="text-slate-900">1 minute</strong> = 60
              seconds
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <strong className="text-slate-900">1 hour</strong> = 60
              minutes
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <strong className="text-slate-900">1 day</strong> = 24
              hours
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <strong className="text-slate-900">1 week</strong> = 7 days
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <strong className="text-slate-900">1 year</strong> =
              approximately 365.24 days
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <strong className="text-slate-900">1 second</strong> = 1000
              milliseconds
            </div>
          </div>
        </section>

        {/* Info */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-950">
            About Time Converter
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            This free time converter makes it easy to convert durations
            between commonly used time units. It can be useful for
            calculations involving working hours, study time, travel
            duration, project planning and everyday tasks.
          </p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Month and year conversions use average standardized durations,
            because calendar months and years can have different lengths.
          </p>
        </section>
      </main>
    </div>
  );
}