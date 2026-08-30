import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center py-28 text-center">
      <p className="font-display text-7xl font-extrabold uppercase italic text-transparent [-webkit-text-stroke:2px_color-mix(in_srgb,var(--color-ink)_25%,transparent)]">
        Out!
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Error 404</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-ink">
        That page has been caught behind
      </h1>
      <div className="speed-dash mt-4" aria-hidden>
        <i />
      </div>
      <p className="mt-2 max-w-sm text-sm text-muted/55">
        We couldn&apos;t find what you were looking for. Let&apos;s get you back
        to the gear.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="rounded-full border border-line/15 bg-surface px-5 py-2.5 text-sm font-semibold text-ink hover:bg-subtle">
          Go home
        </Link>
        <Link href="/shop" className="press btn-shine rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors">
          Shop all gear
        </Link>
      </div>
    </Container>
  );
}
