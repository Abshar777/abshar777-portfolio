"use client";
// ─────────────────────────────────────────────────────────────────────────────
// EquipSection — scroll-triggered reveal
//
//  • Heading  : word-by-word blur + y reveal (same signature as StatsSection)
//  • Sub-copy : single-block blur + y (body copy streams in as one unit)
//  • CTAs     : stagger slide-up + opacity
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Word-wrapper — inline-block so transform + filter work on inline text ────
function W({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`sw inline-block ${className}`}>
      {children}
    </span>
  );
}

export default function EquipSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading: word-by-word blur + y ────────────────────────────────
      gsap.set(".equip-heading .sw", {
        willChange: "filter, transform, opacity",
      });

      gsap.fromTo(
        ".equip-heading .sw",
        { opacity: 0, filter: "blur(14px)", y: 22 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.88,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".equip-heading",
            start: "top 82%",
          },
          onComplete() {
            gsap.set(".equip-heading .sw", { willChange: "auto", filter: "none" });
          },
        },
      );

      // ── Sub-copy: single-block blur + y (body copy, no word-split) ────
      gsap.fromTo(
        ".equip-sub",
        { opacity: 0, filter: "blur(10px)", y: 18 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".equip-sub",
            start: "top 84%",
          },
          onComplete() {
            gsap.set(".equip-sub", { filter: "none" });
          },
        },
      );

      // ── CTAs: stagger slide-up ─────────────────────────────────────────
      gsap.fromTo(
        ".equip-cta",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".equip-cta-group",
            start: "top 88%",
          },
        },
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden hero-grid">

      {/* Left vignette */}
      <div className="absolute top-0 left-0 h-full pointer-events-none z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/left-grid-1.png" alt="" className="h-full w-auto block" />
      </div>
      {/* Right vignette */}
      <div className="absolute top-0 right-0 h-full pointer-events-none z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/right-grid-1.png" alt="" className="h-full w-auto block" />
      </div>

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center text-center px-5 sm:px-8 pt-14 sm:pt-20 md:pt-28 pb-16 sm:pb-24 md:pb-32">

        {/* ── Heading — every token wrapped in <W> ── */}
        <h2
          className="equip-heading font-inter font-semibold text-white leading-[1.1] tracking-[-0.025em] mb-6 sm:mb-8 max-w-[900px] w-full"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.4rem)" }}
        >
          {/* Line 1 */}
          <W>From</W>{" "}
          <W className="align-middle">
            <Image
              src="/icon-enter-key.png"
              alt=""
              width={120}
              height={120}
              className="inline-block align-middle w-auto h-[0.9em] mx-1"
            />
          </W>{" "}
          <W>frontend</W>{" "}
          <W>to</W>

          <br />

          {/* Line 2 */}
          <W>cloud</W>{" "}
          <W className="align-middle">
            <Image
              src="/icon-lightning.png"
              alt=""
              width={120}
              height={120}
              className="inline-block align-middle w-auto h-[0.85em] mx-1"
            />
          </W>{" "}
          <W className="italic font-light font-mondwest">end-to-end.</W>
        </h2>

        {/* Sub-copy — single animated block */}
        <p
          className="equip-sub text-white/55 leading-[1.7] mb-8 sm:mb-10 max-w-[90vw] sm:max-w-[560px] md:max-w-[640px]"
          style={{ fontSize: "clamp(13px, 1.1vw, 17px)" }}
        >
          I build complete systems — React &amp; Next.js frontends, scalable
          Node.js &amp; FastAPI backends, PostgreSQL &amp; MongoDB databases,
          Dockerised deployments, Kubernetes orchestration, and AWS
          infrastructure. One engineer. Full ownership. Zero hand-offs.
        </p>

        {/* CTAs */}
        <div className="equip-cta-group flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <a
            href="#projects"
            className="equip-cta text-[13px] sm:text-[14px] font-semibold bg-white text-[#0c0c0c] hover:bg-gray-100 transition-colors rounded-lg px-5 sm:px-[22px] py-[10px] sm:py-[11px]"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="equip-cta text-[13px] sm:text-[14px] font-semibold text-white bg-white/[0.08] border border-white/[0.18] hover:bg-white/[0.14] transition-colors rounded-lg px-5 sm:px-[22px] py-[10px] sm:py-[11px]"
          >
            Get in touch
          </a>
        </div>

      </div>
    </section>
  );
}
