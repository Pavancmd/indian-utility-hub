import { useState } from "react";
import { Copy, RotateCcw } from "lucide-react";
import ToolHeader from "../layout/ToolHeader";

type Mode = "exclusive" | "inclusive";

const gstRates = [5, 12, 18, 28];

function formatCurrency(value: number) {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function GstCalculator() {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState(18);
  const [mode, setMode] = useState<Mode>("exclusive");
  const [copied, setCopied] = useState(false);

  const numericAmount = Number(amount);

  let baseAmount = 0;
  let gstAmount = 0;
  let totalAmount = 0;

  if (Number.isFinite(numericAmount) && numericAmount > 0) {
    if (mode === "exclusive") {
      baseAmount = numericAmount;
      gstAmount = (baseAmount * gstRate) / 100;
      totalAmount = baseAmount + gstAmount;
    } else {
      totalAmount = numericAmount;
      baseAmount = totalAmount / (1 + gstRate / 100);
      gstAmount = totalAmount - baseAmount;
    }
  }

  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  const handleCopy = async () => {
    if (totalAmount <= 0) return;

    const text = [
      `GST Rate: ${gstRate}%`,
      `Base Amount: ₹${formatCurrency(baseAmount)}`,
      `CGST: ₹${formatCurrency(cgst)}`,
      `SGST: ₹${formatCurrency(sgst)}`,
      `Total GST: ₹${formatCurrency(gstAmount)}`,
      `Final Amount: ₹${formatCurrency(totalAmount)}`,
    ].join("\n");

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

  const handleReset = () => {
    setAmount("");
    setGstRate(18);
    setMode("exclusive");
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <ToolHeader />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-500">
            FINANCE CALCULATOR
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            GST Calculator
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Calculate GST, CGST, SGST and final invoice amount quickly using
            common Indian GST rates.
          </p>
        </div>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Enter details
              </h2>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Calculation type
                </label>

                <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("exclusive");
                      setCopied(false);
                    }}
                    className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                      mode === "exclusive"
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Add GST
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMode("inclusive");
                      setCopied(false);
                    }}
                    className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                      mode === "inclusive"
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Remove GST
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {mode === "exclusive"
                    ? "Amount before GST"
                    : "Amount including GST"}
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    ₹
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(event) => {
                      setAmount(event.target.value);
                      setCopied(false);
                    }}
                    placeholder="Enter amount"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  GST Rate
                </label>

                <div className="grid grid-cols-4 gap-2">
                  {gstRates.map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => {
                        setGstRate(rate);
                        setCopied(false);
                      }}
                      className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                        gstRate === rate
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={totalAmount <= 0}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Copy size={16} />
                  {copied ? "Copied!" : "Copy Result"}
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

            <div className="rounded-2xl bg-slate-50 p-5 sm:p-6">
              <p className="text-sm font-semibold text-slate-500">
                GST BREAKDOWN
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-white p-4">
                  <span className="text-sm text-slate-500">
                    Base Amount
                  </span>

                  <span className="font-semibold text-slate-950">
                    ₹{formatCurrency(baseAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white p-4">
                  <span className="text-sm text-slate-500">
                    CGST ({gstRate / 2}%)
                  </span>

                  <span className="font-semibold text-slate-950">
                    ₹{formatCurrency(cgst)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white p-4">
                  <span className="text-sm text-slate-500">
                    SGST ({gstRate / 2}%)
                  </span>

                  <span className="font-semibold text-slate-950">
                    ₹{formatCurrency(sgst)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
                  <span className="text-sm font-semibold text-slate-700">
                    Total GST
                  </span>

                  <span className="font-bold text-slate-950">
                    ₹{formatCurrency(gstAmount)}
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-900 p-5 text-white">
                  <p className="text-sm text-slate-300">Final Amount</p>

                  <p className="mt-1 text-3xl font-bold">
                    ₹{formatCurrency(totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-950">
            How GST is calculated
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            When GST is added to an amount, the GST amount is calculated as
            the taxable amount multiplied by the GST rate. For intra-state
            transactions, GST is generally divided equally between CGST and
            SGST.
          </p>

          <div className="mt-5 rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">
              Example
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              For ₹1,000 at 18% GST:
            </p>

            <p className="mt-2 text-sm font-medium text-slate-700">
              GST = ₹180 &nbsp;•&nbsp; CGST = ₹90 &nbsp;•&nbsp; SGST = ₹90
              &nbsp;•&nbsp; Final Amount = ₹1,180
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-semibold text-amber-900">
            Important note
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-800">
            This calculator provides a mathematical GST calculation for
            general use. Actual GST applicability, tax rate and treatment
            can depend on the nature of the supply, goods or services,
            transaction type and applicable tax rules.
          </p>
        </section>
      </main>
    </div>
  );
}