"use client";
// ─────────────────────────────────────────────
// AnnouncementBar — availability status strip
// ─────────────────────────────────────────────

import { useState } from "react";

interface PlacedIcon {
  src: string;
  label: string;
  size: number;
  top: number;
  side: "left" | "right";
  offset: number;
}

const PLACED: PlacedIcon[] = [
  // ── Left cluster ──────────────────────────
  { src: "/icons/NextJS-Light.svg",       label: "React",    size: 50, top: -9,  side: "left",  offset: 20  },
  { src: "/icons/AWS-Dark.svg",         label: "AWS",      size: 44, top:  3,  side: "left",  offset: 82  },
  { src: "/icons/Bun-Light.svg",      label: "Node.js",  size: 48, top: -5,  side: "left",  offset: 140 },

  // ── Right cluster ─────────────────────────
  { src: "/icons/Docker.svg",           label: "Docker",   size: 50, top: -8,  side: "right", offset: 20  },
  { src: "/icons/Firebase-Dark.svg",    label: "Firebase", size: 44, top:  4,  side: "right", offset: 82  },
  { src: "/icons/GCP-Light.svg",         label: "GCP",      size: 48, top: -4,  side: "right", offset: 140 },
];

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div id="gsap-announcement" className="h-10 w-full shrink-0 relative bg-[#1B48E8] overflow-hidden">

      {/* ── Scattered tech icons ── */}
      {PLACED.map((icon) => (
        <div
          key={icon.label}
          title={icon.label}
          className="absolute flex max-md:hidden items-center justify-center p-[9px]"
          style={{
            width:  icon.size,
            height: icon.size,
            top:    icon.top,
            [icon.side]: icon.offset,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon.src} alt={icon.label} className="w-full h-full object-contain" draggable={false} />
        </div>
      ))}

      {/* ── Edge fades ── */}
      <div className="absolute inset-y-0 left-0 w-16 pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to right, #1B48E8 35%, transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-16 pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to left, #1B48E8 35%, transparent)" }} />

      {/* ── Centre copy ── */}
      <p className="absolute inset-0 flex items-center justify-center pointer-events-none z-[3]">
        {/* Mobile */}
        <span className="sm:hidden text-[10px] font-bold tracking-[0.1em] uppercase text-white">
           Open to freelance  →
        </span>
        {/* Desktop */}
        <span className="hidden sm:inline text-[11px] font-semibold tracking-[0.15em] uppercase text-white whitespace-nowrap">
      

          <span className="font-bold">Full Stack &amp; DevOps Engineer</span>
          <span className="opacity-25 mx-3">|</span>
          <span className="opacity-70">Open to freelance  →</span>
        </span>
      </p>

      {/* ── Dismiss ── */}
      <button
        aria-label="Dismiss announcement"
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-[4] text-white/50 hover:text-white transition-colors text-sm leading-none"
      >
        ✕
      </button>
    </div>
  );
}
