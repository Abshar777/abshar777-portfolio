"use client";
// ─────────────────────────────────────────────────────────────────────────────
// StatsSection — scroll-triggered reveal via GSAP + ScrollTrigger
//
//  • Heading  : word-by-word blur + y reveal (blur 14px→0, y 22→0, stagger)
//  • Stat cards: stagger up from y:60 as the grid enters viewport
//  • Numbers  : count up from 0 → target when each card enters view
//  • Icons    : spring-pop scale from 0 with a back.out ease
//
//  "sw" = split-word — every heading token gets this class so GSAP can
//         target them all at once with a single selector.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Stat { num: string; label: string; desc: string }

const STATS: Stat[] = [
  {
    num: "30+",
    label: "Production applications delivered",
    desc: "Built trading platforms, ERP systems, and enterprise-grade web apps for real users and businesses.",
  },
  {
    num: "3+",
    label: "Years of hands-on development",
    desc: "Focused on full-stack engineering, cloud infrastructure, DevOps, and scalable architecture using modern technologies.",
  },
  {
    num: "30+",
    label: "Technologies across web & cloud",
    desc: "Working with Next.js, Node.js, Kubernetes, Kafka, Docker, AWS, PostgreSQL, MongoDB, and more.",
  },
];

// ── Tiny helper: inline-block word span ──────────────────────────────────────
// `inline-block` is required so transform + filter work on inline elements.
function W({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`sw inline-block ${className}`}>
      {children}
    </span>
  );
}

function PixelUpArrow() {
  return (
    <svg width="20" height="26" viewBox="0 0 24 30" fill="none" aria-hidden="true"
      className="mb-1.5 shrink-0 stat-icon">
      <rect x="9.6"  y="0"    width="4.8" height="4.8" fill="#0044FF" />
      <rect x="9.6"  y="4.8"  width="4.8" height="4.8" fill="#0044FF" />
      <rect x="4.8"  y="4.8"  width="4.8" height="4.8" fill="#0044FF" />
      <rect x="0"    y="9.6"  width="4.8" height="4.8" fill="#0044FF" />
      <rect x="9.6"  y="9.6"  width="4.8" height="4.8" fill="#0044FF" />
      <rect x="14.4" y="4.8"  width="4.8" height="4.8" fill="#0044FF" />
      <rect x="19.2" y="9.6"  width="4.8" height="4.8" fill="#0044FF" />
      <rect x="9.6"  y="14.4" width="4.8" height="4.8" fill="#0044FF" />
      <rect x="9.6"  y="24"   width="4.8" height="4.8" fill="#0044FF" />
    </svg>
  );
}

interface StatCardProps extends Stat { index: number }

function StatCard({ num, label, desc, index }: StatCardProps) {
  const numericVal = parseInt(num, 10);
  const suffix     = num.replace(/[0-9]/g, "");

  return (
    <div className="stat-card flex flex-col min-w-0">
      <div className="flex items-end gap-2 mb-2.5">
        <PixelUpArrow />
        <span
          className={`stat-num-${index} font-mondwest text-white leading-none`}
          style={{ fontSize: "clamp(40px, 6.2vw, 90px)" }}
          data-target={numericVal}
          data-suffix={suffix}
        >
          00{suffix}
        </span>
      </div>
      <p className="text-white font-semibold text-[14px] sm:text-[16px] mb-1.5">{label}</p>
      <p className="text-white/50 text-[13px] sm:text-[14px] leading-relaxed max-w-[260px]">{desc}</p>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Word-by-word blur + y reveal ──────────────────────────────────
      // Set will-change before animation for GPU-composited blur transitions
      gsap.set(".stats-heading .sw", {
        willChange: "filter, transform, opacity",
      });

      gsap.fromTo(
        ".stats-heading .sw",
        {
          opacity: 0,
          filter: "blur(14px)",
          y: 22,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.88,
          stagger: 0.065,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-heading",
            start: "top 82%",
          },
          onComplete() {
            // Remove filter entirely after animation — avoids compositing cost
            gsap.set(".stats-heading .sw", {
              willChange: "auto",
              filter: "none",
            });
          },
        },
      );

      // ── Stat cards stagger in ──────────────────────────────────────────
      gsap.fromTo(
        ".stat-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 82%",
          },
        },
      );

      // ── Pixel arrows spring-pop ────────────────────────────────────────
      gsap.from(".stat-icon", {
        scale: 0,
        opacity: 0,
        duration: 0.55,
        stagger: 0.14,
        ease: "back.out(1.8)",
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 82%",
        },
      });

      // ── Number count-up per card ───────────────────────────────────────
      STATS.forEach((_, i) => {
        const el = document.querySelector(`.stat-num-${i}`) as HTMLElement | null;
        if (!el) return;

        const target = Number(el.dataset.target ?? 0);
        const suffix = el.dataset.suffix ?? "";
        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate() {
            el.textContent = Math.round(counter.val) + suffix;
          },
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden hero-grid">

      {/* Right vignette */}
      <div className="absolute top-0 right-0 h-full pointer-events-none z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/right-grid-1.png" alt="" className="h-full w-auto block" />
      </div>

      <div className="relative z-[2] px-5 sm:px-8 md:pl-[clamp(32px,8.5vw,130px)] md:pr-[clamp(32px,5vw,80px)] pt-10 sm:pt-14 md:pt-16 pb-14 sm:pb-20 md:pb-24">

        {/* ── Heading — every visible token is a .sw span ── */}
        <h2
          className="stats-heading font-inter font-bold text-white leading-[1.1] tracking-[-0.025em] mb-12 sm:mb-16 md:mb-20"
          style={{ fontSize: "clamp(1.6rem, 4.5vw, 3rem)" }}
        >
          {/* Line 1 */}
          <W>Engineering</W>{" "}
          <W>modern</W>{" "}
          <W className="align-middle">
            <Image
              src="/icon-folder.png"
              alt=""
              width={500}
              height={500}
              className="inline-block align-middle w-auto h-[1.4em] mx-1"
            />
          </W>{" "}
          <W className="italic font-light font-mondwest">platforms</W>

          <br />

          {/* Line 2 */}
          <W>with</W>{" "}
          <W>scalable</W>{" "}
          <W>systems,</W>{" "}
          <W>intuitive</W>

          <br />

          {/* Line 3 */}
          <W>interfaces</W>{" "}
          <W>&amp;</W>{" "}
          <W className="align-middle">
            <Image
              src="/icon-star.png"
              alt=""
              width={60}
              height={64}
              className="inline-block align-middle w-auto h-[1.4em] mx-1"
            />
          </W>{" "}
          <W className="italic font-light font-mondwest">real-world</W>{" "}
          <W>performance.</W>
        </h2>

        {/* Stats grid */}
        <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 md:gap-x-7">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
