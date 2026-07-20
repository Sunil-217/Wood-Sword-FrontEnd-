import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  href,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            <StumpsIcon />
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        {/* ball-seam stitch underline */}
        <div className="seam-stitch mt-2.5 w-16" aria-hidden />
        {subtitle && <p className="mt-2 text-sm text-muted/55">{subtitle}</p>}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="press inline-flex items-center gap-1 rounded-full border border-line/12 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-subtle"
        >
          {linkLabel}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </div>
  );
}

function StumpsIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 21V8M12 21V8M17 21V8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M6 6h5.2M12.8 6H18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
