import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";
import { CountUp } from "@/components/CountUp";
import { Marquee } from "@/components/Marquee";
import { brandCount, categories, groups, products } from "@/lib/catalog";
import { TiltCard } from "@/components/fx/TiltCard";
import { Magnetic } from "@/components/fx/Magnetic";
import { CursorGlow } from "@/components/fx/CursorGlow";
import { SplitWords } from "@/components/fx/SplitWords";

const TILES = [
  { art: "bat", accent: "#c8901c", label: "Cricket", href: "/shop?group=cricket", tilt: "-5deg", delay: "0s" },
  { art: "racquet", accent: "#0f766e", label: "Badminton", href: "/shop?group=badminton", tilt: "4deg", delay: "1.2s" },
  { art: "shoe", accent: "#3a3f4a", label: "Shoes", href: "/shop?group=shoes", tilt: "-3deg", delay: "2.4s" },
] as const;

const BRANDS = [
  "YONEX",
  "SG",
  "SS",
  "SHREY",
  "LI-NING",
  "ADIDAS",
  "ASICS",
  "STAG",
  "MRF",
  "DSC",
  "GN",
  "NIVIA",
];

export function Hero() {
  return (
    <section className="stadium grain aurora-field relative overflow-hidden text-white">
      <CursorGlow />
      {/* drifting speed lines + brand glows */}
      <div
        aria-hidden
        className="animate-glow pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-500/25 blur-3xl"
      />

      <Container className="hero-scroll-fx relative z-10 grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-24 lg:pt-20">
        {/* ---- Copy ---- */}
        <div className="text-center lg:text-left">
          <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
            </span>
            New season · 2026 range now live across 14 sports
          </span>

          <h1
            className="hero-fluid animate-rise mt-6 font-display font-extrabold uppercase tracking-tight"
            style={{ animationDelay: "80ms" }}
          >
            <SplitWords text="The future" delay={120} step={80} />
            <br />
            <SplitWords text="of sport" delay={280} step={80} />
            <br />
            <span className="inline-block -skew-x-6 bg-gradient-to-r from-brand-400 via-gold-400 to-gold-500 bg-clip-text pr-2 text-transparent">
              is here.
            </span>
          </h1>

          <p
            className="animate-rise mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65 lg:mx-0"
            style={{ animationDelay: "160ms" }}
          >
            Fourteen sports. One counter in Chennai. Shipped worldwide.
          </p>

          <div
            className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            style={{ animationDelay: "240ms" }}
          >
            <Magnetic>
              <Link
                href="#sports-os"
                className="press btn-shine inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-shadow hover:shadow-xl hover:shadow-brand-500/40"
              >
                Explore sports
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Magnetic>
            <Link
              href="/shop"
              className="press inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore gear
            </Link>
          </div>

          {/* Trust stats */}
          <div
            className="animate-rise mt-10 inline-grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4 lg:gap-x-12"
            style={{ animationDelay: "320ms" }}
          >
            <Stat label="Products">
              <CountUp value={products.length} />
            </Stat>
            <Stat label="Sports">
              <CountUp value={groups.length} />
            </Stat>
            <Stat label="Categories">
              <CountUp value={categories.length} />
            </Stat>
            <Stat label="Brands">
              <CountUp value={brandCount()} />
            </Stat>
          </div>
        </div>

        {/* ---- Floating category cards ---- */}
        <div className="animate-rise hidden grid-cols-2 gap-5 pt-4 md:grid" style={{ animationDelay: "200ms" }}>
          <TiltCard
            className="row-span-2 self-center"
            maxTilt={8}
            style={{ "--tilt": TILES[0].tilt, animationDelay: TILES[0].delay } as React.CSSProperties}
          >
            <Link
              href={TILES[0].href}
              className="group relative block h-full overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-2xl shadow-black/50 transition-shadow duration-300 hover:shadow-brand-500/20"
            >
              <ProductArt
                art={TILES[0].art}
                accent={TILES[0].accent}
                label={TILES[0].label}
                className="h-full min-h-80 w-full transition-transform duration-500 group-hover:scale-105"
              />
              <span className="sheen" aria-hidden />
              <TileLabel>{TILES[0].label}</TileLabel>
            </Link>
          </TiltCard>
          {TILES.slice(1).map((t) => (
            <TiltCard
              key={t.label}
              
              maxTilt={8}
              style={{ "--tilt": t.tilt, animationDelay: t.delay } as React.CSSProperties}
            >
              <Link
                href={t.href}
                className="group relative block overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-2xl shadow-black/50 transition-shadow duration-300 hover:shadow-brand-500/20"
              >
                <ProductArt
                  art={t.art}
                  accent={t.accent}
                  label={t.label}
                  className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
                />
                <span className="sheen" aria-hidden />
                <TileLabel>{t.label}</TileLabel>
              </Link>
            </TiltCard>
          ))}
        </div>
      </Container>

      {/* ---- Brand ticker ---- */}
      <div className="relative z-10 border-t border-white/10 py-4">
        <Marquee duration={28}>
          {BRANDS.map((b) => (
            <span key={b} className="mx-7 flex items-center gap-7 sm:mx-9 sm:gap-9">
              <span className="font-display text-sm font-bold tracking-[0.16em] text-white/45">
                {b}
              </span>
              <span aria-hidden className="inline-block h-1.5 w-1.5 rotate-45 bg-gold-500/50" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="text-center lg:text-left">
      <p className="font-display text-2xl font-bold text-white sm:text-[1.7rem]">{children}</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
        {label}
      </p>
    </div>
  );
}

function TileLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
      {children}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
