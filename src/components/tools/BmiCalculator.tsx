import { useState } from "react";
import { Copy, RotateCcw } from "lucide-react";
import ToolHeader from "../layout/ToolHeader";

type HeightUnit = "cm" | "ft";

export default function BmiCalculator() {
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");

  const [heightCm, setHeightCm] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");

  const [bmi, setBmi] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const calculateBMI = () => {
    setError("");
    setCopied(false);

    let heightInCm = 0;

    if (heightUnit === "cm") {
      heightInCm = Number(heightCm);

      if (!heightCm || heightInCm <= 0) {
        setError("Please enter a valid height.");
        setBmi(null);
        return;
      }
    } else {
      const ft = Number(feet);
      const inch = Number(inches);

      if (
        feet === "" ||
        inches === "" ||
        ft < 0 ||
        inch < 0 ||
        inch >= 12
      ) {
        setError("Please enter a valid height.");
        setBmi(null);
        return;
      }

      heightInCm = ft * 30.48 + inch * 2.54;

      if (heightInCm <= 0) {
        setError("Please enter a valid height.");
        setBmi(null);
        return;
      }
    }

    const weightKg = Number(weight);

    if (!weight || weightKg <= 0) {
      setError("Please enter a valid weight.");
      setBmi(null);
      return;
    }

    const heightMeters = heightInCm / 100;
    const calculatedBMI =
      weightKg / (heightMeters * heightMeters);

    setBmi(calculatedBMI);
  };

  const getCategory = () => {
    if (bmi === null) {
      return {
        label: "Enter your details",
        description: "Enter height and weight to calculate BMI.",
      };
    }

    if (bmi < 18.5) {
      return {
        label: "Underweight",
        description: "Your BMI is below the normal range.",
      };
    }

    if (bmi < 25) {
      return {
        label: "Normal weight",
        description: "Your BMI is within the normal range.",
      };
    }

    if (bmi < 30) {
      return {
        label: "Overweight",
        description: "Your BMI is above the normal range.",
      };
    }

    return {
      label: "Obesity",
      description: "Your BMI is in the obesity range.",
    };
  };

  const category = getCategory();

  const getHealthyWeight = () => {
    let heightInCm = 0;

    if (heightUnit === "cm") {
      heightInCm = Number(heightCm);
    } else {
      heightInCm =
        Number(feet) * 30.48 + Number(inches) * 2.54;
    }

    if (!heightInCm || heightInCm <= 0) {
      return null;
    }

    const heightMeters = heightInCm / 100;

    return {
      min: 18.5 * heightMeters * heightMeters,
      max: 24.9 * heightMeters * heightMeters,
    };
  };

  const healthyWeight = getHealthyWeight();

  const handleReset = () => {
    setHeightUnit("cm");
    setHeightCm("");
    setFeet("");
    setInches("");
    setWeight("");
    setBmi(null);
    setError("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (bmi === null) return;

    const text = `BMI: ${bmi.toFixed(2)} | Category: ${category.label}`;

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

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-500">
            HEALTH CALCULATOR
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            BMI Calculator
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Calculate your Body Mass Index using your height and weight
            and understand your BMI category.
          </p>
        </div>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* INPUT SECTION */}
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Enter your details
              </h2>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Height unit
                </label>

                <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setHeightUnit("cm");
                      setBmi(null);
                      setError("");
                    }}
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                      heightUnit === "cm"
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Centimeters
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setHeightUnit("ft");
                      setBmi(null);
                      setError("");
                    }}
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                      heightUnit === "ft"
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Feet / Inches
                  </button>
                </div>
              </div>

              {heightUnit === "cm" ? (
                <div className="mt-5">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Height (cm)
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={heightCm}
                    onChange={(e) => {
                      setHeightCm(e.target.value);
                      setBmi(null);
                      setError("");
                    }}
                    placeholder="Example: 170"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              ) : (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Feet
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={feet}
                      onChange={(e) => {
                        setFeet(e.target.value);
                        setBmi(null);
                        setError("");
                      }}
                      placeholder="5"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Inches
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="11.99"
                      value={inches}
                      onChange={(e) => {
                        setInches(e.target.value);
                        setBmi(null);
                        setError("");
                      }}
                      placeholder="4"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>
                </div>
              )}

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Weight (kg)
                </label>

                <input
                  type="number"
                  min="1"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    setBmi(null);
                    setError("");
                  }}
                  placeholder="Example: 65"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              {error && (
                <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={calculateBMI}
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Calculate BMI
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
              </div>
            </div>

            {/* RESULT SECTION */}
            <div className="rounded-2xl bg-slate-50 p-5 sm:p-6">
              <p className="text-sm font-semibold text-slate-500">
                YOUR BMI
              </p>

              <div className="mt-3">
                <span className="text-5xl font-bold tracking-tight text-slate-950">
                  {bmi !== null ? bmi.toFixed(2) : "--"}
                </span>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Category
                </p>

                <p className="mt-1 text-xl font-bold text-slate-950">
                  {category.label}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {category.description}
                </p>
              </div>

              {bmi !== null && healthyWeight && (
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Healthy weight range
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-950">
                    {healthyWeight.min.toFixed(1)} kg –{" "}
                    {healthyWeight.max.toFixed(1)} kg
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Based on a BMI range of 18.5–24.9.
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleCopy}
                disabled={bmi === null}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Copy size={16} />
                {copied ? "Copied!" : "Copy Result"}
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-950">
            BMI Categories
          </h2>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
              <span>BMI</span>
              <span>Category</span>
            </div>

            <div className="grid grid-cols-2 border-b border-slate-100 px-4 py-3 text-sm text-slate-600">
              <span>Below 18.5</span>
              <span>Underweight</span>
            </div>

            <div className="grid grid-cols-2 border-b border-slate-100 px-4 py-3 text-sm text-slate-600">
              <span>18.5 – 24.9</span>
              <span>Normal weight</span>
            </div>

            <div className="grid grid-cols-2 border-b border-slate-100 px-4 py-3 text-sm text-slate-600">
              <span>25 – 29.9</span>
              <span>Overweight</span>
            </div>

            <div className="grid grid-cols-2 px-4 py-3 text-sm text-slate-600">
              <span>30 or above</span>
              <span>Obesity</span>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-600">
            BMI is a general screening measure based on height and weight.
            It does not directly measure body fat and should not be treated
            as a medical diagnosis.
          </p>
        </section>
      </main>
    </div>
  );
}