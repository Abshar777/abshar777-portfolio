"use client";
// ─────────────────────────────────────────────────────────────────────────────
// IntroAnimation — Awwwards-grade page-load sequence
//   Phase 1 (0–1.5s)  : Preloader — split-curtain panels + counter 000→100
//   Phase 2 (1.3–1.8s): Curtain splits open (top panel flies up, bottom down)
//   Phase 3 (1.5–2.7s): Layout cascade — announcement bar → nav → hero
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function IntroAnimation() {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBotRef = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);
  const barFillRef  = useRef<HTMLDivElement>(null);
  const loaderRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Set initial hidden states immediately ─────────────────────────── */
      gsap.set("#gsap-announcement",  { y: -32, opacity: 0 });
      gsap.set("#gsap-nav",           { y: -48, opacity: 0 });
      gsap.set("#gsap-hero-badge",    { y: 28,  opacity: 0 });
      gsap.set(".gsap-hero-line",     { y: 72,  opacity: 0 });
      gsap.set("#gsap-hero-sub",      { y: 28,  opacity: 0 });
      gsap.set("#gsap-hero-cta-1",    { y: 22,  opacity: 0 });
      gsap.set("#gsap-hero-cta-2",    { y: 22,  opacity: 0 });

      /* ── Master timeline ───────────────────────────────────────────────── */
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      /* Phase 1 — counter 000 → 100 + progress bar */
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate() {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.round(counter.val)).padStart(3, "0");
          }
        },
      }, 0);

      tl.to(barFillRef.current, {
        scaleX: 1,
        duration: 1.4,
        ease: "power2.inOut",
        transformOrigin: "left center",
      }, 0);

      /* Fade loader content just before curtain pulls back */
      tl.to(loaderRef.current, {
        opacity: 0,
        duration: 0.28,
        ease: "power2.in",
      }, 1.18);

      /* Phase 2 — curtain split (top flies up, bottom flies down) */
      tl.to(panelTopRef.current, {
        yPercent: -102,
        duration: 1.05,
        ease: "power4.inOut",
      }, 1.28);

      tl.to(panelBotRef.current, {
        yPercent: 102,
        duration: 1.05,
        ease: "power4.inOut",
      }, 1.35); /* slight stagger = premium split feel */

      /* Remove overlay from DOM flow when done */
      tl.set(overlayRef.current, { display: "none" }, 2.4);

      /* Phase 3 — layout cascade */

      /* Announcement bar */
      tl.to("#gsap-announcement", {
        y: 0, opacity: 1,
        duration: 0.72,
      }, 1.52);

      /* Nav */
      tl.to("#gsap-nav", {
        y: 0, opacity: 1,
        duration: 0.72,
      }, 1.64);

      /* Hero rating badge */
      tl.to("#gsap-hero-badge", {
        y: 0, opacity: 1,
        duration: 0.65,
        ease: "power3.out",
      }, 1.82);

      /* Hero headline — lines stagger up */
      tl.to(".gsap-hero-line", {
        y: 0, opacity: 1,
        duration: 1.05,
        stagger: 0.13,
        ease: "expo.out",
      }, 1.94);

      /* Sub-copy */
      tl.to("#gsap-hero-sub", {
        y: 0, opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }, 2.28);

      /* CTA buttons (staggered) */
      tl.to(["#gsap-hero-cta-1", "#gsap-hero-cta-2"], {
        y: 0, opacity: 1,
        duration: 0.68,
        stagger: 0.1,
        ease: "power3.out",
      }, 2.42);
    });

    return () => ctx.revert();
  }, []);

  return (
    /* Full-screen overlay — same bg as page so no colour flash */
    <div ref={overlayRef} className="fixed inset-0 z-[9999] overflow-hidden">

      {/* ── Top curtain panel ── */}
      <div
        ref={panelTopRef}
        className="absolute inset-x-0 top-0 bg-[#0c0c0c]"
        style={{ height: "51vh" }}
      />

      {/* ── Bottom curtain panel ── */}
      <div
        ref={panelBotRef}
        className="absolute inset-x-0 bottom-0 bg-[#0c0c0c]"
        style={{ height: "51vh" }}
      />

      {/* ── Loader content — counter + bar (sits above panels via z-10) ── */}
      <div
        ref={loaderRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none"
      >
        {/* Counter */}
        <span
          ref={counterRef}
          className="font-mondwest text-white tabular-nums"
          style={{
            fontSize: "clamp(4.5rem, 13vw, 10.5rem)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            opacity: 0.13,
          }}
        >
          000
        </span>

        {/* Progress bar */}
        <div
          className="mt-5 overflow-hidden rounded-full"
          style={{ width: "clamp(80px, 10vw, 110px)", height: "1px", background: "rgba(255,255,255,0.1)" }}
        >
          <div
            ref={barFillRef}
            className="h-full rounded-full bg-white/40"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          />
        </div>

        {/* Label */}
        <p
          className="mt-4 font-inter font-medium tracking-[0.22em] uppercase text-white/18"
          style={{ fontSize: "9px" }}
        >
          Loading
        </p>
      </div>
    </div>
  );
}
