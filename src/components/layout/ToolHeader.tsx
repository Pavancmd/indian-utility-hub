import { ArrowLeft } from "lucide-react";

export default function ToolHeader() {
  const handleBack = () => {
    const referrer = document.referrer;

    const currentOrigin = window.location.origin;

    const hasSameOriginPreviousPage =
      referrer.startsWith(currentOrigin) &&
      new URL(referrer).pathname !== window.location.pathname;

    if (hasSameOriginPreviousPage && window.history.length > 1) {
      window.history.back();
      return;
    }

    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = "/";
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-950"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/";
          }}
          className="text-sm font-bold tracking-tight text-slate-950 transition hover:text-slate-700"
        >
          Indian Utility Hub
        </button>
      </div>
    </header>
  );
}