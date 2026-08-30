import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";
import { CountUp } from "@/components/CountUp";

const TILES = [
  { art: "bat", accent: "#c8901c", label: "Cricket", href: "/shop?group=cricket" },
  { art: "racquet", accent: "#0f766e", label: "Badminton", href: "/shop?group=badminton" },
  { art: "shoe", accent: "#3a3f4a", label: "Shoes", href: "/shop?group=shoes" },
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
];

export function Hero() {
  return (
    <section className="stadium relative overflow-hidden text-white">
      {/* ambient brand glows */}
      <div
        aria-hidden
        className="animate-glow pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-glow pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-gold-500/15 blur-3xl"
        style={{ animationDelay: "3.5s" }}
      />

      <Container className="relative z-10 grid items-center gap-10 pb-14 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20 lg:pt-20">
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
            className="hero-fluid animate-rise mt-6 font-display font-extrabold tracking-tight"
            style={{ animationDelay: "80ms" }}
          >
            One stop shop for all your{" "}
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">
              sporting requirements.
            </span>
          </h1>

          <p
            className="animate-rise mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65 lg:mx-0"
            style={{ animationDelay: "160ms" }}
          >
            Cricket, badminton, football, table tennis, fitness, swimming and
            more — an exclusive sports store in Chennai, shipping worldwide.
          </p>

          <div
            className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/shop"
              className="press inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-shadow hover:shadow-xl hover:shadow-brand-500/40"
            >
              Shop all gear
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/shop?group=cricket"
              className="press inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore cricket
            </Link>
          </div>

          {/* Trust stats */}
          <div
            className="animate-rise mt-10 inline-grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4 lg:gap-x-12"
            style={{ animationDelay: "320ms" }}
          >
            <Stat label="Athletes kitted">
              <CountUp value={25} suffix="k+" />
            </Stat>
            <Stat label="Average rating">
              <CountUp value={4.8} decimals={1} suffix="★" />
            </Stat>
            <Stat label="Sports covered">
              <CountUp value={14} />
            </Stat>
            <Stat label="Dispatch time">
              <CountUp value={48} suffix="h" />
            </Stat>
          </div>
        </div>

        {/* ---- Category bento ---- */}
        <div className="animate-rise hidden grid-cols-2 gap-3 md:grid" style={{ animationDelay: "200ms" }}>
          <Link
            href={TILES[0].href}
            className="group relative row-span-2 overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/40 transition-transform duration-300 hover:-translate-y-1"
          >
            <ProductArt
              art={TILES[0].art}
              accent={TILES[0].accent}
              label={TILES[0].label}
              className="h-full min-h-80 w-full transition-transform duration-500 group-hover:scale-105"
            />
            <TileLabel>{TILES[0].label}</TileLabel>
          </Link>
          {TILES.slice(1).map((t) => (
            <Link
              key={t.label}
              href={t.href}
              className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/40 transition-transform duration-300 hover:-translate-y-1"
            >
              <ProductArt
                art={t.art}
                accent={t.accent}
                label={t.label}
                className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
              />
              <TileLabel>{t.label}</TileLabel>
            </Link>
          ))}
        </div>
      </Container>

      {/* ---- Brand strip ---- */}
      <div className="relative z-10 border-t border-white/10">
        <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 sm:gap-x-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
            Trusted brands
          </span>
          {BRANDS.map((b) => (
            <span
              key={b}
              className="font-display text-sm font-bold tracking-[0.14em] text-white/45"
            >
              {b}
            </span>
          ))}
        </Container>
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
