// ─────────────────────────────────────────────
// TechStackVisual — Infinite marquee tech stack
// Keyframes live in globals.css (marquee-left / marquee-right).
// No useEffect delay — animation starts on first paint.
// ─────────────────────────────────────────────

interface Icon { src: string; label: string }

const ALL_ICONS: Icon[] = [
  // Frontend
  { src: "/icons/NextJS-Dark.svg",       label: "Next.js"     },
  { src: "/icons/React-Dark.svg",        label: "React"       },
  { src: "/icons/TailwindCSS-Dark.svg",  label: "Tailwind"    },
  { src: "/icons/Redux.svg",             label: "Redux"       },
  { src: "/icons/ThreeJS-Dark.svg",      label: "Three.js"    },
  { src: "/icons/MaterialUI-Dark.svg",   label: "Material UI" },
  { src: "/icons/Bootstrap.svg",         label: "Bootstrap"   },
  { src: "/icons/Sass.svg",              label: "Sass"        },
  { src: "/icons/HTML.svg",              label: "HTML"        },
  { src: "/icons/CSS.svg",               label: "CSS"         },
  { src: "/icons/Htmx-Dark.svg",         label: "HTMX"        },
  { src: "/icons/Pug-Dark.svg",          label: "Pug"         },
  { src: "/icons/Gulp.svg",              label: "Gulp"        },
  { src: "/icons/JQuery.svg",            label: "jQuery"      },
  // More Frontend
  { src: "/icons/Electron.svg",          label: "Electron"    },
  { src: "/icons/SVG-Dark.svg",          label: "SVG"         },
  { src: "/icons/Babel.svg",             label: "Babel"       },
  { src: "/icons/Vite-Dark.svg",         label: "Vite"        },
  { src: "/icons/Figma-Dark.svg",        label: "Figma"       },
  { src: "/icons/Webpack-Dark.svg",      label: "Webpack"     },
  { src: "/icons/Webflow.svg",           label: "Webflow"     },
  // Backend
  { src: "/icons/NodeJS-Dark.svg",       label: "Node.js"     },
  { src: "/icons/ExpressJS-Dark.svg",    label: "Express"     },
  { src: "/icons/FastAPI.svg",           label: "FastAPI"     },
  { src: "/icons/DENO-Dark.svg",         label: "Deno"        },
  { src: "/icons/Bun-Dark.svg",          label: "Bun"         },
  { src: "/icons/RabbitMQ-Dark.svg",     label: "RabbitMQ"    },
  { src: "/icons/Kafka.svg",             label: "Kafka"       },
  { src: "/icons/Jest.svg",              label: "Jest"        },
  { src: "/icons/Yarn-Dark.svg",         label: "Yarn"        },
  { src: "/icons/Pnpm-Dark.svg",         label: "pnpm"        },
  { src: "/icons/Npm-Dark.svg",          label: "npm"         },
  { src: "/icons/Postman.svg",           label: "Postman"     },
  // Databases
  { src: "/icons/MongoDB.svg",           label: "MongoDB"     },
  { src: "/icons/MySQL-Dark.svg",        label: "MySQL"       },
  { src: "/icons/Prisma.svg",            label: "Prisma"      },
  { src: "/icons/PostgreSQL-Dark.svg",   label: "Postgres"    },
  { src: "/icons/Redis-Dark.svg",        label: "Redis"       },
  { src: "/icons/Firebase-Dark.svg",     label: "Firebase"    },
  { src: "/icons/Appwrite.svg",          label: "Appwrite"    },
  { src: "/icons/Supabase-Dark.svg",     label: "Supabase"    },
  // DevOps & Cloud
  { src: "/icons/Docker.svg",            label: "Docker"      },
  { src: "/icons/AWS-Dark.svg",          label: "AWS"         },
  { src: "/icons/Azure-Dark.svg",        label: "Azure"       },
  { src: "/icons/GCP-Dark.svg",          label: "GCP"         },
  { src: "/icons/Kubernetes.svg",        label: "Kubernetes"  },
  { src: "/icons/Jenkins-Dark.svg",      label: "Jenkins"     },
  { src: "/icons/Nginx.svg",             label: "Nginx"       },
  { src: "/icons/Netlify-Dark.svg",      label: "Netlify"     },
  { src: "/icons/Heroku.svg",            label: "Heroku"      },
  { src: "/icons/Cloudflare-Dark.svg",   label: "Cloudflare"  },
  { src: "/icons/GithubActions-Dark.svg",label: "GH Actions"  },
  { src: "/icons/Bash-Dark.svg",         label: "Bash"        },
  { src: "/icons/Git.svg",               label: "Git"         },
  { src: "/icons/GitLab-Dark.svg",       label: "GitLab"      },
  { src: "/icons/Linux-Dark.svg",        label: "Linux"       },
  { src: "/icons/Ubuntu-Dark.svg",       label: "Ubuntu"      },
];

// 4 rows with alternating directions and staggered speeds
const ROWS: { icons: Icon[]; dir: "left" | "right"; dur: number }[] = [
  { icons: ALL_ICONS.slice(0, 14),  dir: "left",  dur: 40 },
  { icons: ALL_ICONS.slice(14, 28), dir: "right", dur: 32 },
  { icons: ALL_ICONS.slice(28, 42), dir: "left",  dur: 44 },
  { icons: ALL_ICONS.slice(42),     dir: "right", dur: 36 },
];

function IconPill({ src, label }: Icon) {
  return (
    <div
      title={label}
      className="shrink-0 w-[60px] h-[60px] rounded-[13px] flex items-center justify-center p-[11px] border border-white/[0.09] bg-white/[0.04] transition-all duration-200 hover:bg-white/[0.1] hover:border-white/[0.22] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] cursor-default select-none"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} className="w-full h-full object-contain" draggable={false} />
    </div>
  );
}

function MarqueeRow({ icons, dir, dur }: { icons: Icon[]; dir: "left" | "right"; dur: number }) {
  // Duplicate for seamless infinite loop
  const doubled = [...icons, ...icons];

  return (
    // .marquee-row — CSS handles pause-on-hover via globals.css
    <div className="marquee-row overflow-hidden w-full">
      <div
        // .marquee-left / .marquee-right — animation defined in globals.css
        // inline animation-duration overrides the row-specific speed
        className={`flex gap-3 w-max ${dir === "left" ? "marquee-left" : "marquee-right"}`}
        style={{ animationDuration: `${dur}s` }}
      >
        {doubled.map((icon, i) => (
          <IconPill key={`${icon.label}-${i}`} {...icon} />
        ))}
      </div>
    </div>
  );
}

export default function TechStackVisual() {
  return (
    <div className="relative w-full h-full overflow-hidden dashed-grid flex flex-col justify-center gap-3 py-8">

      {/* Left fade */}
      <div
        className="absolute inset-y-0 left-0 w-20 pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to right, #0c0c0c 40%, transparent)" }}
      />
      {/* Right fade */}
      <div
        className="absolute inset-y-0 right-0 w-20 pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to left, #0c0c0c 40%, transparent)" }}
      />
      {/* Top fade */}
      <div
        className="absolute top-0 inset-x-0 h-16 pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to bottom, #0c0c0c, transparent)" }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-16 pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to top, #0c0c0c, transparent)" }}
      />

      {ROWS.map((row, i) => (
        <MarqueeRow key={i} {...row} />
      ))}
    </div>
  );
}
