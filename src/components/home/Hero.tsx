import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      {/* pitch texture + glow */}
      <div className="pitch-stripes pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-brand-500/25 blur-3xl" />

      <Container className="relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-brand-100/90 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            New season · 2026 range now live
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Gear built to be
            <span className="block text-gold-400">played, not admired.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-brand-100/70">
            Pro-grade cricket bats, gloves, pads and helmets — hand-crafted in
            Meerut and shipped factory-direct across India. Kit up like the pros
            without the pro-shop markup.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-950 shadow-lg shadow-gold-500/20 transition-transform hover:scale-[1.03]"
            >
              Shop all gear
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/shop?category=bats"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore bats
            </Link>
          </div>
          <dl className="mt-10 flex gap-8">
            {[
              ["25k+", "Cricketers kitted"],
              ["4.8★", "Average rating"],
              ["48h", "Dispatch, pan-India"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl font-bold text-white">{n}</dt>
                <dd className="text-xs text-brand-100/60">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Hero product collage */}
        <div className="relative hidden animate-rise lg:block" style={{ animationDelay: "120ms" }}>
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute left-0 top-6 w-3/5 rotate-[-6deg] rounded-3xl border border-white/10 shadow-2xl shadow-black/40">
              <ProductArt art="bat" accent="#e0a82e" className="aspect-square rounded-3xl" label="Cricket bat" />
            </div>
            <div className="absolute bottom-0 right-2 w-1/2 rotate-[7deg] rounded-3xl border border-white/10 shadow-2xl shadow-black/40">
              <ProductArt art="helmet" accent="#3b4252" className="aspect-square rounded-3xl" label="Helmet" />
            </div>
            <div className="absolute right-0 top-0 w-2/5 rotate-[10deg] rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
              <ProductArt art="ball" accent="#b92b22" className="aspect-square rounded-2xl" label="Cricket ball" />
            </div>
            <div className="absolute bottom-6 left-2 w-2/5 rotate-[-9deg] rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
              <ProductArt art="gloves" accent="#256e49" className="aspect-square rounded-2xl" label="Batting gloves" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
