import Link from "next/link";

/**
 * Shared failure surface. Says what the shopper can do, never what went
 * wrong internally — no stack traces, URLs or exception text reach here.
 */
export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this right now.",
  onRetry,
  retryLabel = "Try again",
  backHref = "/",
  backLabel = "Return home",
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div
      role="alert"
      className="mx-auto flex max-w-md flex-col items-center py-16 text-center"
    >
      <span
        aria-hidden
        className="flex h-14 w-14 items-center justify-center rounded-full bg-ball-500/10 text-ball-600"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 8v5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="12" cy="16.5" r="1.2" fill="currentColor" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </span>

      <h1 className="mt-5 font-display text-xl font-bold uppercase tracking-tight text-ink">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted/60">{description}</p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="press min-h-12 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25"
          >
            {retryLabel}
          </button>
        )}
        <Link
          href={backHref}
          className="press inline-flex min-h-12 items-center rounded-full border border-line/15 bg-surface px-6 py-3 text-sm font-semibold text-ink hover:bg-subtle"
        >
          {backLabel}
        </Link>
      </div>
    </div>
  );
}

/**
 * Empty result surface — distinct from an error. Nothing failed; there is
 * simply nothing here yet.
 */
export function EmptyState({
  headline,
  description,
  actionHref = "/shop",
  actionLabel = "Explore sports",
  children,
}: {
  headline: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
      <p className="font-display text-[clamp(1.75rem,6vw,3rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-transparent [-webkit-text-stroke:2px_color-mix(in_srgb,var(--color-ink)_22%,transparent)]">
        {headline}
      </p>
      <div className="speed-dash mt-6" aria-hidden>
        <i />
      </div>
      {description && (
        <p className="mt-6 text-sm leading-relaxed text-muted/60">{description}</p>
      )}
      {children}
      <Link
        href={actionHref}
        className="press mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25"
      >
        {actionLabel}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}
