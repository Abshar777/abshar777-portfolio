"use client";
// ─────────────────────────────────────────────
// ProjectsSection — bento-style immersive layout
// Featured card (CarltonFx) + 3 real project cards
// ─────────────────────────────────────────────

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Word-wrapper (inline-block so transform + filter work on inline text) ─────
function W({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`sw inline-block ${className}`}>{children}</span>;
}

// ─── Mock visuals ────────────────────────────

// ─── CarltonFx seed data ─────────────────────
const INIT_CANDLES = [
  { o: 38, h: 52, l: 34, c: 48, v: 40 }, { o: 48, h: 56, l: 44, c: 42, v: 55 },
  { o: 42, h: 50, l: 38, c: 53, v: 35 }, { o: 53, h: 60, l: 49, c: 57, v: 60 },
  { o: 57, h: 64, l: 53, c: 61, v: 45 }, { o: 61, h: 70, l: 58, c: 55, v: 70 },
  { o: 55, h: 62, l: 51, c: 66, v: 50 }, { o: 66, h: 72, l: 62, c: 70, v: 65 },
  { o: 70, h: 78, l: 66, c: 64, v: 80 }, { o: 64, h: 71, l: 60, c: 73, v: 55 },
  { o: 73, h: 80, l: 69, c: 76, v: 45 }, { o: 76, h: 84, l: 72, c: 81, v: 75 },
  { o: 81, h: 86, l: 76, c: 79, v: 60 }, { o: 79, h: 85, l: 75, c: 83, v: 85 },
];

/** CarltonFx — animated live trading terminal */
function TradingMock() {
  const [prices, setPrices] = useState([
    { pair: "XAU/USD", price: 2384.50, change:  1.24, up: true,  flash: false },
    { pair: "EUR/USD", price: 1.0842,  change: -0.12, up: false, flash: false },
    { pair: "BTC/USD", price: 67420,   change:  2.87, up: true,  flash: false },
  ]);
  const [candles, setCandles] = useState(INIT_CANDLES);
  const [scanX, setScanX]     = useState(0);
  const [pnl, setPnl]         = useState({ xau: 842, eur: -127 });

  /* smooth scan line ~25 fps */
  useEffect(() => {
    let x = 0;
    const id = setInterval(() => { x = (x + 2.2) % 284; setScanX(x); }, 40);
    return () => clearInterval(id);
  }, []);

  /* live tickers + last candle + P&L — every ~1.4 s */
  useEffect(() => {
    const id = setInterval(() => {
      const idx = Math.floor(Math.random() * 3);
      setPrices(prev => prev.map((p, i) => {
        if (i !== idx) return { ...p, flash: false };
        const step = i === 2 ? 120 : i === 0 ? 0.45 : 0.0005;
        const d = (Math.random() - 0.48) * step;
        return { ...p, price: p.price + d, change: p.change + (Math.random() - 0.5) * 0.04, up: d > 0, flash: true };
      }));
      setTimeout(() => setPrices(prev => prev.map(p => ({ ...p, flash: false }))), 380);

      setPnl(prev => ({
        xau: prev.xau + (Math.random() - 0.42) * 28,
        eur: prev.eur + (Math.random() - 0.56) * 12,
      }));

      setCandles(prev => {
        const cs = [...prev];
        const last = { ...cs[cs.length - 1] };
        const d = (Math.random() - 0.5) * 3;
        last.c = last.c + d;
        if (last.c > last.h) last.h = last.c;
        if (last.c < last.l) last.l = last.c;
        cs[cs.length - 1] = last;
        return cs;
      });
    }, 1400);
    return () => clearInterval(id);
  }, []);

  /* chart math */
  const CW = 280, CH = 90;
  const lo  = Math.min(...candles.map(c => c.l));
  const hi  = Math.max(...candles.map(c => c.h));
  const rng = hi - lo || 1;
  const sp  = CW / candles.length;
  const cw  = sp * 0.55;
  const ny  = (v: number) => CH - ((v - lo) / rng) * CH * 0.86 - CH * 0.05;
  const fmtP = (p: number, pair: string) =>
    pair === "BTC/USD" ? p.toFixed(0) : pair === "EUR/USD" ? p.toFixed(4) : p.toFixed(2);
  const priceY = ny(candles[candles.length - 1].c);

  return (
    <div className="w-full h-full bg-[#070707] rounded-xl border border-white/[0.07] overflow-hidden p-4 font-mono select-none flex flex-col gap-2.5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-white/25 text-[7.5px] tracking-[0.12em] uppercase">Carlton FX · Terminal</span>
        <span className="flex items-center gap-1.5 text-[7.5px] text-[#1B48E8] border border-[#1B48E8]/25 rounded-full px-2 py-[3px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1B48E8] animate-pulse" />
          MT5 LIVE
        </span>
      </div>

      {/* Live price ticker cards */}
      <div className="flex gap-1.5">
        {prices.map((t) => (
          <div key={t.pair} className="flex-1 bg-white/[0.025] rounded-lg px-2 py-1.5 border border-white/[0.05]">
            <p className="text-white/25 text-[6.5px] tracking-wider uppercase mb-0.5">{t.pair}</p>
            <div className="flex items-baseline gap-1">
              <span
                className="font-bold transition-colors duration-200 tabular-nums"
                style={{ fontSize: "10.5px", color: t.flash ? (t.up ? "#4ade80" : "#f87171") : "rgba(255,255,255,0.9)" }}
              >
                {fmtP(t.price, t.pair)}
              </span>
              <span className={`text-[7px] font-semibold tabular-nums ${t.up ? "text-green-400" : "text-red-400"}`}>
                {t.change >= 0 ? "+" : ""}{t.change.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Candlestick chart */}
      <div className="flex-1 bg-[#040404] rounded-lg border border-white/[0.04] overflow-hidden relative min-h-[80px]">
        <span className="absolute top-1.5 left-2 text-white/20 text-[6.5px] tracking-wider z-10 pointer-events-none">
          XAU/USD · M15
        </span>
        {/* Blue glow at base */}
        <div className="absolute bottom-0 inset-x-0 h-7 pointer-events-none z-[1]"
          style={{ background: "linear-gradient(to top, rgba(27,72,232,0.14), transparent)" }} />
        <svg width="100%" height="100%" viewBox={`0 0 ${CW} ${CH}`} preserveAspectRatio="none" className="absolute inset-0">
          {/* Grid */}
          {[20, 40, 60, 80].map(y => (
            <line key={y} x1="0" y1={y * CH / 100} x2={CW} y2={y * CH / 100}
              stroke="rgba(255,255,255,0.04)" strokeWidth="0.7" />
          ))}
          {/* Volume bars */}
          {candles.map((c, i) => {
            const x = i * sp + sp / 2;
            const vh = (c.v / 100) * 14;
            return (
              <rect key={`v${i}`} x={x - cw / 2} y={CH - vh} width={cw} height={vh}
                fill={c.c >= c.o ? "#22c55e" : "#ef4444"} fillOpacity="0.15" />
            );
          })}
          {/* Candle wicks + bodies */}
          {candles.map((c, i) => {
            const x     = i * sp + sp / 2;
            const green = c.c >= c.o;
            const col   = green ? "#22c55e" : "#ef4444";
            const bTop  = ny(Math.max(c.o, c.c));
            const bH    = Math.max(ny(Math.min(c.o, c.c)) - bTop, 1);
            return (
              <g key={i}>
                <line x1={x} y1={ny(c.h)} x2={x} y2={ny(c.l)} stroke={col} strokeWidth="0.8" opacity="0.65" />
                <rect x={x - cw / 2} y={bTop} width={cw} height={bH}
                  fill={col} fillOpacity={green ? 0.88 : 0.75} />
              </g>
            );
          })}
          {/* Dashed current-price line */}
          <line x1="0" y1={priceY} x2={CW} y2={priceY}
            stroke="#1B48E8" strokeWidth="0.9" strokeDasharray="3,4" opacity="0.85" />
          {/* Price dot on right edge */}
          <circle cx={CW - 3} cy={priceY} r="2.5" fill="#1B48E8" />
          {/* Animated scan line */}
          <line x1={scanX} y1="0" x2={scanX} y2={CH} stroke="rgba(27,72,232,0.22)" strokeWidth="1" />
        </svg>
      </div>

      {/* Order book + open positions */}
      <div className="flex gap-2.5 text-[7.5px]">
        <div className="flex-1">
          <p className="text-white/20 text-[6.5px] tracking-[0.15em] uppercase mb-1.5">Order Book</p>
          <div className="space-y-[3px]">
            {([
              { p: "2387.20", v: 1.24, ask: true  },
              { p: "2386.40", v: 0.87, ask: true  },
              { p: "2385.10", v: 2.33, ask: false },
              { p: "2384.80", v: 1.91, ask: false },
            ] as { p: string; v: number; ask: boolean }[]).map((row, i) => (
              <div key={i} className="relative flex items-center justify-between overflow-hidden rounded-[3px] px-0.5">
                <div className="absolute inset-y-0 left-0 rounded-[3px]"
                  style={{ width: `${(row.v / 3) * 76}%`, background: row.ask ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)" }} />
                <span className={`relative ${row.ask ? "text-red-400" : "text-green-400"}`}>{row.p}</span>
                <span className="relative text-white/25">{row.v.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 border-l border-white/[0.05] pl-2.5">
          <p className="text-white/20 text-[6.5px] tracking-[0.15em] uppercase mb-1.5">Positions</p>
          <div className="space-y-1.5">
            {([
              { sym: "XAU", side: "BUY",  val: pnl.xau },
              { sym: "EUR", side: "SELL", val: pnl.eur },
            ] as { sym: string; side: string; val: number }[]).map((pos) => (
              <div key={pos.sym} className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-white/35">{pos.sym}</span>
                  <span className="text-white/20 text-[6.5px]">{pos.side}</span>
                </div>
                <span className="font-bold tabular-nums transition-colors duration-300"
                  style={{ color: pos.val > 0 ? "#4ade80" : "#f87171" }}>
                  {pos.val > 0 ? "+" : "-"}${Math.abs(pos.val).toFixed(0)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-1.5 border-t border-white/[0.04] flex justify-between">
            <span className="text-white/20 text-[6.5px]">Equity</span>
            <span className="text-white/45 font-bold tabular-nums">$12,483</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Sales CRM — Kanban lead pipeline */
function CRMMock() {
  const cols = [
    {
      label: "New", color: "#1B48E8", leads: [
        { name: "Ali Hassan",  val: "$3.2K" },
        { name: "Omar Raza",   val: "$5.8K" },
      ],
    },
    {
      label: "Follow-Up", color: "#f59e0b", leads: [
        { name: "Sarah Kim",  val: "$5.5K" },
        { name: "Mike T.",    val: "$2.1K" },
      ],
    },
    {
      label: "Closed ✓", color: "#059669", leads: [
        { name: "John M.",    val: "$8.2K" },
        { name: "Corp Inc.",  val: "$22K"  },
      ],
    },
  ];
  return (
    <div className="w-full h-full rounded-xl bg-[#070707] border border-white/[0.07] overflow-hidden p-3 font-mono text-[9px] select-none">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-white/30">Delta Sales CRM · Pipeline</span>
        <span className="text-[#1B48E8] text-[8px] border border-[#1B48E8]/30 rounded-full px-2 py-px">● live</span>
      </div>
      <div className="flex gap-2 h-[calc(100%-28px)]">
        {cols.map((col) => (
          <div key={col.label} className="flex-1 flex flex-col gap-1.5">
            <p className="text-[8px] font-bold uppercase tracking-wider mb-0.5" style={{ color: col.color }}>
              {col.label}
            </p>
            {col.leads.map((l) => (
              <div key={l.name} className="bg-white/[0.04] border border-white/[0.06] rounded-md px-2 py-1.5">
                <div className="text-white/50 text-[9px] truncate">{l.name}</div>
                <div className="text-[8px] font-bold mt-0.5" style={{ color: col.color }}>{l.val}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Live Class Platform — dashboard with live stream + course progress */
function StreamMock() {
  const courses = [
    { title: "Advanced React Patterns", progress: 72, students: 48, live: true,  accent: "#7c3aed" },
    { title: "Docker & Kubernetes",      progress: 45, students: 31, live: false, accent: "#1B48E8" },
    { title: "AWS Cloud Architecture",   progress: 88, students: 52, live: false, accent: "#0891b2" },
  ];
  const wave = [3,7,5,9,4,8,6,10,5,7,3,8,6,9,4,7,5,8,6,4];
  return (
    <div className="w-full h-full rounded-xl bg-[#070707] border border-white/[0.07] overflow-hidden p-3 font-mono text-[9px] select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/30">Delta LMS · Dashboard</span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <span className="text-red-400 text-[8px] font-bold tracking-wider">1 LIVE</span>
        </div>
      </div>
      {/* Stream preview bar */}
      <div className="w-full h-[46px] rounded-lg bg-[#0a0a0a] border border-white/[0.06] mb-2.5 relative overflow-hidden flex items-center justify-center gap-[2px] px-2">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.14),rgba(27,72,232,0.08))" }} />
        {wave.map((h, i) => (
          <div key={i} className="rounded-full shrink-0 relative z-10" style={{ width: "2px", height: `${h * 2 + 2}px`, background: `rgba(124,58,237,${0.25 + h / 14})` }} />
        ))}
        <span className="absolute top-1.5 left-2.5 flex items-center gap-1 text-[7px] z-10">
          <span className="w-1 h-1 rounded-full bg-red-500" />
          <span className="text-red-400 font-bold">LIVE</span>
          <span className="text-white/30">· 156 viewers</span>
        </span>
        <span className="absolute bottom-1.5 right-2 text-white/20 text-[7px] z-10">Mux · WebRTC · OBS</span>
      </div>
      {/* Course progress list */}
      <div className="space-y-2">
        {courses.map((c) => (
          <div key={c.title}>
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-white/50 text-[8px] truncate max-w-[118px]">{c.title}</span>
                {c.live && <span className="text-red-400 text-[7px] shrink-0">● LIVE</span>}
              </div>
              <span className="text-white/25 text-[7.5px] shrink-0">{c.students} students</span>
            </div>
            <div className="h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${c.progress}%`, background: c.accent }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Miles AC — treasury + transactions */
function FinanceMock() {
  const accounts = [
    { type: "BTC", label: "●●0x4F2a",      bal: "$48,290",  color: "#f59e0b" },
    { type: "USD", label: "Chase ****4821", bal: "$895,000", color: "#059669" },
    { type: "EUR", label: "Stripe · active",bal: "$341,213", color: "#1B48E8" },
  ];
  const txns = [
    { op: "DEP", name: "John M.",  amount: "+$25,000",  cls: "text-green-400",  status: "approved" },
    { op: "WIT", name: "Sarah K.", amount: "-$8,500",   cls: "text-yellow-400", status: "pending"  },
    { op: "DEP", name: "Corp Inc", amount: "+$100,000", cls: "text-green-400",  status: "approved" },
  ];
  return (
    <div className="w-full h-full rounded-xl bg-[#070707] border border-white/[0.07] overflow-hidden p-3 font-mono text-[9px] select-none">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/30">Miles AC · Treasury</span>
        <span className="text-green-400 text-[8px] border border-green-400/25 rounded-full px-1.5 py-px">● active</span>
      </div>
      <div className="space-y-1.5 mb-2.5 border-b border-white/[0.05] pb-2.5">
        {accounts.map((a) => (
          <div key={a.type} className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] font-bold w-6" style={{ color: a.color }}>{a.type}</span>
              <span className="text-white/25">{a.label}</span>
            </div>
            <span className="text-white/55 font-bold">{a.bal}</span>
          </div>
        ))}
      </div>
      <p className="text-white/20 text-[8px] tracking-wider uppercase mb-1.5">Transactions</p>
      <div className="space-y-1">
        {txns.map((t, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-white/25 w-6">{t.op}</span>
              <span className="text-white/45">{t.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/55">{t.amount}</span>
              <span className={`${t.cls} text-[7px]`}>{t.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Landing page browser mockup */
function LandingMock({ accent, url, tagline }: { accent: string; url: string; tagline: string }) {
  return (
    <div className="w-full h-full rounded-xl bg-[#070707] border border-white/[0.07] overflow-hidden select-none font-mono">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0a0a0a] border-b border-white/[0.05]">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/40" />
        <span className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
        <div className="flex-1 mx-2 bg-white/[0.04] rounded px-2 py-px text-[7px] text-white/20 truncate">
          🔒 {url}
        </div>
      </div>
      {/* Page body */}
      <div className="flex flex-col h-[calc(100%-26px)]">
        {/* Navbar */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.04]">
          <div className="h-[5px] w-10 rounded-full" style={{ background: accent }} />
          <div className="hidden sm:flex gap-2">
            {[36, 28, 32].map((w, i) => (
              <div key={i} className="h-[4px] rounded-full bg-white/[0.12]" style={{ width: `${w}px` }} />
            ))}
          </div>
          <div className="h-[14px] w-10 rounded-md" style={{ background: `${accent}45` }} />
        </div>
        {/* Hero */}
        <div className="relative px-3 py-2 flex-1 flex flex-col justify-center overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 60% 40%, ${accent}18, transparent 70%)` }}
          />
          <div className="h-[6px] rounded-full mb-1.5 w-[68%]" style={{ background: `${accent}70` }} />
          <div className="h-[4px] rounded-full mb-1 w-[50%] bg-white/20" />
          <div className="h-[4px] rounded-full mb-3 w-[40%] bg-white/10" />
          <p className="text-[7px] text-white/25 tracking-[0.16em] uppercase">{tagline}</p>
        </div>
        {/* Feature cards */}
        <div className="flex gap-1.5 px-3 pb-2.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 rounded-md bg-white/[0.03] border border-white/[0.05] p-1.5">
              <div className="w-3 h-3 rounded mb-1" style={{ background: `${accent}28` }} />
              <div className="h-[3px] rounded-full bg-white/15 w-full mb-0.5" />
              <div className="h-[3px] rounded-full bg-white/10 w-[65%]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tech pill ────────────────────────────────

function TechPill({ src, label }: { src: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-2.5 py-[3px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} className="w-[13px] h-[13px] object-contain shrink-0" draggable={false} />
      <span className="text-[11px] text-white/45 font-medium whitespace-nowrap">{label}</span>
    </div>
  );
}

// ─── Project data ─────────────────────────────

interface Tech { src: string; label: string }

interface Project {
  num: string;
  tag: string;
  title: string;
  desc: string;
  techs: Tech[];
  accent: string;
  link?: string;
  Visual: () => React.JSX.Element;
}

const PROJECTS: Project[] = [
  {
    num: "01",
    tag: "Trading Broker",
    title: "CarltonFx",
    desc: "Real-time trading platform with WebSocket market feeds, MT5 Manager integration, order book management, and portfolio analytics. Built for sub-100ms execution with Redis, Kafka event streaming, and horizontal scaling on AWS.",
    techs: [
      { src: "/icons/NextJS-Dark.svg",      label: "Next.js"   },
      { src: "/icons/FastAPI.svg",          label: "FastAPI"   },
      { src: "/icons/Redis-Dark.svg",       label: "Redis"     },
      { src: "/icons/PostgreSQL-Dark.svg",  label: "Postgres"  },
      { src: "/icons/Docker.svg",           label: "Docker"    },
      { src: "/icons/AWS-Dark.svg",         label: "AWS"       },
    ],
    accent: "#1B48E8",
    link: "https://testing-client.carlton-fx.com/",
    Visual: TradingMock,
  },
  {
    num: "02",
    tag: "Sales CRM",
    title: "Sales CRM",
    desc: "Full-stack Sales CRM for Delta Institutions. Complete lead lifecycle — Facebook/Google Ads sync, round-robin agent auto-assignment, Kanban board, Socket.io real-time notifications, AI lead assistant (Anthropic Claude), and PDF revenue reports.",
    techs: [
      { src: "/icons/Bun-Dark.svg",         label: "Bun"       },
      { src: "/icons/ExpressJS-Dark.svg",   label: "Express"   },
      { src: "/icons/MongoDB.svg",          label: "MongoDB"   },
      { src: "/icons/NextJS-Dark.svg",      label: "Next.js"   },
      { src: "/icons/TypeScript.svg",       label: "TypeScript"},
      { src: "/icons/TailwindCSS-Dark.svg", label: "Tailwind"  },
    ],
    accent: "#059669",
    link:"https://delta-leads-crm.vercel.app/",
    Visual: CRMMock,
  },
  {
    num: "03",
    tag: "EdTech Platform",
    title: "LMS",
    desc: "Live class & course management platform with real-time Mux streaming, WebRTC browser broadcasts, RTMP/OBS support, and a weekly calendar for students. Admin portal for scheduling, monitoring streams, and managing courses.",
    techs: [
      { src: "/icons/NextJS-Dark.svg",      label: "Next.js"   },
      { src: "/icons/NodeJS-Dark.svg",      label: "Node.js"   },
      { src: "/icons/PostgreSQL-Dark.svg",  label: "Postgres"  },
      { src: "/icons/Supabase-Dark.svg",    label: "Supabase"  },
      { src: "/icons/TailwindCSS-Dark.svg", label: "Tailwind"  },
    ],
    accent: "#7c3aed",
    link:"https://lms.deltainstitutions.com/login?from=%2F",
    Visual: StreamMock,
  },
  {
    num: "04",
    tag: "FinTech",
    title: "Finance ERP",
    desc: "Financial operations platform for exchange & remittance businesses — KYC client management, deposit/withdrawal approvals, treasury (banks, crypto wallets, PSPs), reconciliation, loans, audit trail, and automated email reports. Dual-instance deployment.",
    techs: [
      { src: "/icons/React-Dark.svg",       label: "React"     },
      { src: "/icons/FastAPI.svg",          label: "FastAPI"   },
      { src: "/icons/Python-Dark.svg",      label: "Python"    },
      { src: "/icons/MongoDB.svg",          label: "MongoDB"   },
      { src: "/icons/TailwindCSS-Dark.svg", label: "Tailwind"  },
    ],
    accent: "#dc2626",

    Visual: FinanceMock,
  },
];

// ─── Featured card ────────────────────────────

function FeaturedCard({ p }: { p: Project }) {
  return (
    <div onClick={()=>{
      if(typeof window!==undefined){
        window.open(p.link,"_blank")
      }
    }} className="group cursor-pointer relative flex flex-col md:flex-row overflow-hidden rounded-2xl border border-white/[0.08] backdrop-blur-sm bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.03] transition-all duration-300">
      {/* Content */}
      <div className="flex flex-col justify-center px-7 pt-8 pb-7 md:w-[44%] md:border-r border-b md:border-b-0 border-white/[0.06]">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="font-mondwest text-[#1B48E8] text-[13px]">{p.num}</span>
          <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white/35 border border-white/[0.1] rounded-full px-2.5 py-[3px]">
            {p.tag}
          </span>
        </div>
        <h3
          className="font-inter font-bold text-white leading-[1.1] mb-3"
          style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)" }}
        >
          {p.title}
        </h3>
        <p className="text-white/45 text-[13px] sm:text-[14px] leading-[1.7] mb-6">{p.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {p.techs.map((t) => <TechPill key={t.label} src={t.src} label={t.label} />)}
        </div>
        <a
          href={p.link ?? "#"}
          target={p.link ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="text-[13px] font-semibold text-white/40 hover:text-white transition-colors self-start"
        >
          View project →
        </a>
      </div>
      {/* Visual */}
      <div className="flex-1 min-h-[260px] sm:min-h-[340px] p-4 sm:p-5 bg-[#060606]">
        <p.Visual />
      </div>
    </div>
  );
}

// ─── Small card ───────────────────────────────

function SmallCard({ p }: { p: Project }) {
  return (
    <div onClick={()=>{
      if(typeof window!==undefined){
        window.open(p.link,"_blank")
      }
    }} className="group cursor-pointer flex flex-col overflow-hidden backdrop-blur-sm rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.03] transition-all duration-300">
      {/* Visual */}
      <div className="h-[190px] p-4 bg-[#060606] border-b border-white/[0.06]">
        <p.Visual />
      </div>
      {/* Content */}
      <div className="flex flex-col p-5 flex-1">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="font-mondwest text-[#1B48E8] text-[12px]">{p.num}</span>
          <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-white/30">{p.tag}</span>
        </div>
        <h3 className="font-inter font-bold text-white text-[17px] sm:text-[18px] mb-2 leading-[1.2]">
          {p.title}
        </h3>
        <p className="text-white/45 text-[12px] sm:text-[13px] leading-[1.65] mb-4 flex-1">{p.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.techs.slice(0, 4).map((t) => <TechPill key={t.label} src={t.src} label={t.label} />)}
        </div>
        <a
          href={p.link ?? "#"}
          target={p.link ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="text-[12px] font-semibold text-white/35 hover:text-white transition-colors self-start"
        >
          View project →
        </a>
      </div>
    </div>
  );
}

// ─── Website data ─────────────────────────────

interface WebSite {
  num: string;
  tag: string;
  title: string;
  desc: string;
  url: string;
  link: string;
  accent: string;
  tagline: string;
}

const WEBSITES: WebSite[] = [
  {
    num: "05",
    tag: "Landing Page",
    title: "CarltonFx Website",
    desc: "Marketing site for CarltonFx — a regulated forex & CFD broker. Conversion-focused design with platform features, account types, and onboarding.",
    url: "carltonfx.com",
    link: "https://carltonfx.com",
  accent: "#059669",
    tagline: "Forex · CFDs · Crypto",
  },
  {
    num: "06",
    tag: "Education",
    title: "Elegant Trading Academy",
    desc: "Website for Elegant Trading Academy — a forex & trading education brand. Course listings, instructor profiles, and enrollment flows.",
    url: "eleganttradinghub.com",
    link: "https://www.eleganttradingacademy.com/",
    accent: "#f59e0b",
    tagline: "Forex Education",
  },
  {
    num: "07",
    tag: "Trading Hub",
    title: "Delta Trading Hub (up comming)",
    desc: "Brand site for Delta Trading Hub — signals, community access, and platform integrations with a clean dark conversion-focused layout.",
    url: "deltatradinghub.com",
    link: "https://delta-trading-hub-v2.vercel.app/",
    
    accent: "#1B48E8",
    tagline: "Signals · Community",
  },
  {
    num: "08",
    tag: "Digital Academy",
    title: "Delta Digital Academy",
    desc: "Landing site for Delta Digital Academy — online course catalogue, instructor bios, and enrolment CTAs. Modern dark academic aesthetic.",
    url: "deltadigitalacademy.com",
    link: "https://deltadigitalacademy.com",
    accent: "#7c3aed",
    tagline: "Online Courses",
  },
  {
    num: "09",
    tag: "Institution",
    title: "Delta Institutions",
    desc: "Flagship website for Delta Institutions — umbrella brand covering trading education, digital learning, and financial services.",
    url: "deltainstitutions.com",
    link: "https://deltainstitutions.com",
    accent: "#0891b2",
    tagline: "Finance · Education",
  },
  {
    num: "10",
    tag: "Sales Landing",
    title: "Delta Sales Page",
    desc: "High-conversion sales landing page for Delta — headline-driven layout, social proof, feature highlights, and a single clear CTA designed to capture leads.",
    url: "sales-landing-v2.vercel.app",
    link: "https://sales-landing-v2.vercel.app/",
    accent: "#1B48E8",
    tagline: "Lead Generation",
  },
  {
    num: "11",
    tag: "Academy",
    title: "CLT Academy",
    desc: "Website for CLT Academy — course catalogue, instructor bios, and enrolment flows. Bold red brand identity with a clean, modern layout.",
    url: "clt-academy.com",
    link: "https://clt-academy.com",
    accent: "#dc2626",
    tagline: "Education · Courses",
  },
  {
    num: "12",
    tag: "Agency",
    title: "Two Four Solution",
    desc: "Corporate website for Two Four Solution — service offerings, portfolio showcasing, team profiles, and a contact flow. Fresh green brand theme.",
    url: "twofoursolution.com",
    link: "https://www.twofoursolution.com/",
    accent: "#16a34a",
    tagline: "Digital Agency",
  },
  {
    num: "13",
    tag: "Form / Register",
    title: "Delta Register",
    desc: "Typeform-style multi-step registration & enrolment form for Delta Institutions — smooth step transitions, validation, and submission to the CRM pipeline.",
    url: "register.deltainstitutions.com",
    link: "https://register.deltainstitutions.com/",
    accent: "#6366f1",
    tagline: "Enrolment Flow",
  },
];

// ─── Website card ─────────────────────────────

function WebCard({ site }: { site: WebSite }) {
  return (
    <div onClick={()=>{
      if(typeof window!==undefined){
        window.open(site.link,"_blank")
      }
    }} className="group flex cursor-pointer flex-col overflow-hidden backdrop-blur-sm rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.03] transition-all duration-300">
      {/* Visual */}
      <div className="h-[155px] p-3.5 bg-[#060606] border-b border-white/[0.06]">
        <LandingMock accent={site.accent} url={site.url} tagline={site.tagline} />
      </div>
      {/* Content */}
      <div className="flex flex-col p-4 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mondwest text-[11px]" style={{ color: site.accent }}>{site.num}</span>
          <span className="text-[9px] font-semibold tracking-[0.13em] uppercase text-white/28">{site.tag}</span>
        </div>
        <h3 className="font-inter font-bold text-white text-[14px] sm:text-[15px] mb-1.5 leading-[1.2]">
          {site.title}
        </h3>
        <p className="text-white/40 text-[11px] sm:text-[12px] leading-[1.65] mb-3 flex-1">{site.desc}</p>
        <a
          href={site.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-semibold transition-colors self-start hover:opacity-100"
          style={{ color: `${site.accent}80` }}
        >
          Visit site →
        </a>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────

export default function ProjectsSection() {
  const [featured, ...rest] = PROJECTS;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Section label "03" ─────────────────────────────────────────────
      gsap.fromTo(
        ".proj-label",
        { opacity: 0, y: 10, filter: "blur(6px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".proj-label", start: "top 86%" },
          onComplete() { gsap.set(".proj-label", { filter: "none" }); },
        },
      );

      // ── Heading word-by-word blur ──────────────────────────────────────
      gsap.set(".proj-heading .sw", { willChange: "filter, transform, opacity" });

      gsap.fromTo(
        ".proj-heading .sw",
        { opacity: 0, filter: "blur(14px)", y: 22 },
        {
          opacity: 1, filter: "blur(0px)", y: 0,
          duration: 0.88, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: ".proj-heading", start: "top 82%" },
          onComplete() {
            gsap.set(".proj-heading .sw", { willChange: "auto", filter: "none" });
          },
        },
      );

      // ── Sub-copy ───────────────────────────────────────────────────────
      gsap.fromTo(
        ".proj-sub",
        { opacity: 0, filter: "blur(10px)", y: 18 },
        {
          opacity: 1, filter: "blur(0px)", y: 0,
          duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".proj-sub", start: "top 86%" },
          onComplete() { gsap.set(".proj-sub", { filter: "none" }); },
        },
      );

      // ── Featured card ──────────────────────────────────────────────────
      gsap.fromTo(
        ".proj-featured",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.05, ease: "expo.out",
          scrollTrigger: { trigger: ".proj-featured", start: "top 85%" },
        },
      );

      // ── Small project cards stagger ────────────────────────────────────
      gsap.fromTo(
        ".proj-cards > div",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "expo.out",
          scrollTrigger: { trigger: ".proj-cards", start: "top 84%" },
        },
      );

      // ── Website divider line ───────────────────────────────────────────
      gsap.fromTo(
        ".proj-divider",
        { opacity: 0 },
        {
          opacity: 1, duration: 0.9,
          scrollTrigger: { trigger: ".proj-divider", start: "top 90%" },
        },
      );

      // ── Website cards stagger ──────────────────────────────────────────
      gsap.fromTo(
        ".proj-web-cards > div",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "expo.out",
          scrollTrigger: { trigger: ".proj-web-cards", start: "top 86%" },
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
        <img src="/left-grid-1.png" alt="" className="h-full max-h-[80vh] w-auto block" />
      </div>
      <div className="absolute top-[50%] left-0 h-full pointer-events-none z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/left-grid-1.png" alt="" className="h-full max-h-[80vh] w-auto block" />
      </div>
      {/* Right vignette */}
      <div className="absolute top-0 right-0 h-full pointer-events-none z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/right-grid-1.png" alt="" className="h-full max-h-[80vh] w-auto block" />
      </div>
      <div className="absolute top-[50%] right-0 h-full pointer-events-none z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/right-grid-1.png" alt="" className="h-full max-h-[80vh] w-auto block" />
      </div>

      <div className="relative z-[2] px-5 sm:px-8 md:px-[clamp(32px,8.5vw,130px)] pt-14 sm:pt-20 md:pt-24 pb-16 sm:pb-24 md:pb-28">

        {/* ── Heading ── */}
        <div className="mb-10 max-md:flex-col max-md:flex items-center justify-center sm:mb-14">
          <p className="proj-label font-mondwest text-[#1B48E8] text-[13px] tracking-[0.1em] mb-2">03</p>
          <h2
            className="proj-heading font-inter max-md:text-center font-bold text-white leading-[1.05] tracking-[-0.025em] max-w-[700px]"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)" }}
          >
            <W>Selected</W>{" "}
            <W>work</W>{" "}
            <W>&amp;</W>
            <br />
            <W className="font-mondwest font-normal italic text-white/70">projects</W>{" "}
            <W className="align-middle">
              <Image
                src="/icon-folder.png"
                alt=""
                width={500}
                height={500}
                className="inline-block align-middle w-auto h-[1.4em] mx-1"
              />
            </W>
          </h2>
          <p className="proj-sub text-white/40 max-md:text-center text-[13px] sm:text-[14px] mt-3 max-w-[480px] leading-relaxed">
            Production systems shipped end-to-end — trading platforms, CRMs, EdTech streaming, and FinTech operations.
          </p>
        </div>

        {/* ── Featured card ── */}
        <div className="proj-featured mb-4 sm:mb-5">
          <FeaturedCard p={featured} />
        </div>

        {/* ── 3-card grid ── */}
        <div className="proj-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {rest.map((p) => (
            <div key={p.num}><SmallCard p={p} /></div>
          ))}
        </div>

        {/* ── Website projects divider ── */}
        <div className="proj-divider flex items-center gap-4 mt-12 sm:mt-16 mb-6 sm:mb-8">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-white/25 shrink-0">
            Website Projects
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* ── Websites grid ── */}
        <div className="proj-web-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {WEBSITES.map((site) => (
            <div key={site.num}><WebCard site={site} /></div>
          ))}
        </div>
      </div>
    </section>
  );
}
