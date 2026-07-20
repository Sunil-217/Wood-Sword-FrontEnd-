import Link from "next/link";

/**
 * MM Sports shield crest — navy shield, white field, bold red "M"
 * and a red star. `tone="light"` swaps the shield body to a light
 * chip for dark backgrounds (footer).
 */
export function ShieldMark({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const navy = "#16263f";
  const red = "#c11f2f";
  const field = tone === "dark" ? "#ffffff" : "#ffffff";

  return (
    <svg viewBox="0 0 120 132" className={className} role="img" aria-label="MM Sports">
      {/* outer shield */}
      <path
        d="M60 4 L114 24 L114 70 C114 101 91 120 60 130 C29 120 6 101 6 70 L6 24 Z"
        fill={navy}
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
        stroke={navy}
        strokeWidth="2.4"
        opacity="0.35"
      />
      {/* red star */}
      <path
        d="M60 30 l4.9 10 11 1.6 -8 7.8 1.9 10.9 -9.8 -5.2 -9.8 5.2 1.9 -10.9 -8 -7.8 11 -1.6 z"
        fill={red}
      />
      {/* navy backing M */}
      <path
        d="M31 108 L31 54 L60 88 L89 54 L89 108"
        fill="none"
        stroke={navy}
        strokeWidth="13"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* red M */}
      <path
        d="M42 104 L42 62 L60 84 L78 62 L78 104"
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
      aria-label="MM Sports home"
    >
      <ShieldMark className="h-9 w-auto drop-shadow-sm" />
      <span className="font-display text-lg font-extrabold tracking-tight text-brand-950">
        MM<span className="text-ball-600"> SPORTS</span>
      </span>
    </Link>
  );
}
