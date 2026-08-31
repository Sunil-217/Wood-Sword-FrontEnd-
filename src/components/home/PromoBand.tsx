import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";
import { TiltCard } from "@/components/fx/TiltCard";

export function PromoBand() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Custom bats */}
        <TiltCard maxTilt={3}>
        <div className="relative h-full overflow-hidden rounded-3xl bg-brand-900 p-8 text-white sm:p-10">
          <div className="pitch-stripes pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gold-500/20 blur-2xl" />
          <div className="relative max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">
              Made to order
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              Custom English willow bats
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-100/70">
              Pick your cleft, weight, profile and stickers. We shape it, ping-test
              it and knock it in by hand before it ships — free of charge.
            </p>
            <Link
              href="/shop?category=cricket-bats"
              className="press btn-shine mt-6 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-ink transition-colors"
            >
              Start your build
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="pointer-events-none absolute -bottom-6 -right-4 w-28 rotate-[-14deg] opacity-40 sm:w-52 sm:opacity-90">
            <ProductArt art="bat" accent="#e0a82e" className="aspect-square rounded-2xl" label="Custom bat" />
          </div>
        </div>

        </TiltCard>

        {/* Free stringing */}
        <TiltCard maxTilt={3}>
        <div className="relative h-full overflow-hidden rounded-3xl border border-line/10 bg-surface p-8 sm:p-10">
          <div className="pointer-events-none absolute -left-10 -bottom-10 h-56 w-56 rounded-full bg-brand-500/10 blur-2xl" />
          <div className="relative max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Free stringing on every racquet
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
              Yonex &amp; Li-Ning from ₹4,390
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted/60">
              Astrox, Arcsaber, Turbo Z and Armour — strung to your tension in
              store, with feather and nylon shuttles to match.
            </p>
            <Link
              href="/shop?group=badminton"
              className="press btn-shine mt-6 inline-flex items-center gap-2 rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              Shop badminton
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="pointer-events-none absolute -bottom-4 -right-2 flex w-32 gap-1 opacity-40 sm:w-60 sm:opacity-100">
            <div className="w-1/2 rotate-[8deg]">
              <ProductArt art="racquet" accent="#0f766e" className="aspect-square rounded-2xl" label="Racquet" />
            </div>
            <div className="w-1/2 -rotate-[6deg]">
              <ProductArt art="shuttle" accent="#5b6472" className="aspect-square rounded-2xl" label="Shuttlecock" />
            </div>
          </div>
        </div>
        </TiltCard>
      </div>
    </Container>
  );
}
