import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";
import { ParallaxScene } from "@/components/ParallaxScene";
import { CountUp } from "@/components/CountUp";

export function Hero() {
  return (
    <section className="stadium relative overflow-hidden text-white">
      {/* pitch texture + floodlight glows */}
      <div className="pitch-stripes pointer-events-none absolute inset-0 opacity-40" />
      <div className="animate-glow pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />
      <div className="animate-glow pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" style={{ animationDelay: "3.5s" }} />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-brand-500/25 blur-3xl" />

      <Container className="relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-brand-100/90 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
            </span>
            New season · 2026 range now live
          </span>
          <h1
            className="hero-fluid animate-rise mt-5 font-display font-extrabold tracking-tight"
            style={{ animationDelay: "80ms" }}
          >
            Gear built to be
            <span className="block bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">
              played, not admired.
            </span>
          </h1>
          <p
            className="animate-rise mt-5 max-w-md text-base leading-relaxed text-brand-100/70"
            style={{ animationDelay: "160ms" }}
          >
            Pro-grade cricket bats, gloves, pads and helmets — hand-crafted in
            Meerut and shipped factory-direct across India. Kit up like the pros
            without the pro-shop markup.
          </p>
          <div
            className="animate-rise mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/shop"
              className="press inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-950 shadow-lg shadow-gold-500/25 transition-shadow hover:shadow-xl hover:shadow-gold-500/40"
            >
              Shop all gear
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/shop?group=bats"
              className="press inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore bats
            </Link>
          </div>
          <dl
            className="animate-rise mt-10 flex gap-8"
            style={{ animationDelay: "320ms" }}
          >
            <div>
              <dt className="font-display text-2xl font-bold text-white">
                <CountUp value={25} suffix="k+" />
              </dt>
              <dd className="text-xs text-brand-100/60">Cricketers kitted</dd>
            </div>
            <div>
              <dt className="font-display text-2xl font-bold text-white">
                <CountUp value={4.8} decimals={1} suffix="★" />
              </dt>
              <dd className="text-xs text-brand-100/60">Average rating</dd>
            </div>
            <div>
              <dt className="font-display text-2xl font-bold text-white">
                <CountUp value={48} suffix="h" />
              </dt>
              <dd className="text-xs text-brand-100/60">Dispatch, pan-India</dd>
            </div>
          </dl>
        </div>

        {/* Floating gear scene with pointer parallax */}
        <ParallaxScene className="relative hidden animate-rise lg:block" >
          <div className="relative mx-auto aspect-square max-w-md 2xl:max-w-lg">
            {/* bat — hero layer */}
            <div data-depth="0.35" className="absolute left-0 top-6 w-3/5 will-change-transform">
              <div className="animate-float rotate-[-6deg] overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40">
                <ProductArt art="bat" accent="#e0a82e" className="aspect-square" label="Cricket bat" />
              </div>
            </div>
            {/* helmet */}
            <div data-depth="0.55" className="absolute bottom-0 right-2 w-1/2 will-change-transform">
              <div className="animate-float rotate-[7deg] overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40" style={{ animationDelay: "1.2s" }}>
                <ProductArt art="helmet" accent="#3b4252" className="aspect-square" label="Helmet" />
              </div>
            </div>
            {/* gloves */}
            <div data-depth="0.8" className="absolute bottom-6 left-2 w-2/5 will-change-transform">
              <div className="animate-float rotate-[-9deg] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40" style={{ animationDelay: "1.8s" }}>
                <ProductArt art="gloves" accent="#256e49" className="aspect-square" label="Batting gloves" />
              </div>
            </div>
            {/* animated cricket ball */}
            <div data-depth="1.1" className="absolute right-4 top-2 w-28 will-change-transform">
              <div className="animate-ball-bounce">
                <BallSVG />
              </div>
              <div className="animate-ball-shadow mx-auto mt-2 h-3 w-20 rounded-full bg-black/50 blur-[6px]" />
            </div>
          </div>
        </ParallaxScene>
      </Container>

      {/* bottom hairline fade into the page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />
    </section>
  );
}

/** Hand-drawn cricket ball with a spinning seam. */
function BallSVG() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full drop-shadow-[0_14px_18px_rgba(0,0,0,0.45)]">
      {/* leather */}
      <circle cx="60" cy="60" r="52" fill="#c23227" />
      <circle cx="60" cy="60" r="52" fill="url(#ws-ball-light)" />
      {/* spinning seam group */}
      <g className="animate-seam-spin" style={{ transformOrigin: "60px 60px" }}>
        <path d="M60 10 q30 50 0 100" fill="none" stroke="#f6e7d8" strokeWidth="2.5" opacity="0.9" />
        <path d="M60 10 q26 50 0 100" fill="none" stroke="#8f1f16" strokeWidth="1.2" opacity="0.8" />
        {Array.from({ length: 12 }).map((_, i) => {
          const y = 18 + i * 7.4;
          return (
            <line
              key={i}
              x1="52"
              y1={y}
              x2="66"
              y2={y}
              stroke="#f6e7d8"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
              transform={`rotate(${i * 1.5 - 8} 60 60)`}
            />
          );
        })}
      </g>
      {/* highlight */}
      <ellipse cx="42" cy="38" rx="18" ry="12" fill="#ffffff" opacity="0.28" />
      <defs>
        <radialGradient id="ws-ball-light" cx="0.35" cy="0.3" r="1">
          <stop offset="0%" stopColor="#e8564a" />
          <stop offset="55%" stopColor="#c23227" />
          <stop offset="100%" stopColor="#7e1a12" />
        </radialGradient>
      </defs>
    </svg>
  );
}
