import { useMemo, useState } from "react";
import {
  Clipboard,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";

import ToolHeader from "../layout/ToolHeader";

type Subject = {
  id: number;
  name: string;
  credits: number;
  gradePoint: number;
};

const gradeOptions = [
  { label: "O — Outstanding", value: 10 },
  { label: "A+ — Excellent", value: 9 },
  { label: "A — Very Good", value: 8 },
  { label: "B+ — Good", value: 7 },
  { label: "B — Above Average", value: 6 },
  { label: "C — Average", value: 5 },
  { label: "P — Pass", value: 4 },
];

function createSubject(id: number): Subject {
  return {
    id,
    name: "",
    credits: 4,
    gradePoint: 10,
  };
}

export default function CgpaCalculator() {
  const [subjects, setSubjects] = useState<Subject[]>([
    createSubject(1),
    createSubject(2),
    createSubject(3),
    createSubject(4),
  ]);

  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const validSubjects = subjects.filter(
      (subject) => subject.credits > 0 && subject.gradePoint >= 0
    );

    const totalCredits = validSubjects.reduce(
      (sum, subject) => sum + subject.credits,
      0
    );

    const totalCreditPoints = validSubjects.reduce(
      (sum, subject) =>
        sum + subject.credits * subject.gradePoint,
      0
    );

    const cgpa =
      totalCredits > 0
        ? totalCreditPoints / totalCredits
        : 0;

    const percentage = cgpa * 9.5;

    return {
      totalCredits,
      totalCreditPoints,
      cgpa,
      percentage,
    };
  }, [subjects]);

  const updateSubject = (
    id: number,
    field: keyof Subject,
    value: string | number
  ) => {
    setSubjects((current) =>
      current.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              [field]: value,
            }
          : subject
      )
    );
  };

  const addSubject = () => {
    const nextId =
      subjects.length > 0
        ? Math.max(...subjects.map((subject) => subject.id)) + 1
        : 1;

    setSubjects((current) => [
      ...current,
      createSubject(nextId),
    ]);
  };

  const removeSubject = (id: number) => {
    if (subjects.length === 1) return;

    setSubjects((current) =>
      current.filter((subject) => subject.id !== id)
    );
  };

  const resetCalculator = () => {
    setSubjects([
      createSubject(1),
      createSubject(2),
      createSubject(3),
      createSubject(4),
    ]);

    setCopied(false);
  };

  const copyResult = async () => {
    const text = [
      "CGPA Calculation Result",
      `CGPA: ${result.cgpa.toFixed(2)}`,
      `Percentage: ${result.percentage.toFixed(2)}%`,
      `Total Credits: ${result.totalCredits}`,
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <ToolHeader />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
            <span className="text-lg font-bold">CG</span>
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            CGPA Calculator
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Calculate your CGPA and estimated percentage using
            subject grades and credits.
          </p>
        </div>

        {/* Calculator */}
        <section className="mx-auto mt-10 max-w-4xl rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {/* Subject Header */}
          <div className="hidden grid-cols-[1fr_120px_220px_48px] gap-3 border-b border-slate-100 pb-3 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:grid">
            <span>Subject</span>
            <span>Credits</span>
            <span>Grade</span>
            <span />
          </div>

          {/* Subjects */}
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div
                key={subject.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid sm:grid-cols-[1fr_120px_220px_48px] sm:items-center sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0"
              >
                {/* Subject */}
                <div>
                  <label
                    htmlFor={`subject-${subject.id}`}
                    className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400 sm:hidden"
                  >
                    Subject {index + 1}
                  </label>

                  <input
                    id={`subject-${subject.id}`}
                    type="text"
                    value={subject.name}
                    onChange={(event) =>
                      updateSubject(
                        subject.id,
                        "name",
                        event.target.value
                      )
                    }
                    placeholder={`Subject ${index + 1}`}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                {/* Credits */}
                <div className="mt-3 sm:mt-0">
                  <label
                    htmlFor={`credits-${subject.id}`}
                    className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400 sm:hidden"
                  >
                    Credits
                  </label>

                  <input
                    id={`credits-${subject.id}`}
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    value={subject.credits}
                    onChange={(event) =>
                      updateSubject(
                        subject.id,
                        "credits",
                        Number(event.target.value)
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                {/* Grade */}
                <div className="mt-3 sm:mt-0">
                  <label
                    htmlFor={`grade-${subject.id}`}
                    className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400 sm:hidden"
                  >
                    Grade
                  </label>

                  <select
                    id={`grade-${subject.id}`}
                    value={subject.gradePoint}
                    onChange={(event) =>
                      updateSubject(
                        subject.id,
                        "gradePoint",
                        Number(event.target.value)
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  >
                    {gradeOptions.map((grade) => (
                      <option
                        key={grade.value}
                        value={grade.value}
                      >
                        {grade.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Remove */}
                <div className="mt-3 flex justify-end sm:mt-0">
                  <button
                    type="button"
                    onClick={() =>
                      removeSubject(subject.id)
                    }
                    disabled={subjects.length === 1}
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                    title="Remove subject"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Subject */}
          <button
            type="button"
            onClick={addSubject}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <Plus size={17} />
            Add Subject
          </button>

          {/* Result */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-900 p-6 text-white">
              <p className="text-sm font-medium text-slate-400">
                Your CGPA
              </p>

              <p className="mt-2 text-4xl font-bold tracking-tight">
                {result.cgpa.toFixed(2)}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Based on {result.totalCredits} total credits
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-500">
                Estimated Percentage
              </p>

              <p className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
                {result.percentage.toFixed(2)}%
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Using CGPA × 9.5
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <p className="text-xs font-medium text-slate-400">
                Total Credits
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {result.totalCredits}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <p className="text-xs font-medium text-slate-400">
                Total Credit Points
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {result.totalCreditPoints.toFixed(2)}
              </p>
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
            How CGPA is calculated
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            CGPA is calculated using the credit-weighted average
            of grade points. Each subject's grade point is multiplied
            by its credits, and the total is divided by the total
            number of credits.
          </p>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-slate-900">
              Formula
            </p>

            <div className="mt-3 rounded-xl bg-slate-50 px-4 py-4 text-center font-mono text-sm text-slate-700">
              CGPA = Σ (Credit × Grade Point) ÷ Σ Credits
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">
                Add subjects
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Add as many subjects as required for your semester.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">
                Enter credits
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter the credit value assigned to each subject.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">
                Select grades
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Select the grade point corresponding to your grade.
              </p>
            </div>
          </div>

          <p className="mt-6 text-xs leading-5 text-slate-400">
            Note: The CGPA-to-percentage conversion can vary between
            universities and institutions. The 9.5 multiplier shown
            here is a commonly used conversion and may not apply to
            every university.
          </p>
        </section>
      </main>
    </div>
  );
}