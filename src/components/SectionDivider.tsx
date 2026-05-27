// ─────────────────────────────────────────────
// SectionDivider
// Pixel-art downward arrow that separates the
// Hero from the Stats section.
// ─────────────────────────────────────────────
export default function SectionDivider() {
  return (
    <div className="flex justify-start pl-[clamp(32px,8.5vw,130px)] py-10 bg-[#0c0c0c]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="39"
        fill="none"
        viewBox="0 0 32 39"
        aria-hidden="true"
        className="mt-4"
      >
        <path fill="#04F" d="M19.2 0v6.4h-6.4V0z" />
        <path fill="#04F" d="M19.2 6.4v6.4h-6.4V6.4z" />
        <path fill="#04F" d="M25.6 6.4v6.4h-6.4V6.4z" />
        <path fill="#04F" d="M32 12.8v6.4h-6.4v-6.4z" />
        <path fill="#04F" d="M12.8 6.4v6.4H6.4V6.4z" />
        <path fill="#04F" d="M6.4 12.8v6.4H0v-6.4z" />
        <path fill="#04F" d="M19.2 12.8v6.4h-6.4v-6.4z" />
        <path fill="#04F" d="M19.2 19.2v6.4h-6.4v-6.4z" />
        <path fill="#04F" d="M19.2 32v6.4h-6.4V32z" />
      </svg>
    </div>
  );
}
