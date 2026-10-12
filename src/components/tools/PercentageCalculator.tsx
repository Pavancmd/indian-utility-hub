import { useMemo, useState } from "react";
import {
  Calculator,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";
import ToolHeader from "../layout/ToolHeader";

type CalculationMode =
  | "percentageOf"
  | "increaseDecrease"
  | "difference";

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(value);
}

export default function PercentageCalculator() {
  const [mode, setMode] =
    useState<CalculationMode>("percentageOf");

  const [percentage, setPercentage] = useState("20");
  const [value, setValue] = useState("500");

  const [originalValue, setOriginalValue] = useState("500");
  const [changePercentage, setChangePercentage] = useState("20");
  const [changeType, setChangeType] =
    useState<"increase" | "decrease">("increase");

  const [firstValue, setFirstValue] = useState("100");
  const [secondValue, setSecondValue] = useState("120");

  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (mode === "percentageOf") {
      const percent = Number(percentage);
      const base = Number(value);

      if (!Number.isFinite(percent) || !Number.isFinite(base)) {
        return {
          main: 0,
          secondary: 0,
          label: "Result",
          secondaryLabel: "",
        };
      }

      const resultValue = (percent / 100) * base;

      return {
        main: resultValue,
        secondary: base - resultValue,
        label: `${formatNumber(percent)}% of ${formatNumber(base)}`,
        secondaryLabel: "Remaining after percentage",
      };
    }

    if (mode === "increaseDecrease") {
      const original = Number(originalValue);
      const percent = Number(changePercentage);

      if (!Number.isFinite(original) || !Number.isFinite(percent)) {
        return {
          main: 0,
          secondary: 0,
          label: "Result",
          secondaryLabel: "",
        };
      }

      const changeAmount = (original * percent) / 100;

      const finalValue =
        changeType === "increase"
          ? original + changeAmount
          : original - changeAmount;

      return {
        main: finalValue,
        secondary: changeAmount,
        label:
          changeType === "increase"
            ? "Value after increase"
            : "Value after decrease",
        secondaryLabel:
          changeType === "increase"
            ? "Amount increased"
            : "Amount decreased",
      };
    }

    const first = Number(firstValue);
    const second = Number(secondValue);

    if (
      !Number.isFinite(first) ||
      !Number.isFinite(second) ||
      first === 0 ||
      second === 0
    ) {
      return {
        main: 0,
        secondary: 0,
        label: "Result",
        secondaryLabel: "",
      };
    }

    const difference = Math.abs(first - second);
    const average = (Math.abs(first) + Math.abs(second)) / 2;
    const percentageDifference = (difference / average) * 100;

    return {
      main: percentageDifference,
      secondary: difference,
      label: "Percentage difference",
      secondaryLabel: "Absolute difference",
    };
  }, [
    mode,
    percentage,
    value,
    originalValue,
    changePercentage,
    changeType,
    firstValue,
    secondValue,
  ]);

  const copyResult = async () => {
    let text = "";

    if (mode === "percentageOf") {
      text = [
        "Indian Utility Hub - Percentage Calculator",
        `${percentage}% of ${value} = ${formatNumber(result.main)}`,
      ].join("\n");
    } else if (mode === "increaseDecrease") {
      text = [
        "Indian Utility Hub - Percentage Calculator",
        `Original Value: ${formatNumber(Number(originalValue))}`,
        `Change: ${changePercentage}% ${changeType}`,
        `Final Value: ${formatNumber(result.main)}`,
        `Amount Changed: ${formatNumber(result.secondary)}`,
      ].join("\n");
    } else {
      text = [
        "Indian Utility Hub - Percentage Calculator",
        `First Value: ${formatNumber(Number(firstValue))}`,
        `Second Value: ${formatNumber(Number(secondValue))}`,
        `Percentage Difference: ${formatNumber(result.main)}%`,
        `Absolute Difference: ${formatNumber(result.secondary)}`,
      ].join("\n");
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  };

  const resetCalculator = () => {
    setMode("percentageOf");
    setPercentage("20");
    setValue("500");
    setOriginalValue("500");
    setChangePercentage("20");
    setChangeType("increase");
    setFirstValue("100");
    setSecondValue("120");
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <ToolHeader />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
            <Calculator size={14} />
            Free math tool
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Percentage Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Calculate percentages, percentage increases and decreases, and
            percentage differences quickly and accurately.
          </p>
        </div>

        {/* Main Calculator */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          {/* Modes */}
          <div className="grid gap-2 rounded-2xl bg-slate-100 p-1 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => setMode("percentageOf")}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                mode === "percentageOf"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Percentage of a number
            </button>

            <button
              type="button"
              onClick={() => setMode("increaseDecrease")}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                mode === "increaseDecrease"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Increase / Decrease
            </button>

            <button
              type="button"
              onClick={() => setMode("difference")}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                mode === "difference"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Percentage Difference
            </button>
          </div>

          {/* Percentage of Number */}
          {mode === "percentageOf" && (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="percentage"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Percentage
                </label>

                <div className="relative">
                  <input
                    id="percentage"
                    type="number"
                    inputMode="decimal"
                    value={percentage}
                    onChange={(event) =>
                      setPercentage(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-lg font-medium text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    placeholder="Enter percentage"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                    %
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="percentageValue"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Number
                </label>

                <input
                  id="percentageValue"
                  type="number"
                  inputMode="decimal"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-lg font-medium text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  placeholder="Enter number"
                />
              </div>
            </div>
          )}

          {/* Increase / Decrease */}
          {mode === "increaseDecrease" && (
            <div className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="originalValue"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Original value
                  </label>

                  <input
                    id="originalValue"
                    type="number"
                    inputMode="decimal"
                    value={originalValue}
                    onChange={(event) =>
                      setOriginalValue(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-lg font-medium text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    placeholder="Enter original value"
                  />
                </div>

                <div>
                  <label
                    htmlFor="changePercentage"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Percentage
                  </label>

                  <div className="relative">
                    <input
                      id="changePercentage"
                      type="number"
                      inputMode="decimal"
                      value={changePercentage}
                      onChange={(event) =>
                        setChangePercentage(event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-lg font-medium text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                      placeholder="Enter percentage"
                    />

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-2 text-sm font-semibold text-slate-800">
                  Change type
                </p>

                <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setChangeType("increase")}
                    className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                      changeType === "increase"
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Increase
                  </button>

                  <button
                    type="button"
                    onClick={() => setChangeType("decrease")}
                    className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                      changeType === "decrease"
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Decrease
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Difference */}
          {mode === "difference" && (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstValue"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  First value
                </label>

                <input
                  id="firstValue"
                  type="number"
                  inputMode="decimal"
                  value={firstValue}
                  onChange={(event) =>
                    setFirstValue(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-lg font-medium text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  placeholder="Enter first value"
                />
              </div>

              <div>
                <label
                  htmlFor="secondValue"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Second value
                </label>

                <input
                  id="secondValue"
                  type="number"
                  inputMode="decimal"
                  value={secondValue}
                  onChange={(event) =>
                    setSecondValue(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-lg font-medium text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  placeholder="Enter second value"
                />
              </div>
            </div>
          )}

          {/* Result */}
          <div className="mt-8 rounded-2xl bg-slate-950 p-6 text-white sm:p-7">
            <p className="text-sm font-medium text-slate-400">
              {result.label}
            </p>

            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {formatNumber(result.main)}
              {mode === "difference" && "%"}
            </p>

            {mode === "percentageOf" && (
              <p className="mt-2 text-sm text-slate-400">
                {formatNumber(Number(percentage))}% of{" "}
                {formatNumber(Number(value))}
              </p>
            )}

            {mode === "increaseDecrease" && (
              <p className="mt-2 text-sm text-slate-400">
                {formatNumber(Number(originalValue))}{" "}
                {changeType === "increase" ? "+" : "-"}{" "}
                {formatNumber(result.secondary)}
              </p>
            )}

            {mode === "difference" && (
              <p className="mt-2 text-sm text-slate-400">
                Difference: {formatNumber(result.secondary)}
              </p>
            )}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-xs font-medium text-slate-400">
                  {result.secondaryLabel || "Calculation"}
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {mode === "difference"
                    ? formatNumber(result.secondary)
                    : mode === "percentageOf"
                    ? formatNumber(result.main)
                    : formatNumber(result.secondary)}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-xs font-medium text-slate-400">
                  Formula type
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {mode === "percentageOf"
                    ? "Percentage of"
                    : mode === "increaseDecrease"
                    ? changeType === "increase"
                      ? "Increase"
                      : "Decrease"
                    : "Difference"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={copyResult}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
              {copied ? "Copied" : "Copy result"}
            </button>
          </div>

          {/* Reset */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={resetCalculator}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </div>

        {/* Examples */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-950">
              Percentage of a number
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Find values such as 20% of ₹500 or 15% of any number instantly.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-950">
              Increase or decrease
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Calculate discounts, price increases, salary changes and other
              percentage adjustments.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-950">
              Percentage difference
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Compare two values and calculate their percentage difference.
            </p>
          </div>
        </div>

        {/* SEO Content */}
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-950">
            Percentage Calculator
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Use this free percentage calculator to solve everyday percentage
            problems. Calculate a percentage of a number, find the result after
            a percentage increase or decrease, and compare two numbers using
            percentage difference.
          </p>

          <h3 className="mt-6 font-semibold text-slate-950">
            How to calculate a percentage?
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            To calculate a percentage of a number, multiply the number by the
            percentage and divide the result by 100. For example, 20% of 500
            is 100.
          </p>

          <h3 className="mt-6 font-semibold text-slate-950">
            Where can you use a percentage calculator?
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            Percentage calculations are useful for discounts, GST and tax
            calculations, exam marks, salary changes, business calculations,
            profit and loss, statistics and everyday financial decisions.
          </p>

          <p className="mt-4 text-xs leading-6 text-slate-400">
            Note: Results are mathematical calculations and should be verified
            when used for financial, academic or official purposes.
          </p>
        </section>
      </div>
    </div>
  );
}