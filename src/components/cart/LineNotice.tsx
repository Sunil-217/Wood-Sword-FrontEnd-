"use client";

/**
 * Inline notice above a cart line when the catalog has moved on — the
 * product was withdrawn, or its price changed since it went in the bag.
 * Never silently drops the line or charges a stale price.
 */
export function LineNotice({
  kind,
  currentPrice,
  onResolve,
}: {
  kind: "unavailable" | "reprice";
  currentPrice?: string;
  onResolve: () => void;
}) {
  const unavailable = kind === "unavailable";

  return (
    <div
      role="status"
      className={`mb-2 flex flex-wrap items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs ${
        unavailable
          ? "bg-ball-500/10 text-ball-600"
          : "bg-gold-500/10 text-gold-700"
      }`}
    >
      <span className="font-medium">
        {unavailable
          ? "No longer available in the store."
          : `Price updated — now ${currentPrice}.`}
      </span>
      <button
        onClick={onResolve}
        className="press shrink-0 rounded-full bg-surface px-3 py-1.5 text-[11px] font-semibold text-ink ring-1 ring-line/15"
      >
        {unavailable ? "Remove item" : "Update price"}
      </button>
    </div>
  );
}
