"use client";
// ─────────────────────────────────────────────────────────────────────────────
// ContactFooter — Contact CTA + Footer bar
//
//  • Label "05"    : blur fade-in
//  • Heading       : word-by-word blur + y (same signature as all sections)
//  • Sub-copy      : single-block blur + y
//  • CTA buttons   : stagger y:24 → 0 + opacity
//  • Social pills  : stagger y:16 → 0 + opacity
//  • Footer bar    : opacity fade-in
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiDownload, FiPhone } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Word-wrapper ──────────────────────────────────────────────────────────────
function W({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`sw inline-block ${className}`}>{children}</span>;
}

// ─── Contact details ──────────────────────────────────────────────────────────
const CONTACT = {
  email:    "absharameen625@gmail.com",
  phone:    "+91 8590026442",
  github:   "https://github.com/Abshar777",
  linkedin: "linkedin.com/in/mhd-abshar-04126a284/",
  resume:   "/abshar-resume.pdf",
};

// ─── Social pill ──────────────────────────────────────────────────────────────
function SocialPill({
  href, icon, label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="contact-pill flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-2.5 text-white/50 text-[13px] font-medium hover:border-white/[0.2] hover:bg-white/[0.07] hover:text-white/80 transition-all duration-200"
    >
      <span className="text-[16px]">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ContactFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Counter label "05" ─────────────────────────────────────────────
      gsap.fromTo(
        ".contact-label",
        { opacity: 0, y: 10, filter: "blur(6px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-label", start: "top 86%" },
          onComplete() { gsap.set(".contact-label", { filter: "none" }); },
        },
      );

      // ── Heading word-by-word blur ──────────────────────────────────────
      gsap.set(".contact-heading .sw", { willChange: "filter, transform, opacity" });

      gsap.fromTo(
        ".contact-heading .sw",
        { opacity: 0, filter: "blur(14px)", y: 22 },
        {
          opacity: 1, filter: "blur(0px)", y: 0,
          duration: 0.88, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-heading", start: "top 82%" },
          onComplete() {
            gsap.set(".contact-heading .sw", { willChange: "auto", filter: "none" });
          },
        },
      );

      // ── Sub-copy ───────────────────────────────────────────────────────
      gsap.fromTo(
        ".contact-sub",
        { opacity: 0, filter: "blur(10px)", y: 18 },
        {
          opacity: 1, filter: "blur(0px)", y: 0,
          duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-sub", start: "top 86%" },
          onComplete() { gsap.set(".contact-sub", { filter: "none" }); },
        },
      );

      // ── CTA buttons ────────────────────────────────────────────────────
      gsap.fromTo(
        ".contact-ctas",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: ".contact-ctas", start: "top 88%" },
        },
      );

      // ── Social pills stagger ───────────────────────────────────────────
      gsap.fromTo(
        ".contact-pill",
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0,
          duration: 0.6, stagger: 0.09, ease: "expo.out",
          scrollTrigger: { trigger: ".contact-pills", start: "top 90%" },
        },
      );

      // ── Footer bar ─────────────────────────────────────────────────────
      gsap.fromTo(
        ".contact-footer-bar",
        { opacity: 0 },
        {
          opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".contact-footer-bar", start: "top 98%" },
        },
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden hero-grid">

      {/* Left vignette */}
      <div className="absolute top-0 left-0 h-full pointer-events-none z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/left-grid-1.png" alt="" className="h-full max-md:max-h-[50vh] w-auto block" />
      </div>
      {/* Right vignette */}
      <div className="absolute top-0 right-0 h-full pointer-events-none z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/right-grid-1.png" alt="" className="h-full max-md:max-h-[50vh] w-auto block" />
      </div>
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none z-[1]"
        style={{ background: "radial-gradient(ellipse at top, rgba(27,72,232,0.12) 0%, transparent 70%)" }}
      />

      <div className="relative z-[2] px-5 sm:px-8 md:px-[clamp(32px,8.5vw,130px)] pt-20 sm:pt-28 md:pt-32 pb-0">

        {/* ── CTA Block ── */}
        <div className="max-w-[760px] mx-auto text-center">

          {/* Counter */}
          <p className="contact-label font-mondwest text-[#1B48E8] text-[13px] tracking-[0.1em] mb-4">
            05
          </p>

          {/* Heading */}
          <h2
            className="contact-heading font-inter font-bold text-white leading-[1.0] tracking-[-0.03em] mb-6"
            style={{ fontSize: "clamp(2.4rem, 7vw, 5rem)" }}
          >
            <W>Have</W>{" "}
            <W>a</W>{" "}
            <W>project</W>
            <br />
            <W className="font-mondwest font-normal italic text-white/70">in</W>{" "}
            <W className="font-mondwest font-normal italic text-white/70">mind?</W>
          </h2>

          {/* Sub-copy */}
          <p className="contact-sub text-white/40 text-[14px] sm:text-[15px] leading-[1.7] max-w-[420px] mx-auto mb-10 sm:mb-12">
            Available for freelance projects and full-time opportunities.
            I respond within 24 hours.
          </p>

          {/* CTAs row */}
          <div className="contact-ctas flex flex-wrap items-center justify-center gap-3 mb-8 sm:mb-10">
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2.5 bg-white text-[#0c0c0c] font-semibold text-[13px] sm:text-[14px] rounded-xl px-6 py-[13px] hover:bg-gray-100 transition-colors duration-200 group"
            >
              <FiMail className="text-[16px]" />
              {CONTACT.email}
              <FiArrowUpRight className="text-[14px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href={CONTACT.resume}
              download="Muhammed-Abshar-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.04] px-5 py-[13px] text-white/70 text-[13px] sm:text-[14px] font-semibold hover:border-white/[0.25] hover:bg-white/[0.08] hover:text-white transition-all duration-200"
            >
              <FiDownload className="text-[15px]" />
              Resume
            </a>
          </div>

          {/* Social pills */}
          <div className="contact-pills flex flex-wrap items-center justify-center gap-3 mb-16 sm:mb-20">
            <SocialPill href={CONTACT.github}         icon={<FiGithub />}   label="GitHub"         />
            <SocialPill href={CONTACT.linkedin}       icon={<FiLinkedin />} label="LinkedIn"       />
            <SocialPill href={`tel:${CONTACT.phone}`} icon={<FiPhone />}    label={CONTACT.phone}  />
          </div>
        </div>

        {/* ── Footer bar ── */}
        <div className="contact-footer-bar border-t border-white/[0.06] py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mondwest text-[12px] tracking-[0.06em] text-white/30">
            Muhammed Abshar P
            <span className="text-white/15 mx-2">·</span>
            <span className="font-inter text-[11px]">Full Stack & DevOps Engineer</span>
          </p>
          <p className="font-inter text-[11px] text-white/20 tracking-[0.04em]">
            © {new Date().getFullYear()} · Built with Next.js & Tailwind CSS
          </p>
        </div>

      </div>
    </footer>
  );
}
