"use client";
// ─────────────────────────────────────────────────────────────────────────────
// CentralizeSection — scroll-triggered reveal
//
//  • Counter label : blur fade-in
//  • Heading       : word-by-word blur + y (same signature as Stats/Equip)
//  • Body copy     : single-block blur + y
//  • CTA link      : fade + y
//  • Right column  : slide in from right (x:50 → 0)
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechStackVisual from "@/components/TechStackVisual";

gsap.registerPlugin(ScrollTrigger);

// ── Word-wrapper ──────────────────────────────────────────────────────────────
function W({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`sw inline-block ${className}`}>{children}</span>;
}

export default function CentralizeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Counter label ──────────────────────────────────────────────────
      gsap.fromTo(
        ".centralize-label",
        { opacity: 0, y: 10, filter: "blur(6px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".centralize-label", start: "top 86%" },
          onComplete() { gsap.set(".centralize-label", { filter: "none" }); },
        },
      );

      // ── Heading word-by-word blur ──────────────────────────────────────
      gsap.set(".centralize-heading .sw", {
        willChange: "filter, transform, opacity",
      });

      gsap.fromTo(
        ".centralize-heading .sw",
        { opacity: 0, filter: "blur(14px)", y: 22 },
        {
          opacity: 1, filter: "blur(0px)", y: 0,
          duration: 0.88, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: ".centralize-heading", start: "top 82%" },
          onComplete() {
            gsap.set(".centralize-heading .sw", { willChange: "auto", filter: "none" });
          },
        },
      );

      // ── Body copy ──────────────────────────────────────────────────────
      gsap.fromTo(
        ".centralize-body",
        { opacity: 0, filter: "blur(10px)", y: 18 },
        {
          opacity: 1, filter: "blur(0px)", y: 0,
          duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".centralize-body", start: "top 86%" },
          onComplete() { gsap.set(".centralize-body", { filter: "none" }); },
        },
      );

      // ── CTA link ───────────────────────────────────────────────────────
      gsap.fromTo(
        ".centralize-cta",
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "expo.out",
          scrollTrigger: { trigger: ".centralize-cta", start: "top 90%" },
        },
      );

      // ── Right column slides in from right ─────────────────────────────
      gsap.fromTo(
        ".centralize-visual",
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: ".centralize-visual", start: "top 84%" },
        },
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0c0c0c] flex flex-col md:flex-row md:min-h-[700px]"
    >
      {/* ── Left column — About & Tech ── */}
      <div className="w-full md:w-[46%] shrink-0 flex flex-col items-center md:items-start justify-center text-center md:text-left px-5 sm:px-8 md:pl-[clamp(32px,8.5vw,130px)] md:pr-10 py-12 sm:py-16 md:py-20 z-[2] relative">

        {/* Counter */}
        <p className="centralize-label font-mondwest text-[#1B48E8] text-[13px] tracking-[0.1em] mb-3">
          02
        </p>

        {/* Heading */}
        <h2
          className="centralize-heading font-inter font-bold text-white leading-[1.05] tracking-[-0.025em] mb-4"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.8rem)" }}
        >
          <W>Built</W>{" "}
          <W>on</W>{" "}
          <W>solid</W>{" "}
          <W className="font-mondwest font-normal italic text-white/70">
         
            foundations
            <Image
              src="/dt-4-design.png"
              alt=""
              width={500}
              height={500}
              className="inline-block align-middle w-auto h-[1em] mx-1"
            />
          </W>
        </h2>

        {/* Profile summary */}
        <p className="centralize-body text-white/50 text-[13px] sm:text-[14px] leading-[1.75] mb-8 max-w-[90vw] sm:max-w-[400px]">
          Senior Full Stack &amp; DevOps Engineer — 3+ years hands-on, 1+ year
          professional. Delivered 20+ production systems across MERN stack, python FastAPI, Mobile APPs
          microservices, cloud infrastructure, and Web3 integrations.
        </p>

        {/* CTA */}
        <a
          href="#projects"
          className="centralize-cta text-white/70 font-semibold text-[13px] sm:text-[14px] hover:text-white transition-colors"
        >
          View all projects →
        </a>
      </div>

      {/* ── Right column: tech-stack visual slides in ── */}
      <div className="centralize-visual flex-1 relative overflow-hidden min-h-[280px] sm:min-h-[360px] md:min-h-0">
        <TechStackVisual />
      </div>
    </section>
  );
}
