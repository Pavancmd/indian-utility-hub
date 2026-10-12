import { useMemo, useState } from "react";
import {
  Calculator,
  Check,
  Copy,
  IndianRupee,
  RotateCcw,
} from "lucide-react";
import ToolHeader from "../layout/ToolHeader";

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) {
    return "₹0";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState("500000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [tenure, setTenure] = useState("5");
  const [copied, setCopied] = useState(false);

  const calculation = useMemo(() => {
    const principal = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(tenure);

    if (
      !Number.isFinite(principal) ||
      !Number.isFinite(annualRate) ||
      !Number.isFinite(years) ||
      principal <= 0 ||
      annualRate < 0 ||
      years <= 0
    ) {
      return {
        emi: 0,
        totalPayment: 0,
        totalInterest: 0,
        months: 0,
      };
    }

    const months = Math.round(years * 12);
    const monthlyRate = annualRate / 12 / 100;

    let emi = 0;

    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);

      emi = (principal * monthlyRate * factor) / (factor - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    return {
      emi,
      totalPayment,
      totalInterest,
      months,
    };
  }, [loanAmount, interestRate, tenure]);

  const copyResult = async () => {
    const result = [
      "Indian Utility Hub - EMI Calculator",
      `Loan Amount: ${formatCurrency(Number(loanAmount))}`,
      `Interest Rate: ${interestRate}%`,
      `Loan Tenure: ${tenure} years`,
      `Monthly EMI: ${formatCurrency(calculation.emi)}`,
      `Total Interest: ${formatCurrency(calculation.totalInterest)}`,
      `Total Payment: ${formatCurrency(calculation.totalPayment)}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(result);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  };

  const resetCalculator = () => {
    setLoanAmount("500000");
    setInterestRate("8.5");
    setTenure("5");
    setCopied(false);
  };

  const isValid =
    Number(loanAmount) > 0 &&
    Number(interestRate) >= 0 &&
    Number(tenure) > 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <ToolHeader />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
            <Calculator size={14} />
            Free finance tool
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            EMI Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Calculate your monthly loan EMI, total interest and total repayment
            amount instantly.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Loan Amount */}
            <div>
              <label
                htmlFor="loanAmount"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Loan amount
              </label>

              <div className="relative">
                <IndianRupee
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="loanAmount"
                  type="number"
                  min="0"
                  inputMode="decimal"
                  value={loanAmount}
                  onChange={(event) => setLoanAmount(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-lg font-medium text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  placeholder="Enter loan amount"
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Example: ₹5,00,000
              </p>
            </div>

            {/* Interest Rate */}
            <div>
              <label
                htmlFor="interestRate"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Interest rate
              </label>

              <div className="relative">
                <input
                  id="interestRate"
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={interestRate}
                  onChange={(event) => setInterestRate(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-lg font-medium text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  placeholder="Enter interest rate"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  %
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Annual interest rate
              </p>
            </div>

            {/* Loan Tenure */}
            <div>
              <label
                htmlFor="loanTenure"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Loan tenure
              </label>

              <div className="relative">
                <input
                  id="loanTenure"
                  type="number"
                  min="0"
                  step="1"
                  inputMode="decimal"
                  value={tenure}
                  onChange={(event) => setTenure(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-20 text-lg font-medium text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  placeholder="Enter tenure"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  Years
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Total repayment period
              </p>
            </div>

            {/* EMI Preview */}
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Monthly EMI
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                {formatCurrency(calculation.emi)}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Approximate monthly payment
              </p>
            </div>
          </div>

          {/* Invalid Input */}
          {!isValid && (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              Enter a valid loan amount, interest rate and loan tenure to
              calculate your EMI.
            </div>
          )}

          {/* Results */}
          <div className="mt-8 rounded-2xl bg-slate-950 p-6 text-white sm:p-7">
            <div>
              <p className="text-sm font-medium text-slate-400">
                Your monthly EMI
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {formatCurrency(calculation.emi)}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Based on {formatCurrency(Number(loanAmount))} loan at{" "}
                {interestRate || "0"}% for {tenure || "0"} years
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-xs font-medium text-slate-400">
                  Principal
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {formatCurrency(Number(loanAmount))}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-xs font-medium text-slate-400">
                  Total Interest
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {formatCurrency(calculation.totalInterest)}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-xs font-medium text-slate-400">
                  Total Payment
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {formatCurrency(calculation.totalPayment)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={copyResult}
              disabled={!isValid}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
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

        {/* Benefits */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-950">
              Instant calculation
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Change any value and your EMI updates instantly without
              submitting a form.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-950">
              Complete breakdown
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              See your monthly EMI, total interest and total repayment amount
              in one place.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-950">
              Private & simple
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Calculations happen directly in your browser. No account is
              required.
            </p>
          </div>
        </div>

        {/* SEO Content */}
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-950">
            EMI Calculator
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Use this free EMI calculator to estimate the monthly installment
            for a home loan, personal loan, education loan, car loan or other
            borrowing. Enter the loan amount, annual interest rate and loan
            tenure to calculate your estimated monthly EMI, total interest
            and total repayment amount.
          </p>

          <h3 className="mt-6 font-semibold text-slate-950">
            How is EMI calculated?
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            EMI is calculated using the principal loan amount, monthly
            interest rate and total number of monthly installments. The
            calculator uses the standard reducing-balance EMI formula.
          </p>

          <p className="mt-4 text-xs leading-6 text-slate-400">
            Note: This calculator provides an estimate. Actual repayment can
            vary depending on lender terms, processing fees, insurance,
            taxes and other applicable charges.
          </p>
        </section>
      </div>
    </div>
  );
}