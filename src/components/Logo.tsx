import Link from "next/link";

/**
 * Oneup Sports mark — a crimson shield with a scarlet "one-up" arrow rising
 * out of a gold arc. `tone="light"` keeps the field white on dark backgrounds.
 */
export function ShieldMark({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const shell = "#3e0d14";
  const red = "#e0342a";
  const gold = "#f0c14e";
  const field = tone === "dark" ? "#ffffff" : "#ffffff";

  return (
    <svg viewBox="0 0 120 132" className={className} role="img" aria-label="Oneup Sports">
      {/* outer shield */}
      <path
        d="M60 4 L114 24 L114 70 C114 101 91 120 60 130 C29 120 6 101 6 70 L6 24 Z"
        fill={shell}
      />
      {/* white field */}
      <path
        d="M60 16 L104 32 L104 68 C104 93 85 109 60 118 C35 109 16 93 16 68 L16 32 Z"
        fill={field}
      />
      {/* inner navy hairline */}
      <path
        d="M60 22 L99 36 L99 67 C99 89 82 103 60 111 C38 103 21 89 21 67 L21 36 Z"
        fill="none"
        stroke={shell}
        strokeWidth="2.4"
        opacity="0.35"
      />
      {/* gold speed arc under the mark */}
      <path
        d="M34 96 q26 16 52 0"
        fill="none"
        stroke={gold}
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* navy backing for the arrow */}
      <path
        d="M34 66 L60 38 L86 66 M60 42 V88"
        fill="none"
        stroke={shell}
        strokeWidth="19"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* red "one up" arrow */}
      <path
        d="M34 66 L60 38 L86 66 M60 42 V88"
        fill="none"
        stroke={red}
        strokeWidth="12"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
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
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Oneup Sports home"
    >
      <ShieldMark className="h-9 w-auto drop-shadow-sm" />
      <span className="font-display text-lg font-extrabold tracking-tight text-ink">
        ONEUP<span className="text-ball-600"> SPORTS</span>
      </span>
    </Link>
  );
}
