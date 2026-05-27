import Image from "next/image";

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

function PixelUpArrow() {
  return (
    <svg width="20" height="26" viewBox="0 0 24 30" fill="none" aria-hidden="true" className="mb-1.5 shrink-0">
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

function StatCard({ num, label, desc }: Stat) {
  return (
    <div className="flex flex-col min-w-0">
      <div className="flex items-end gap-2 mb-2.5">
        <PixelUpArrow />
        <span
          className="font-mondwest text-white leading-none"
          style={{ fontSize: "clamp(40px, 6.2vw, 90px)" }}
        >
          {num}
        </span>
      </div>
      <p className="text-white font-semibold text-[14px] sm:text-[16px] mb-1.5">{label}</p>
      <p className="text-white/50 text-[13px] sm:text-[14px] leading-relaxed max-w-[260px]">{desc}</p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden hero-grid">
      {/* Right vignette */}
      <div className="absolute top-0 right-0 h-full pointer-events-none z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/right-grid-1.png" alt="" className="h-full w-auto block" />
      </div>

      <div className="relative z-[2] px-5 sm:px-8 md:pl-[clamp(32px,8.5vw,130px)] md:pr-[clamp(32px,5vw,80px)] pt-10 sm:pt-14 md:pt-16 pb-14 sm:pb-20 md:pb-24">

        {/* Heading */}
        <h2
          className="font-inter font-bold text-white leading-[1.1] tracking-[-0.025em] mb-12 sm:mb-16 md:mb-20"
          style={{ fontSize: "clamp(1.6rem, 4.5vw, 3rem)" }}
        >
          <span>Engineering modern&nbsp;</span>
          <Image
            src="/icon-folder.png"
            alt=""
            width={500}
            height={500}
            className="inline-block align-middle w-auto h-[1.4em] mx-1"
          />
          <span className="italic font-light font-mondwest"> platforms</span>
          <br />
          <span>with scalable systems,</span>
          <span> intuitive <br /> interfaces &amp;</span>
          <Image
            src="/icon-star.png"
            alt=""
            width={60}
            height={64}
            className="inline-block align-middle w-auto h-[1.4em] mx-1"
          />
          &nbsp;
          <span className="italic font-light font-mondwest">&nbsp;real-world&nbsp;</span>
          <span>performance.</span>
        </h2>

        {/* Stats row — wraps to 1 col on mobile, 3 cols on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 md:gap-x-7 ">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
