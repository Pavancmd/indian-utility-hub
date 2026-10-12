import { useMemo, useState } from "react";

import {
  CalendarDays,
  Cake,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";

import ToolHeader from "../layout/ToolHeader";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function getDateWithoutTime(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function calculateAge(birthDate: Date, today: Date) {
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;

    const previousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    );

    days += previousMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

function getNextBirthday(birthDate: Date, today: Date) {
  let nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate(),
  );

  if (nextBirthday < today) {
    nextBirthday = new Date(
      today.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate(),
    );
  }

  return nextBirthday;
}

function getDaysBetween(startDate: Date, endDate: Date) {
  const start = getDateWithoutTime(startDate);
  const end = getDateWithoutTime(endDate);

  return Math.floor(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );
}

export default function AgeCalculator() {
  const today = getDateWithoutTime(new Date());

  const defaultBirthDate = new Date(
    today.getFullYear() - 21,
    today.getMonth(),
    today.getDate(),
  );

  const [birthDate, setBirthDate] = useState(
    defaultBirthDate.toISOString().split("T")[0],
  );

  const [copied, setCopied] = useState(false);

  const calculation = useMemo(() => {
    if (!birthDate) {
      return null;
    }

    const parsedBirthDate = new Date(`${birthDate}T00:00:00`);

    if (
      Number.isNaN(parsedBirthDate.getTime()) ||
      parsedBirthDate > today
    ) {
      return null;
    }

    const age = calculateAge(parsedBirthDate, today);
    const nextBirthday = getNextBirthday(parsedBirthDate, today);
    const daysUntilBirthday = getDaysBetween(today, nextBirthday);
    const totalDays = getDaysBetween(parsedBirthDate, today);

    const totalMonths = age.years * 12 + age.months;
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;

    return {
      age,
      nextBirthday,
      daysUntilBirthday,
      totalDays,
      totalMonths,
      totalWeeks,
      totalHours,
    };
  }, [birthDate, today]);

  const formattedBirthDate = useMemo(() => {
    if (!birthDate) {
      return "";
    }

    const date = new Date(`${birthDate}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }, [birthDate]);

  const formattedNextBirthday = useMemo(() => {
    if (!calculation) {
      return "";
    }

    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(calculation.nextBirthday);
  }, [calculation]);

  const copyResult = async () => {
    if (!calculation) {
      return;
    }

    const text = [
      "Indian Utility Hub - Age Calculator",
      `Date of Birth: ${formattedBirthDate}`,
      `Age: ${calculation.age.years} years, ${calculation.age.months} months, ${calculation.age.days} days`,
      `Next Birthday: ${formattedNextBirthday}`,
      `Days Until Next Birthday: ${calculation.daysUntilBirthday}`,
      `Total Days: ${calculation.totalDays}`,
    ].join("\n");

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
    setBirthDate(
      defaultBirthDate.toISOString().split("T")[0],
    );

    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <ToolHeader />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
            <CalendarDays size={14} />
            Free everyday tool
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Age Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Calculate your exact age in years, months and days. You can also
            find your next birthday and total days lived.
          </p>
        </div>

        {/* Calculator */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            {/* Input */}
            <div>
              <label
                htmlFor="birthDate"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Date of birth
              </label>

              <div className="relative">
                <CalendarDays
                  size={19}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  max={today.toISOString().split("T")[0]}
                  onChange={(event) => setBirthDate(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-base font-medium text-slate-950 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              {birthDate &&
                new Date(`${birthDate}T00:00:00`) > today && (
                  <p className="mt-2 text-sm font-medium text-red-600">
                    Date of birth cannot be in the future.
                  </p>
                )}

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Select your date of birth to calculate your exact current age.
              </p>

              <button
                type="button"
                onClick={resetCalculator}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>

            {/* Main Result */}
            <div className="rounded-2xl bg-slate-950 p-6 text-white sm:p-7">
              <p className="text-sm font-medium text-slate-400">
                Your exact age
              </p>

              {calculation ? (
                <>
                  <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-2">
                    <span className="text-4xl font-bold tracking-tight sm:text-5xl">
                      {calculation.age.years}
                    </span>

                    <span className="pb-1 text-sm text-slate-400">
                      years
                    </span>

                    <span className="text-4xl font-bold tracking-tight sm:text-5xl">
                      {calculation.age.months}
                    </span>

                    <span className="pb-1 text-sm text-slate-400">
                      months
                    </span>

                    <span className="text-4xl font-bold tracking-tight sm:text-5xl">
                      {calculation.age.days}
                    </span>

                    <span className="pb-1 text-sm text-slate-400">
                      days
                    </span>
                  </div>

                  <div className="mt-6 border-t border-slate-800 pt-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Date of birth
                    </p>

                    <p className="mt-1 font-semibold text-slate-200">
                      {formattedBirthDate}
                    </p>
                  </div>
                </>
              ) : (
                <p className="mt-4 text-slate-400">
                  Enter a valid date of birth.
                </p>
              )}
            </div>
          </div>

          {calculation && (
            <>
              {/* Birthday */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
                      <Cake size={19} />
                    </span>

                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        Next birthday
                      </p>

                      <p className="mt-0.5 font-semibold text-slate-950">
                        {formattedNextBirthday}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-600">
                    {calculation.daysUntilBirthday === 0
                      ? "Your birthday is today! 🎉"
                      : `${formatNumber(
                          calculation.daysUntilBirthday,
                        )} days remaining`}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-medium text-slate-500">
                    Age in different units
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-lg font-bold text-slate-950">
                        {formatNumber(calculation.totalMonths)}
                      </p>

                      <p className="text-xs text-slate-500">
                        Total months
                      </p>
                    </div>

                    <div>
                      <p className="text-lg font-bold text-slate-950">
                        {formatNumber(calculation.totalWeeks)}
                      </p>

                      <p className="text-xs text-slate-500">
                        Total weeks
                      </p>
                    </div>

                    <div>
                      <p className="text-lg font-bold text-slate-950">
                        {formatNumber(calculation.totalDays)}
                      </p>

                      <p className="text-xs text-slate-500">
                        Total days
                      </p>
                    </div>

                    <div>
                      <p className="text-lg font-bold text-slate-950">
                        {formatNumber(calculation.totalHours)}
                      </p>

                      <p className="text-xs text-slate-500">
                        Approx. hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Copy */}
              <button
                type="button"
                onClick={copyResult}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
                {copied ? "Copied" : "Copy result"}
              </button>
            </>
          )}
        </div>

        {/* Useful Information */}
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-950">
              Exact age
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Get your age calculated precisely in years, months and days.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-950">
              Next birthday
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Find your upcoming birthday and see exactly how many days remain.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-950">
              Total age
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              See your approximate age in total months, weeks, days and hours.
            </p>
          </div>
        </section>

        {/* SEO Content */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-950">
            Age Calculator
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            This free age calculator helps you calculate your exact age from
            your date of birth. Enter your birth date to find your current age
            in years, months and days, your next birthday and the approximate
            number of days you have lived.
          </p>

          <h3 className="mt-6 font-semibold text-slate-950">
            How does the age calculator work?
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            The calculator compares your date of birth with the current date
            and calculates the difference in complete years, months and days.
            It also determines the date of your next birthday.
          </p>

          <h3 className="mt-6 font-semibold text-slate-950">
            What can you use an age calculator for?
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            An age calculator can be useful for everyday age calculations,
            birthday planning, filling forms, checking age eligibility and
            quickly finding the exact difference between a birth date and
            today.
          </p>

          <p className="mt-4 text-xs leading-6 text-slate-400">
            Note: Age calculations are based on calendar dates. Eligibility
            requirements for official applications should always be checked
            against the applicable rules and cutoff date.
          </p>
        </section>
      </div>
    </div>
  );
}