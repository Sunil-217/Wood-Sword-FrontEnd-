import Link from "next/link";

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
      aria-label="Woodsword home"
    >
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-900 shadow-sm ring-1 ring-white/10">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          {/* crossed bat */}
          <rect
            x="10.6"
            y="3"
            width="2.8"
            height="15"
            rx="1.4"
            fill="#f0c14e"
            transform="rotate(-32 12 12)"
          />
          <rect
            x="10.6"
            y="6"
            width="2.8"
            height="12"
            rx="1.4"
            fill="#ffffff"
            transform="rotate(32 12 12)"
          />
          {/* ball */}
          <circle cx="17" cy="6.4" r="2.3" fill="#f0c14e" />
        </svg>
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight text-brand-950">
        WOOD<span className="text-gold-600">SWORD</span>
      </span>
    </Link>
  );
}
