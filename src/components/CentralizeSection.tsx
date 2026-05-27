import TechStackVisual from "@/components/TechStackVisual";
import Image from "next/image";

// ─────────────────────────────────────────────
// Skill category cards
// ─────────────────────────────────────────────

interface SkillCard {
  category: string;
  color: string;
  tech: string[];
}

const SKILLS: SkillCard[] = [
  {
    category: "Frontend",
    color: "#1B48E8",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
  },
  {
    category: "Backend",
    color: "#7c3aed",
    tech: ["Node.js", "Bun.js", "Express", "FastAPI", "Microservices"],
  },
  {
    category: "DevOps & Cloud",
    color: "#0891b2",
    tech: ["Docker", "Kubernetes", "AWS EC2", "NGINX", "CI/CD"],
  },
  {
    category: "Databases",
    color: "#059669",
    tech: ["MongoDB", "PostgreSQL", "Redis", "Firebase", "Prisma ORM"],
  },
];

function SkillBox({ card }: { card: SkillCard }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-200">
      {/* Category label */}
      <p
        className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2.5"
        style={{ color: card.color }}
      >
        {card.category}
      </p>
      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5">
        {card.tech.map((t) => (
          <span
            key={t}
            className="text-[11px] text-white/50 bg-white/[0.04] border border-white/[0.07] rounded-md px-2 py-[3px]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CentralizeSection
// ─────────────────────────────────────────────

export default function CentralizeSection() {
  return (
    <section className="relative overflow-hidden bg-[#0c0c0c] flex flex-col md:flex-row md:min-h-[700px]">

      {/* ── Left column — About & Tech ── */}
      <div className="w-full md:w-[46%] shrink-0 flex flex-col items-center md:items-start justify-center text-center md:text-left px-5 sm:px-8 md:pl-[clamp(32px,8.5vw,130px)] md:pr-10 py-12 sm:py-16 md:py-20 z-[2] relative">

        {/* Counter */}
        <p className="font-mondwest text-[#1B48E8] text-[13px] tracking-[0.1em] mb-3">
          02
        </p>

        {/* Heading */}
        <h2
          className="font-inter font-bold text-white leading-[1.05] tracking-[-0.025em] mb-4"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.8rem)" }}
        >
          Built on solid{" "}
          <span className="font-mondwest font-normal italic text-white/70">
          <br />
          
            foundations
            <Image
                        src="/dt-4-design.png"
                        alt=""
                        width={500}
                        height={500}
                        className="inline-block align-middle w-auto h-[1em] mx-1"
                      />
          </span>
        </h2>

        {/* Profile summary */}
        <p className="text-white/50 text-[13px] sm:text-[14px] leading-[1.75] mb-8 max-w-[90vw] sm:max-w-[400px]">
          Senior Full Stack &amp; DevOps Engineer — 3+ years hands-on, 1+ year
          professional. Delivered 20+ production systems across MERN stack, python FastAPI, Mobile APPs
          microservices, cloud infrastructure, and Web3 integrations.
        </p>

        {/* Skill grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-[90vw] sm:max-w-[420px] mb-8">
          {SKILLS.map((card) => (
            <SkillBox key={card.category} card={card} />
          ))}
        </div> */}

        {/* CTA */}
        <a
          href="#projects"
          className="text-white/70 font-semibold text-[13px] sm:text-[14px] hover:text-white transition-colors"
        >
          View all projects →
        </a>
      </div>

      {/* ── Right column: infinite tech-stack marquee ── */}
      <div className="flex-1 relative overflow-hidden min-h-[280px] sm:min-h-[360px] md:min-h-0">
        <TechStackVisual />
      </div>
    </section>
  );
}
