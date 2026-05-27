"use client";
import Image from "next/image";
// ─────────────────────────────────────────────
// TimelineSection — Work Experience
// Centered single-column, scroll-triggered animations
// ─────────────────────────────────────────────

import React, { useEffect, useRef, useState } from "react";

// ─── IntersectionObserver hook ────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Data ─────────────────────────────────────

interface TimelineEntry {
  period: string;
  role: string;
  org: string;
  location?: string;
  badge?: string;
  badgeColor?: string;
  bullets: string[];
}

const WORK: TimelineEntry[] = [
  {
    period: "June 2025 – Present",
    role: "Senior Full Stack & DevOps Engineer",
    org: "Delta International Institution",
    location: "UAE – Remote",
    badge: "Current",
    badgeColor: "#1B48E8",
    bullets: [
      "Leading end-to-end development across frontend, backend, cloud & DevOps — 20+ production apps deployed.",
      "Architected AWS infrastructure, CI/CD pipelines, Docker, NGINX & Kubernetes for high-availability systems.",
      "Built MT5 Manager–linked trading systems and delivered Web3 & Blockchain-integrated solutions.",
      "Owned system architecture, database design, API development, deployment, and production maintenance.",
    ],
  },
  {
    period: "Jan 2025 – June 2025",
    role: "Full Stack & DevOps Engineer",
    org: "Luvid Technologies",
    location: "Service-Based Company",
    bullets: [
      "Independently designed and deployed 10+ ERP products with inventory, billing, RBAC, and reporting modules.",
      "Managed full server infrastructure — deployment, domain config, SSL setup, and production monitoring.",
      "Delivered production-ready solutions for multiple clients within tight timelines with clean, maintainable code.",
    ],
  },
  {
    period: "2023 – Present",
    role: "Freelance Full Stack & Web Developer",
    org: "Self-Employed",
    badge: "Ongoing",
    badgeColor: "#7c3aed",
    bullets: [
      "End-to-end delivery of 5+ client websites with responsive design, SEO optimization, and modern UI frameworks.",
      "Managed development, hosting, domain setup, SSL configuration, deployment, and ongoing client support.",
    ],
  },
];

// ─── PixelDot ─────────────────────────────────

function PixelDot({ active, visible }: { active?: boolean; visible?: boolean }) {
  const fill   = active ? "#1B48E8" : "#ffffff22";
  const corner = active ? "#1B48E8bb" : "#ffffff18";
  const center = active ? "#1B48E8" : "#ffffff0f";
  return (
    <svg
      width="14" height="14" viewBox="0 0 14 14" fill="none"
      aria-hidden="true"
      style={{
        transform: visible ? "scale(1)" : "scale(0)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease-out",
      }}
    >
      <rect x="4"  y="0"  width="6" height="2" fill={fill}   />
      <rect x="4"  y="12" width="6" height="2" fill={fill}   />
      <rect x="0"  y="4"  width="2" height="6" fill={fill}   />
      <rect x="12" y="4"  width="2" height="6" fill={fill}   />
      <rect x="2"  y="2"  width="2" height="2" fill={corner} />
      <rect x="10" y="2"  width="2" height="2" fill={corner} />
      <rect x="2"  y="10" width="2" height="2" fill={corner} />
      <rect x="10" y="10" width="2" height="2" fill={corner} />
      <rect x="4"  y="4"  width="6" height="6" fill={center} />
    </svg>
  );
}

// ─── Entry Card ───────────────────────────────

function Entry({
  e,
  active,
  index,
  inView,
}: {
  e: TimelineEntry;
  active?: boolean;
  index: number;
  inView: boolean;
}) {
  const delay = index * 200;

  return (
    <div
      className="relative pl-9 sm:pl-12"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Pixel dot — bouncy pop-in */}
      <div
        className="absolute left-0 top-[20px] -translate-x-[3px]"
        style={{ transitionDelay: `${delay + 150}ms` }}
      >
        <PixelDot active={active} visible={inView} />
      </div>

      {/* Card */}
      <div
        className="rounded-2xl backdrop-blur-sm  border p-6 sm:p-8 transition-colors duration-300 group"
        style={{
          borderColor: active ? "rgba(27,72,232,0.28)" : "rgba(255,255,255,0.07)",
          background: active
            ? "linear-gradient(145deg,rgba(27,72,232,0.07) 0%,rgba(27,72,232,0.02) 100%)"
            : "rgba(255,255,255,0.02)",
          boxShadow: active
            ? "0 0 64px rgba(27,72,232,0.09), inset 0 1px 0 rgba(27,72,232,0.14)"
            : "none",
        }}
      >
        {/* Period + Badge row */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <span
            className="font-mondwest text-[11px] sm:text-[12px] tracking-[0.09em]"
            style={{ color: active ? "#1B48E8" : "rgba(255,255,255,0.3)" }}
          >
            {e.period}
          </span>
          {e.badge && (
            <span
              className="text-[10px] font-bold tracking-[0.12em] uppercase rounded-full px-2.5 py-[3px] border"
              style={{
                color: e.badgeColor ?? "#ffffff80",
                borderColor: `${e.badgeColor ?? "#ffffff"}30`,
                background: `${e.badgeColor ?? "#ffffff"}10`,
              }}
            >
              {e.badge}
            </span>
          )}
        </div>

        {/* Role title */}
        <h4
          className="font-inter font-bold text-white leading-[1.2] mb-2"
          style={{ fontSize: "clamp(1rem, 2.4vw, 1.2rem)" }}
        >
          {e.role}
        </h4>

        {/* Org · Location */}
        <p className="text-white/35 text-[12px] sm:text-[13px] mb-5 font-medium">
          {e.org}
          {e.location && (
            <span className="text-white/20 font-normal"> · {e.location}</span>
          )}
        </p>

        {/* Bullets */}
        <ul className="space-y-2.5">
          {e.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-white/45 text-[12px] sm:text-[13px] leading-[1.65]">
              <span className="text-[#1B48E8] shrink-0 mt-[4px] text-[7px]">▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────

export default function TimelineSection() {
  const { ref: headRef, inView: headInView } = useInView(0.3);
  const { ref: listRef, inView: listInView } = useInView(0.05);

  return (
    <section className="relative overflow-hidden hero-grid">
      {/* Left vignettes */}
      <div className="absolute top-0 left-0 h-full pointer-events-none z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/left-grid-1.png" alt="" className="h-full w-auto max-h-[100vh] block" />
      </div>
      <div className="absolute top-[50%] left-0 h-full pointer-events-none z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/left-grid-1.png" alt="" className="h-full w-auto max-h-[100vh] block" />
      </div>
      {/* Right vignette */}
      <div className="absolute top-0 right-0 h-full pointer-events-none z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/right-grid-1.png" alt="" className="h-full w-auto max-h-[80vh] block" />
      </div>

      <div className="relative z-[2] px-5 sm:px-8 md:px-[clamp(32px,8.5vw,130px)] pt-14 sm:pt-20 md:pt-24 pb-16 sm:pb-24 md:pb-28">

        {/* ── Centered Heading ── */}
        <div
          ref={headRef}
          className="text-center mb-14 sm:mb-20"
        >
          {/* 03 counter */}
          <p
            className="font-mondwest text-[#1B48E8] text-[13px] tracking-[0.1em] mb-3"
            style={{
              opacity: headInView ? 1 : 0,
              transform: headInView ? "translateX(0)" : "translateX(-14px)",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            }}
          >
            03
          </p>

          <h2
            className="font-inter font-bold text-white leading-[1.05] tracking-[-0.025em]"
            style={{
              fontSize: "clamp(1.75rem, 4.5vw, 3rem)",
              opacity: headInView ? 1 : 0,
              transform: headInView ? "translateY(0)" : "translateY(22px)",
              transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
              transitionDelay: "60ms",
            }}
          >
            Work{" "}
           
            <span className="font-mondwest font-normal italic text-white/70">
              experience
            </span>
             <Image
                        src="/dt-4-research.png"
                        alt=""
                        width={500}
                        height={500}
                        className="inline-block align-middle w-auto h-[1em] mx-1"
                      />
          </h2>

          <p
            className="text-white/40 text-[13px] sm:text-[14px] mt-3 mx-auto max-w-[420px] leading-relaxed"
            style={{
              opacity: headInView ? 1 : 0,
              transform: headInView ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
              transitionDelay: "160ms",
            }}
          >
            3+ years building production systems — from startups to enterprise.
          </p>
        </div>

        {/* ── Centered Timeline ── */}
        <div className="max-w-[740px] mx-auto">
          <div ref={listRef} className="relative">

            {/* Animated vertical line */}
            <div
              className="absolute left-[3px] top-3 w-px  bg-gradient-to-b from-[#1B48E8] via-white/[0.07] to-transparent"
              style={{
                height: "calc(100% - 12px)",
                transformOrigin: "top",
                transform: listInView ? "scaleY(1)" : "scaleY(0)",
                transition: "transform 1.6s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: "300ms",
              }}
            />

            <div className="flex flex-col gap-8 sm:gap-10">
              {WORK.map((e, i) => (
                <Entry
                  key={i}
                  e={e}
                  active={i === 0}
                  index={i}
                  inView={listInView}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
