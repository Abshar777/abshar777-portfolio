"use client";
// ─────────────────────────────────────────────
// ContactFooter — Contact CTA + Footer bar
// Scroll-triggered animations via IntersectionObserver
// ─────────────────────────────────────────────

import React, { useEffect, useRef, useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiDownload, FiPhone } from "react-icons/fi";

// ─── Contact details ───────────────────────────
const CONTACT = {
  email: "absharameen625@gmail.com",
  phone: "+91 8590026442",
  github: "https://github.com/mhdabshar",
  linkedin: "https://linkedin.com/in/muhammed-abshar", // update if different
  resume: "/abshar-resume.pdf",
};
// ──────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Social pill button ───────────────────────

function SocialPill({
  href,
  icon,
  label,
  delay,
  visible,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  delay: number;
  visible: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-2.5 text-white/50 text-[13px] font-medium hover:border-white/[0.2] hover:bg-white/[0.07] hover:text-white/80 transition-all duration-200"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out, border-color 0.2s, background 0.2s, color 0.2s",
        transitionDelay: `${delay}ms`,
      }}
    >
      <span className="text-[16px]">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

// ─── Main component ───────────────────────────

export default function ContactFooter() {
  const { ref, inView } = useInView(0.15);
  const { ref: footerRef, inView: footerInView } = useInView(0.5);

  const fade = (delay = 0, extra?: React.CSSProperties): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
    transitionDelay: `${delay}ms`,
    ...extra,
  });

  return (
    <footer className="relative overflow-hidden hero-grid ">
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
        style={{
          background: "radial-gradient(ellipse at top, rgba(27,72,232,0.12) 0%, transparent 70%)",
        }}
      />

      <div
        ref={ref}
        className="relative z-[2] px-5 sm:px-8 md:px-[clamp(32px,8.5vw,130px)] pt-20 sm:pt-28 md:pt-32 pb-0"
      >
        {/* ── CTA Block ── */}
        <div className="max-w-[760px] mx-auto text-center">

          {/* Counter */}
          <p
            className="font-mondwest text-[#1B48E8] text-[13px] tracking-[0.1em] mb-4"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-14px)",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            }}
          >
            05
          </p>

          {/* Heading */}
          <h2
            className="font-inter font-bold text-white leading-[1.0] tracking-[-0.03em] mb-6"
            style={{
              fontSize: "clamp(2.4rem, 7vw, 5rem)",
              ...fade(60),
            }}
          >
            Have a project<br />
            <span className="font-mondwest font-normal italic text-white/70">
              in mind?
            </span>
          </h2>

          {/* Sub-copy */}
          <p
            className="text-white/40 text-[14px] sm:text-[15px] leading-[1.7] max-w-[420px] mx-auto mb-10 sm:mb-12"
            style={fade(140)}
          >
            Available for freelance projects and full-time opportunities.
            I respond within 24 hours.
          </p>

          {/* CTAs row */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 mb-8 sm:mb-10"
            style={fade(220)}
          >
            {/* Primary — Email */}
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2.5 bg-white text-[#0c0c0c] font-semibold text-[13px] sm:text-[14px] rounded-xl px-6 py-[13px] hover:bg-gray-100 transition-colors duration-200 group"
            >
              <FiMail className="text-[16px]" />
              {CONTACT.email}
              <FiArrowUpRight className="text-[14px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Secondary — Download Resume */}
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
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16 sm:mb-20">
            <SocialPill href={CONTACT.github}   icon={<FiGithub />}   label="GitHub"   delay={300} visible={inView} />
            <SocialPill href={CONTACT.linkedin} icon={<FiLinkedin />} label="LinkedIn" delay={380} visible={inView} />
            <SocialPill href={`tel:${CONTACT.phone}`} icon={<FiPhone />} label={CONTACT.phone} delay={460} visible={inView} />
          </div>
        </div>

        {/* ── Footer bar ── */}
        <div
          ref={footerRef}
          className="border-t border-white/[0.06] backdrop-blur-sm py-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{
            opacity: footerInView ? 1 : 0,
            transition: "opacity 0.8s ease-out",
            transitionDelay: "100ms",
          }}
        >
          {/* Name + tagline */}
          <p className="font-mondwest text-[12px] tracking-[0.06em] text-white/30">
            Muhammed Abshar P
            <span className="text-white/15 mx-2">·</span>
            <span className="font-inter text-[11px]">Full Stack & DevOps Engineer</span>
          </p>

          {/* Copyright */}
          <p className="font-inter text-[11px] text-white/20 tracking-[0.04em]">
            © {new Date().getFullYear()} · Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
