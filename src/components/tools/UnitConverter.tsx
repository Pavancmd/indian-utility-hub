import { useMemo, useState } from "react";

import {
  ArrowLeftRight,
  ChevronDown,
  Copy,
  RotateCcw,
  Check,
} from "lucide-react";

import ToolHeader from "../layout/ToolHeader";

type UnitType = "length" | "weight" | "temperature";

type UnitOption = {
  value: string;
  label: string;
  short: string;
};

const unitOptions: Record<UnitType, UnitOption[]> = {
  length: [
    { value: "meter", label: "Meter", short: "m" },
    { value: "kilometer", label: "Kilometer", short: "km" },
    { value: "centimeter", label: "Centimeter", short: "cm" },
    { value: "millimeter", label: "Millimeter", short: "mm" },
    { value: "inch", label: "Inch", short: "in" },
    { value: "foot", label: "Foot", short: "ft" },
    { value: "yard", label: "Yard", short: "yd" },
    { value: "mile", label: "Mile", short: "mi" },
  ],

  weight: [
    { value: "kilogram", label: "Kilogram", short: "kg" },
    { value: "gram", label: "Gram", short: "g" },
    { value: "milligram", label: "Milligram", short: "mg" },
    { value: "pound", label: "Pound", short: "lb" },
    { value: "ounce", label: "Ounce", short: "oz" },
  ],

  temperature: [
    { value: "celsius", label: "Celsius", short: "°C" },
    { value: "fahrenheit", label: "Fahrenheit", short: "°F" },
    { value: "kelvin", label: "Kelvin", short: "K" },
  ],
};

const conversionRates: Record<
  Exclude<UnitType, "temperature">,
  Record<string, number>
> = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.344,
  },

  weight: {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    pound: 0.45359237,
    ounce: 0.028349523125,
  },
};

function convertTemperature(
  value: number,
  from: string,
  to: string
): number {
  let celsius = value;

  if (from === "fahrenheit") {
    celsius = (value - 32) * (5 / 9);
  } else if (from === "kelvin") {
    celsius = value - 273.15;
  }

  if (to === "fahrenheit") {
    return celsius * (9 / 5) + 32;
  }

  if (to === "kelvin") {
    return celsius + 273.15;
  }

  return celsius;
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return "0";
  }

  if (Math.abs(value) >= 1000000000) {
    return value.toExponential(6);
  }

  return Number(value.toFixed(8)).toString();
}

function UnitConverter() {
  const [type, setType] = useState<UnitType>("length");

  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");

  const [inputValue, setInputValue] = useState("1");
  const [copied, setCopied] = useState(false);

  const options = unitOptions[type];

  const result = useMemo(() => {
    const numericValue = Number(inputValue);

    if (!Number.isFinite(numericValue)) {
      return 0;
    }

    if (type === "temperature") {
      return convertTemperature(numericValue, fromUnit, toUnit);
    }

    const rates = conversionRates[type];

    return (numericValue * rates[fromUnit]) / rates[toUnit];
  }, [inputValue, type, fromUnit, toUnit]);

  const resultText = formatNumber(result);

  const fromLabel =
    options.find((unit) => unit.value === fromUnit)?.label ?? "";

  const toLabel =
    options.find((unit) => unit.value === toUnit)?.label ?? "";

  const fromShort =
    options.find((unit) => unit.value === fromUnit)?.short ?? "";

  const toShort =
    options.find((unit) => unit.value === toUnit)?.short ?? "";

  const handleTypeChange = (newType: UnitType) => {
    setType(newType);

    const newOptions = unitOptions[newType];

    setFromUnit(newOptions[0].value);
    setToUnit(newOptions[1]?.value ?? newOptions[0].value);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const reset = () => {
    setType("length");
    setFromUnit("meter");
    setToUnit("kilometer");
    setInputValue("1");
    setCopied(false);
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
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

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            Free everyday tool
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Unit Converter
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Quickly convert length, weight and temperature units with accurate
            results.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-8">
            <label className="mb-3 block text-sm font-semibold text-slate-800">
              Conversion type
            </label>

            <div className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-1">
              {(["length", "weight", "temperature"] as UnitType[]).map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleTypeChange(item)}
                    className={`rounded-xl px-3 py-3 text-sm font-semibold capitalize transition ${
                      type === item
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-end">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                From
              </label>

              <input
                type="number"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                className="mb-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-lg font-medium text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                placeholder="Enter value"
              />

              <div className="relative">
                <select
                  value={fromUnit}
                  onChange={(event) => setFromUnit(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                >
                  {options.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label} ({unit.short})
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            <div className="flex justify-center md:pb-1">
              <button
                type="button"
                onClick={swapUnits}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                title="Swap units"
                aria-label="Swap units"
              >
                <ArrowLeftRight size={18} />
              </button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                To
              </label>

              <div className="mb-3 flex h-[58px] items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
                <span className="text-2xl font-bold text-slate-950">
                  {resultText}
                </span>

                <span className="ml-2 text-sm font-medium text-slate-500">
                  {toShort}
                </span>
              </div>

              <div className="relative">
                <select
                  value={toUnit}
                  onChange={(event) => setToUnit(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                >
                  {options.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label} ({unit.short})
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-slate-950 p-6 text-white">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Conversion result
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight">
                  {inputValue || "0"} {fromShort}
                  <span className="mx-3 text-slate-500">=</span>
                  {resultText} {toShort}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  {fromLabel} → {toLabel}
                </p>
              </div>

              <button
                type="button"
                onClick={copyResult}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
                {copied ? "Copied" : "Copy result"}
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-slate-950">Fast</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Results update instantly as you enter a value.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-slate-950">Simple</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Choose your units and get the converted value immediately.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-slate-950">Private</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Your calculations happen directly in your browser.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UnitConverter;