import Image from "next/image";

// ─────────────────────────────────────────────
// Rating badge
// ─────────────────────────────────────────────
interface RatingProps { score: string; label: string }

function Rating({ score, label }: RatingProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <span className="text-[13px] sm:text-[15px] tracking-[1px]">
        ★★★★<span className="opacity-40">★</span>
      </span>
      <span className="text-white text-[12px] sm:text-[13px] font-medium">{score}</span>
      <span className="text-white/40 text-[10px] sm:text-[11px] font-bold tracking-[0.18em]">{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────
export default function Hero() {
  return (
    <main className="relative items-center justify-center flex-1 md:min-h-[100svh] min-h-[100vh] flex flex-col items-center overflow-hidden hero-grid">

      {/* Top glow */}
      <div className="absolute md:top-[-7%] top-[0] left-0 right-0 pointer-events-none z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-bg-top.png" alt="" className="w-full h-auto block" />
      </div>

      {/* Bottom glow */}
      <div className="absolute md:bottom-[-13%] bottom-[20%] left-0 right-0 pointer-events-none z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-bg-bottom.png" alt="" className="w-full h-auto block" />
      </div>

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center justify-center text-center w-full px-5 sm:px-8 pb-20 sm:pb-16">

        {/* Social proof badge */}
        <div id="gsap-hero-badge" className="flex md:flex-row flex-col items-center gap-4 sm:gap-7 mb-3 sm:mb-2">
          <Rating score="3,054" label="CONTRIBUTIONS LAST YEAR" />
        </div>

        {/* Headline */}
        <h1
          className="font-inter md:text-[7rem] text-[3.5rem] capitalize font-bold text-white leading-[0.95] tracking-[-0.025em] mb-5 sm:mb-7 max-w-[1100px] w-full"
        >
          {/* Line 1 */}
          <span className="gsap-hero-line block">
            Code with logic
          </span>

          {/* Line 2 — icon inline */}
          <span
            className="gsap-hero-line flex items-center justify-center"
            style={{ gap: "clamp(6px, 1.3vw, 20px)" }}
          >
            <span>not</span>
            <Image
              src="/hero-vibes-icon.png"
              alt=""
              width={160}
              height={160}
              priority
              className="object-contain shadow-[9px_-13px_20px_20px_rgba(0,0,0,0.78)] max-md:shadow-[9px_-13px_20px_20px_rgba(0,0,0,0.3)] shrink-0 w-auto"
              style={{ height: "clamp(4rem, 10vw, 10rem)" }}
            />
            <span className="font-mondwest font-normal">luck</span>
          </span>
        </h1>

        {/* Sub-copy */}
        <p
          id="gsap-hero-sub"
          className="text-[13px] sm:text-[14px] text-white/55 max-w-[440px] sm:max-w-[520px] leading-[1.65] mb-4 sm:mb-3"
        >
          Full Stack &amp; DevOps Engineer focused on building scalable web
          applications, cloud infrastructure, and modern digital experiences
          with clean architecture and production ready systems.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14 sm:mb-[72px]">
          <a
            id="gsap-hero-cta-1"
            href="#projects"
            className="text-[13px] sm:text-[14px] font-semibold bg-white text-[#0c0c0c] hover:bg-gray-100 transition-colors rounded-lg px-5 sm:px-[22px] py-[10px] sm:py-[11px]"
          >
            View my work
          </a>
          <a
            id="gsap-hero-cta-2"
            href="#contact"
            className="text-[13px] backdrop-blur-sm sm:text-[14px] font-semibold text-white bg-white/[0.08] border border-white/[0.18] hover:bg-white/[0.14] transition-colors rounded-lg px-5 sm:px-[22px] py-[10px] sm:py-[11px]"
          >
            Let&apos;s talk
          </a>
        </div>

      </div>
    </main>
  );
}
