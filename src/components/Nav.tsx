"use client";
// ─────────────────────────────────────────────
// Nav — portfolio navigation with smooth scroll
// ─────────────────────────────────────────────

import { useState } from "react";

const NAV_ITEMS = [
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
] as const;

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  const handleNav = (href: string) => {
    setOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <nav id="gsap-nav" className="w-full shrink-0 h-[54px] flex items-center justify-between px-4 sm:px-6 relative z-50">

        {/* ── Left: brand + desktop nav ── */}
        <div className="flex items-center gap-1.5">
          {/* Brand */}
          <button
            onClick={() => scrollTo("#hero")}
            className="text-[13px] font-mondwest font-semibold text-white bg-white/10 hover:bg-white hover:text-gray-900 rounded-lg px-3 py-[7px] transition-colors border border-transparent hover:border-gray-200 whitespace-nowrap"
          >
            Abshar777
          </button>

          {/* Desktop nav items */}
          <div className="hidden lg:flex gap-1.5 items-center">
            {NAV_ITEMS.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleNav(href)}
                className="text-[13px] font-semibold text-white/70 hover:text-white hover:bg-white/[0.08] rounded-lg px-3 py-[7px] transition-colors whitespace-nowrap"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Right: resume + hire me + hamburger ── */}
        <div className="flex items-center gap-2">
          <a
            href="/abshar-resume.pdf"
            download="Muhammed-Abshar-Resume.pdf"
            className="hidden sm:inline-flex items-center text-[13px] font-medium text-white/70 bg-white/[0.07] border border-white/[0.12] hover:bg-white/[0.14] hover:text-white transition-colors rounded-lg px-4 py-[7px] whitespace-nowrap"
          >
            Resume
          </a>
          <button
            onClick={() => handleNav("#contact")}
            className="text-[13px] font-semibold bg-white text-black hover:bg-gray-100 transition-colors rounded-lg px-4 py-[7px] whitespace-nowrap"
          >
            Call me
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="lg:hidden ml-1 w-8 h-8 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-white/10 transition-colors"
          >
            <span className={`block h-px bg-white transition-all duration-200 ${open ? "rotate-45 translate-y-[6px]" : ""}`} style={{ width: "18px" }} />
            <span className={`block h-px bg-white transition-all duration-200 ${open ? "opacity-0 scale-x-0" : ""}`} style={{ width: "18px" }} />
            <span className={`block h-px bg-white transition-all duration-200 ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} style={{ width: "18px" }} />
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown ── */}
      {open && (
        <div className="lg:hidden fixed inset-x-0 top-[94px] z-40 px-4 pb-4">
          <div className="rounded-2xl bg-[#141414] border border-white/[0.08] p-3 flex flex-col gap-1 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            {NAV_ITEMS.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleNav(href)}
                className="text-[14px] font-medium text-white/80 hover:text-white hover:bg-white/[0.07] rounded-xl px-4 py-3 text-left transition-colors"
              >
                {label}
              </button>
            ))}
            <div className="mt-1 pt-2 border-t border-white/[0.07] flex flex-col gap-1">
              <a
                href="/abshar-resume.pdf"
                download="Muhammed-Abshar-Resume.pdf"
                onClick={() => setOpen(false)}
                className="text-[14px] font-medium text-white/80 hover:text-white hover:bg-white/[0.07] rounded-xl px-4 py-3 text-left transition-colors"
              >
                Download Resume
              </a>
              <button
                onClick={() => handleNav("#contact")}
                className="text-[14px] font-semibold bg-white text-black hover:bg-gray-100 rounded-xl px-4 py-3 text-left transition-colors mt-1"
              >
                Call me
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-30" onClick={() => setOpen(false)} />
      )}
    </>
  );
}
