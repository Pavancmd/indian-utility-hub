import { useState } from "react";
import { Menu, Moon, Sun, X, Sparkles } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark((current) => !current);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
            <Sparkles size={18} />
          </span>

          <div>
            <span className="block text-sm font-bold tracking-tight text-slate-950">
              Indian Utility Hub
            </span>
            <span className="hidden text-[10px] font-medium text-slate-500 sm:block">
              Simple tools. Everyday useful.
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          <a
            href="#tools"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            Tools
          </a>
          <a
            href="#categories"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            Categories
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            FAQ
          </a>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        <button
          onClick={() => setMobileOpen((value) => !value)}
          className="rounded-lg p-2 text-slate-700 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            <a
              href="#tools"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Tools
            </a>
            <a
              href="#categories"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Categories
            </a>
            <a
              href="#faq"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              FAQ
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}