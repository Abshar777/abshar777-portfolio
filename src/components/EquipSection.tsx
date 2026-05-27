import Image from "next/image";

// ─────────────────────────────────────────────
// EquipSection — "What I build" value prop
// Centered heading with inline 3D icons
// ─────────────────────────────────────────────

const HIGHLIGHTS = [
  { icon: "⚡", label: "Fast Delivery" },
  { icon: "🔒", label: "Production-Grade" },
  { icon: "☁️", label: "Cloud-Native" },
  { icon: "🔁", label: "End-to-End" },
];

export default function EquipSection() {
  return (
    <section className="relative overflow-hidden hero-grid">
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

        {/* Heading */}
        <h2
          className="font-inter font-semibold text-white leading-[1.1] tracking-[-0.025em] mb-6 sm:mb-8 max-w-[900px] w-full"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.4rem)" }}
        >
          <span>From </span>
          <Image
            src="/icon-enter-key.png"
            alt=""
            width={120}
            height={120}
            className="inline-block align-middle w-auto h-[0.9em] mx-1"
          />
          <span> frontend to</span>
          <br />
          <span>cloud </span>
          <Image
            src="/icon-lightning.png"
            alt=""
            width={120}
            height={120}
            className="inline-block align-middle w-auto h-[0.85em] mx-1"
          />
          <span className="italic font-light font-mondwest"> end-to-end.</span>
        </h2>

        {/* Sub-copy */}
        <p
          className="text-white/55 leading-[1.7] mb-8 sm:mb-10 max-w-[90vw] sm:max-w-[560px] md:max-w-[640px]"
          style={{ fontSize: "clamp(13px, 1.1vw, 17px)" }}
        >
          I build complete systems — React &amp; Next.js frontends, scalable
          Node.js &amp; FastAPI backends, PostgreSQL &amp; MongoDB databases,
          Dockerised deployments, Kubernetes orchestration, and AWS
          infrastructure. One engineer. Full ownership. Zero hand-offs.
        </p>

        {/* Highlight pills */}
       
        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <a
            href="#projects"
            className="text-[13px] sm:text-[14px] font-semibold bg-white text-[#0c0c0c] hover:bg-gray-100 transition-colors rounded-lg px-5 sm:px-[22px] py-[10px] sm:py-[11px]"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="text-[13px] sm:text-[14px] font-semibold text-white bg-white/[0.08] border border-white/[0.18] hover:bg-white/[0.14] transition-colors rounded-lg px-5 sm:px-[22px] py-[10px] sm:py-[11px]"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
