import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ParallaxScene } from "@/components/ParallaxScene";
import { CountUp } from "@/components/CountUp";

export function Hero() {
  return (
    <section className="stadium relative overflow-hidden text-white">
      {/* ---- Stadium scene (parallax layers, anchored to the bottom) ---- */}
      <ParallaxScene className="absolute inset-0">
        {/* floodlight glows */}
        <div className="animate-glow pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />
        <div
          className="animate-glow pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl"
          style={{ animationDelay: "3.5s" }}
        />

        {/* stands + floodlight towers */}
        <div data-depth="0.22" className="absolute inset-0 will-change-transform">
          <StandsLayer />
        </div>

        {/* ground + pitch + stumps */}
        <div data-depth="0.1" className="absolute inset-0 will-change-transform">
          <PitchLayer />
        </div>

        {/* match ball, mid-bounce */}
        <div
          data-depth="0.55"
          className="absolute bottom-14 right-[10%] w-14 will-change-transform sm:w-16 lg:bottom-20 lg:w-20"
        >
          <div className="animate-ball-bounce">
            <BallSVG />
          </div>
          <div className="animate-ball-shadow mx-auto mt-1.5 h-2 w-12 rounded-full bg-black/55 blur-[5px]" />
        </div>
      </ParallaxScene>

      {/* ---- Copy, centred at the crease ---- */}
      <Container className="relative z-10 flex flex-col items-center pb-40 pt-16 text-center sm:pt-20 lg:pb-48 lg:pt-24">
        <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-brand-100/90 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
          </span>
          New season · 2026 range now live
        </span>

        <h1
          className="hero-fluid animate-rise mt-6 max-w-4xl font-display font-extrabold tracking-tight"
          style={{ animationDelay: "80ms" }}
        >
          Gear built to be{" "}
          <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">
            played, not admired.
          </span>
        </h1>

        <p
          className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-brand-100/70"
          style={{ animationDelay: "160ms" }}
        >
          Pro-grade cricket bats, gloves, pads and helmets — hand-crafted in
          Meerut and shipped factory-direct across India.
        </p>

        <div
          className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            href="/shop"
            className="press inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-brand-950 shadow-lg shadow-gold-500/25 transition-shadow hover:shadow-xl hover:shadow-gold-500/40"
          >
            Shop all gear
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/shop?group=bats"
            className="press inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Explore bats
          </Link>
        </div>

        {/* Scoreboard stats */}
        <div
          className="scoreboard animate-rise mt-12 inline-flex divide-x divide-gold-500/15 rounded-2xl"
          style={{ animationDelay: "320ms" }}
        >
          <ScoreCell label="Cricketers kitted">
            <CountUp value={25} suffix="k+" />
          </ScoreCell>
          <ScoreCell label="Average rating">
            <CountUp value={4.8} decimals={1} suffix="★" />
          </ScoreCell>
          <ScoreCell label="Dispatch time">
            <CountUp value={48} suffix="h" />
          </ScoreCell>
        </div>
      </Container>
    </section>
  );
}

function ScoreCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-5 py-4 sm:px-8">
      <p className="scoreboard-digits text-2xl font-bold sm:text-3xl">{children}</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-100/45">
        {label}
      </p>
    </div>
  );
}

/** Far stands silhouette + floodlight towers with light cones. */
function StandsLayer() {
  return (
    <svg
      viewBox="0 0 1440 700"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      aria-hidden
    >
      {/* stand tiers — kept low so they never crowd the copy */}
      <path d="M0 520 Q720 440 1440 520 L1440 700 L0 700 Z" fill="#0a1526" opacity="0.9" />
      <path d="M0 488 Q720 408 1440 488 L1440 520 Q720 440 0 520 Z" fill="#10203a" opacity="0.75" />

      {/* floodlight shafts from off-screen towers — no cropped lamp
          heads to read as noise at odd viewport sizes */}
      <polygon points="60,-80 -260,660 380,660" fill="url(#ws-cone)" className="animate-glow" />
      <polygon points="1380,-80 1060,660 1700,660" fill="url(#ws-cone)" className="animate-glow" />

      <defs>
        <linearGradient id="ws-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6d488" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#f6d488" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Outfield, perspective pitch, creases and stumps. */
function PitchLayer() {
  return (
    <svg
      viewBox="0 0 1440 700"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      aria-hidden
    >
      {/* outfield */}
      <ellipse cx="720" cy="810" rx="980" ry="260" fill="#0c2a1a" />
      <ellipse cx="720" cy="830" rx="980" ry="260" fill="#0e3120" opacity="0.7" />
      {/* mow rings */}
      <ellipse cx="720" cy="815" rx="760" ry="190" fill="none" stroke="#1a4a30" strokeWidth="26" opacity="0.35" />
      <ellipse cx="720" cy="820" rx="540" ry="130" fill="none" stroke="#1a4a30" strokeWidth="26" opacity="0.3" />

      {/* pitch (perspective) */}
      <path d="M652 545 L788 545 L872 700 L568 700 Z" fill="#a8946a" opacity="0.6" />
      <path d="M652 545 L788 545 L872 700 L568 700 Z" fill="url(#ws-pitch-light)" />

      {/* popping crease */}
      <line x1="642" y1="575" x2="798" y2="575" stroke="#f4efe2" strokeWidth="2.5" opacity="0.75" />
      {/* return creases */}
      <line x1="664" y1="556" x2="656" y2="592" stroke="#f4efe2" strokeWidth="2" opacity="0.55" />
      <line x1="776" y1="556" x2="784" y2="592" stroke="#f4efe2" strokeWidth="2" opacity="0.55" />

      {/* stumps at the far end */}
      <g>
        {[706, 720, 734].map((x) => (
          <rect key={x} x={x - 2.2} y={505} width="4.4" height="34" rx="2" fill="#f4e8c8" />
        ))}
        <rect x="702" y="502" width="17" height="3.4" rx="1.6" fill="#e0a82e" />
        <rect x="721" y="502" width="17" height="3.4" rx="1.6" fill="#e0a82e" />
        {/* stump glow */}
        <ellipse cx="720" cy="522" rx="34" ry="20" fill="#f6d488" opacity="0.1" />
      </g>

      <defs>
        <linearGradient id="ws-pitch-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6d488" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#f6d488" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Hand-drawn cricket ball with a spinning seam. */
function BallSVG() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full drop-shadow-[0_14px_18px_rgba(0,0,0,0.45)]">
      <circle cx="60" cy="60" r="52" fill="#c23227" />
      <circle cx="60" cy="60" r="52" fill="url(#ws-ball-light)" />
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
