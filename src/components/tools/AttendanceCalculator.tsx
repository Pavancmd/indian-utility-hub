import { useMemo, useState } from "react";

import {
  Clipboard,
  RotateCcw,
} from "lucide-react";

import ToolHeader from "../layout/ToolHeader";

export default function AttendanceCalculator() {
  const [totalClasses, setTotalClasses] = useState(100);
  const [attendedClasses, setAttendedClasses] = useState(75);
  const [targetAttendance, setTargetAttendance] = useState(75);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const total = Math.max(0, totalClasses);

    const attended = Math.min(
      Math.max(0, attendedClasses),
      total
    );

    const absent = Math.max(0, total - attended);

    const currentPercentage =
      total > 0 ? (attended / total) * 100 : 0;

    /*
     * Classes that must be attended consecutively
     * to reach the target percentage:
     *
     * (attended + x) / (total + x) >= target / 100
     */

    let classesNeeded = 0;

    if (total > 0 && currentPercentage < targetAttendance) {
      const target = targetAttendance / 100;

      if (target < 1) {
        classesNeeded = Math.ceil(
          (target * total - attended) / (1 - target)
        );

        classesNeeded = Math.max(0, classesNeeded);
      }
    }

    /*
     * Maximum classes that can be missed while maintaining
     * the target attendance, assuming future classes are attended.
     *
     * attended / (total + x) >= target / 100
     */

    let classesCanMiss = 0;

    if (total > 0) {
      const target = targetAttendance / 100;

      if (target > 0) {
        classesCanMiss = Math.floor(
          attended / target - total
        );

        classesCanMiss = Math.max(0, classesCanMiss);
      }
    }

    const afterRequiredClasses =
      classesNeeded > 0
        ? ((attended + classesNeeded) /
            (total + classesNeeded)) *
          100
        : currentPercentage;

    return {
      total,
      attended,
      absent,
      currentPercentage,
      classesNeeded,
      classesCanMiss,
      afterRequiredClasses,
    };
  }, [totalClasses, attendedClasses, targetAttendance]);

  const copyResult = async () => {
    const text = [
      "Attendance Calculation Result",
      `Current Attendance: ${result.currentPercentage.toFixed(2)}%`,
      `Total Classes: ${result.total}`,
      `Attended Classes: ${result.attended}`,
      `Absent Classes: ${result.absent}`,
      `Target Attendance: ${targetAttendance}%`,
      `Classes Needed: ${result.classesNeeded}`,
      `Classes Can Miss: ${result.classesCanMiss}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  const resetCalculator = () => {
    setTotalClasses(100);
    setAttendedClasses(75);
    setTargetAttendance(75);
    setCopied(false);
  };

  const getAttendanceStatus = () => {
    if (result.total === 0) {
      return {
        label: "Enter your class details",
        className: "text-slate-500",
      };
    }

    if (result.currentPercentage >= targetAttendance) {
      return {
        label: "You are above your target",
        className: "text-emerald-600",
      };
    }

    return {
      label: "You need to attend more classes",
      className: "text-amber-600",
    };
  };

  const status = getAttendanceStatus();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <ToolHeader />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
            <span className="text-lg font-bold">%</span>
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Attendance Calculator
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Calculate your current attendance and find out how many
            classes you need to attend to reach your target.
          </p>
        </div>

        {/* Calculator */}
        <section className="mx-auto mt-10 max-w-4xl rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {/* Inputs */}
          <div className="grid gap-5 sm:grid-cols-3">
            {/* Total */}
            <div>
              <label
                htmlFor="totalClasses"
                className="text-sm font-semibold text-slate-700"
              >
                Total Classes
              </label>

              <input
                id="totalClasses"
                type="number"
                min="0"
                value={totalClasses}
                onChange={(event) =>
                  setTotalClasses(
                    Math.max(0, Number(event.target.value))
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />

              <p className="mt-1.5 text-xs text-slate-400">
                Total lectures conducted
              </p>
            </div>

            {/* Attended */}
            <div>
              <label
                htmlFor="attendedClasses"
                className="text-sm font-semibold text-slate-700"
              >
                Classes Attended
              </label>

              <input
                id="attendedClasses"
                type="number"
                min="0"
                max={totalClasses}
                value={attendedClasses}
                onChange={(event) =>
                  setAttendedClasses(
                    Math.max(0, Number(event.target.value))
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />

              <p className="mt-1.5 text-xs text-slate-400">
                Lectures you attended
              </p>
            </div>

            {/* Target */}
            <div>
              <label
                htmlFor="targetAttendance"
                className="text-sm font-semibold text-slate-700"
              >
                Target Attendance
              </label>

              <div className="relative mt-2">
                <input
                  id="targetAttendance"
                  type="number"
                  min="1"
                  max="100"
                  step="0.1"
                  value={targetAttendance}
                  onChange={(event) =>
                    setTargetAttendance(
                      Math.min(
                        100,
                        Math.max(
                          1,
                          Number(event.target.value)
                        )
                      )
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  %
                </span>
              </div>

              <p className="mt-1.5 text-xs text-slate-400">
                Minimum attendance you want
              </p>
            </div>
          </div>

          {/* Current Result */}
          <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-white">
            <p className="text-sm font-medium text-slate-400">
              Current Attendance
            </p>

            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-4xl font-bold tracking-tight">
                  {result.currentPercentage.toFixed(2)}%
                </p>

                <p
                  className={`mt-2 text-sm font-medium ${status.className}`}
                >
                  {status.label}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-sm text-slate-400">
                  Target
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {targetAttendance}%
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Total Classes
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-950">
                {result.total}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Attended
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {result.attended}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Absent
              </p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {result.absent}
              </p>
            </div>
          </div>

          {/* Target Result */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-slate-700">
                Classes to attend
              </p>

              {result.currentPercentage >= targetAttendance ? (
                <>
                  <p className="mt-2 text-3xl font-bold text-emerald-600">
                    0
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    You have already reached your target attendance.
                  </p>
                </>
              ) : targetAttendance >= 100 ? (
                <>
                  <p className="mt-2 text-3xl font-bold text-amber-600">
                    Not possible
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    A 100% target cannot be reached unless your
                    current attendance is already 100%.
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-2 text-3xl font-bold text-slate-950">
                    {result.classesNeeded}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Attend the next{" "}
                    <strong>
                      {result.classesNeeded}
                    </strong>{" "}
                    classes consecutively to reach approximately{" "}
                    <strong>
                      {result.afterRequiredClasses.toFixed(2)}%
                    </strong>
                    .
                  </p>
                </>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold text-slate-700">
                Classes you can miss
              </p>

              {result.currentPercentage >= targetAttendance ? (
                <>
                  <p className="mt-2 text-3xl font-bold text-slate-950">
                    {result.classesCanMiss}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    You can miss up to{" "}
                    <strong>
                      {result.classesCanMiss}
                    </strong>{" "}
                    upcoming classes while maintaining your target.
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-2 text-3xl font-bold text-amber-600">
                    0
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Reach your target first before planning additional
                    absences.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={copyResult}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Clipboard size={17} />
              {copied ? "Copied!" : "Copy Result"}
            </button>

            <button
              type="button"
              onClick={resetCalculator}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            >
              <RotateCcw size={17} />
              Reset
            </button>
          </div>
        </section>

        {/* Information */}
        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-xl font-bold text-slate-950">
            How attendance percentage is calculated
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Attendance percentage is calculated by dividing the number
            of classes attended by the total number of classes and
            multiplying the result by 100.
          </p>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-slate-900">
              Formula
            </p>

            <div className="mt-3 rounded-xl bg-slate-50 px-4 py-4 text-center font-mono text-sm text-slate-700">
              Attendance % = (Classes Attended ÷ Total Classes) × 100
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">
                Current attendance
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                See your current attendance percentage instantly.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">
                Target calculator
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Find how many consecutive classes you need to attend.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">
                Absence planning
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Check how many classes you can miss while maintaining
                your target.
              </p>
            </div>
          </div>

          <p className="mt-6 text-xs leading-5 text-slate-400">
            Note: Actual attendance rules, condonation limits and
            minimum attendance requirements may vary by college,
            university and course.
          </p>
        </section>
      </main>
    </div>
  );
}