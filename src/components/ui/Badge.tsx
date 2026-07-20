import type { Badge as BadgeKind } from "@/lib/types";

const styles: Record<BadgeKind, string> = {
  New: "bg-brand-600 text-white",
  Bestseller: "bg-gold-500 text-ink",
  Sale: "bg-ball-500 text-white",
  Pro: "bg-brand-950 text-gold-400 ring-1 ring-gold-500/40",
};

export function ProductBadge({
  kind,
  className = "",
}: {
  kind: BadgeKind;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide shadow-sm ${styles[kind]} ${className}`}
    >
      {kind}
    </span>
  );
}
