import Link from "next/link";
import { useId } from "react";

/**
 * Oneup Sports wordmark — "—ONEup":
 * a red dash, a red ball "O" cut by two diagonal seam gaps (masked, so
 * the background shows through exactly like the reference logo), a red
 * italic N, an orange italic E and an orange superscript "up".
 */
const RED = "#e8232a";
const ORANGE = "#f2641c";

export function WordMark({ className = "" }: { className?: string }) {
  // Unique mask id per instance (header + footer can coexist on a page).
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const maskId = `oneup-o-${uid}`;

  return (
    <svg
      viewBox="0 0 262 84"
      className={className}
      role="img"
      aria-label="Oneup Sports"
    >
      <defs>
        <mask id={maskId}>
          <circle cx="62" cy="42" r="34" fill="#ffffff" />
          {/* seam gaps — the background shows through */}
          <path d="M20 72 L80 12" stroke="#000000" strokeWidth="5" />
          <path d="M40 76 L98 18" stroke="#000000" strokeWidth="5" />
        </mask>
      </defs>

      {/* leading dash */}
      <rect x="0" y="37" width="18" height="10" rx="2" fill={RED} />

      {/* ball O with seam gaps */}
      <circle cx="62" cy="42" r="34" fill={RED} mask={`url(#${maskId})`} />

      {/* N — bold italic */}
      <g fill={RED}>
        <path d="M101 76 L107 8 H120 L114 76 Z" />
        <path d="M107 8 H120 L151 76 H138 Z" />
        <path d="M138 76 L144 8 H157 L151 76 Z" />
      </g>

      {/* E — bold italic, orange */}
      <g fill={ORANGE}>
        <path d="M165 76 L171 8 H183 L177 76 Z" />
        <path d="M171 8 H207 L206 20 H170 Z" />
        <path d="M169 37 H200 L199 48 H168 Z" />
        <path d="M166 64 H204 L203 76 H165 Z" />
      </g>

      {/* superscript "up" */}
      <g stroke={ORANGE} fill="none" strokeLinecap="round">
        <path d="M216 6 V18.5 A7.5 7.5 0 0 0 231 18.5 V6" strokeWidth="6" />
        <path d="M242 6 V40" strokeWidth="6" />
        <circle cx="250" cy="15" r="8" strokeWidth="5.5" />
      </g>
    </svg>
  );
}

export function Logo({
  className = "",
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={`group inline-flex items-center ${className}`}
      aria-label="Oneup Sports home"
    >
      <WordMark className="h-8 w-auto drop-shadow-sm" />
    </Link>
  );
}
