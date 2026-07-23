import type { ArtKind } from "@/lib/types";

/**
 * Self-contained SVG artwork for each product type.
 * No external images — a tinted gradient panel plus a clean white
 * illustration, so every card looks intentional and loads instantly.
 */
export function ProductArt({
  art,
  accent,
  className = "",
  label,
  image,
}: {
  art: ArtKind;
  accent: string;
  className?: string;
  label?: string;
  image?: string;
}) {
  // An uploaded photo takes over the whole panel.
  if (image) {
    return (
      <div className={`relative isolate overflow-hidden bg-subtle ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={label ?? "product photo"}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const panel: React.CSSProperties = {
    backgroundImage: `radial-gradient(120% 100% at 20% 0%,
      color-mix(in srgb, ${accent} 10%, #ffffff) 0%,
      color-mix(in srgb, ${accent} 26%, #f4f2ec) 48%,
      color-mix(in srgb, ${accent} 55%, #12233c) 100%)`,
  };

  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      style={panel}
      role="img"
      aria-label={label ?? `${art} illustration`}
    >
      {/* soft light bloom */}
      <div
        className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full blur-2xl"
        style={{ background: "rgba(255,255,255,0.4)" }}
      />
      {/* corner vignette for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 110% at 85% 105%, rgba(7,19,12,0.28) 0%, transparent 55%)",
        }}
      />
      <svg
        viewBox="0 0 320 320"
        className="relative z-10 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ground shadow */}
        <ellipse
          cx="160"
          cy="294"
          rx="104"
          ry="15"
          fill="#0b1524"
          opacity="0.2"
        />
        {/* artwork fills the tile */}
        <g transform="translate(160 160) scale(1.26) translate(-160 -160)">
          <Art art={art} accent={accent} />
        </g>
      </svg>
    </div>
  );
}

function Art({ art, accent }: { art: ArtKind; accent: string }) {
  const W = "#ffffff";
  const soft = "rgba(255,255,255,0.72)";
  const line = "rgba(14,28,20,0.22)";

  switch (art) {
    case "bat":
      return (
        <g transform="rotate(-22 160 160)">
          {/* blade */}
          <rect x="139" y="146" width="42" height="128" rx="16" fill={W} />
          <rect x="139" y="146" width="14" height="128" rx="7" fill={accent} opacity="0.14" />
          {/* toe guard */}
          <rect x="141" y="258" width="38" height="16" rx="7" fill={accent} opacity="0.7" />
          {/* shoulder */}
          <path d="M148 150 q12 -14 24 0 v6 h-24 z" fill={soft} />
          {/* handle */}
          <rect x="150" y="70" width="20" height="82" rx="10" fill="#f1ead7" />
          {/* grip rings */}
          <g stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.85">
            <line x1="151" y1="86" x2="169" y2="86" />
            <line x1="151" y1="100" x2="169" y2="100" />
            <line x1="151" y1="114" x2="169" y2="114" />
            <line x1="151" y1="128" x2="169" y2="128" />
          </g>
        </g>
      );

    case "ball":
      return (
        <g>
          <circle cx="160" cy="160" r="90" fill={W} />
          <circle cx="160" cy="160" r="90" fill={accent} opacity="0.08" />
          {/* highlight */}
          <path
            d="M110 118 a90 90 0 0 1 60 -24"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.9"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* seam */}
          <path
            d="M160 70 q34 90 0 180"
            fill="none"
            stroke={accent}
            strokeWidth="4"
            opacity="0.55"
          />
          <g stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.8">
            {Array.from({ length: 9 }).map((_, i) => {
              const y = 82 + i * 20;
              return <line key={i} x1="150" y1={y} x2="170" y2={y} />;
            })}
          </g>
        </g>
      );

    case "gloves":
      return (
        <g>
          {/* palm */}
          <rect x="108" y="150" width="104" height="96" rx="26" fill={W} />
          {/* fingers */}
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={112 + i * 24}
              y={92}
              width="18"
              height="74"
              rx="9"
              fill={W}
            />
          ))}
          {/* finger seams */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={`s${i}`}
              x1={121 + i * 24}
              y1={100}
              x2={121 + i * 24}
              y2={150}
              stroke={line}
              strokeWidth="2"
            />
          ))}
          {/* thumb */}
          <rect
            x="90"
            y="168"
            width="20"
            height="52"
            rx="10"
            fill={W}
            transform="rotate(-24 100 194)"
          />
          {/* cuff */}
          <rect x="112" y="238" width="96" height="24" rx="10" fill={accent} opacity="0.75" />
        </g>
      );

    case "pads":
      return (
        <g>
          <rect x="118" y="74" width="84" height="176" rx="26" fill={W} />
          {/* knee dome */}
          <circle cx="160" cy="120" r="26" fill={soft} />
          {/* bolster rolls */}
          {[160, 196, 226].map((y, i) => (
            <rect key={i} x="126" y={y} width="68" height="18" rx="9" fill={accent} opacity="0.16" />
          ))}
          {/* straps */}
          {[150, 200].map((y, i) => (
            <g key={i}>
              <rect x="100" y={y} width="120" height="10" rx="5" fill={accent} opacity="0.7" />
            </g>
          ))}
        </g>
      );

    case "helmet":
      return (
        <g>
          {/* shell */}
          <path d="M96 168 a64 62 0 0 1 128 0 z" fill={W} />
          <path d="M96 168 a64 62 0 0 1 128 0 z" fill={accent} opacity="0.12" />
          {/* peak */}
          <path d="M92 168 h60 q-8 16 -34 18 h-30 q-4 -10 4 -18 z" fill={soft} />
          {/* grille bars */}
          <g stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.85">
            <line x1="150" y1="176" x2="150" y2="238" />
            <line x1="172" y1="176" x2="172" y2="238" />
            <line x1="194" y1="176" x2="194" y2="234" />
          </g>
          <g stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.7">
            <line x1="140" y1="194" x2="206" y2="194" />
            <line x1="140" y1="216" x2="204" y2="216" />
          </g>
          {/* chin bar */}
          <path d="M138 240 q34 20 70 0" fill="none" stroke={W} strokeWidth="10" strokeLinecap="round" />
        </g>
      );

    case "keeping":
      return (
        <g>
          <rect x="104" y="150" width="112" height="98" rx="28" fill={W} />
          {/* four fingers together */}
          <rect x="120" y="88" width="84" height="78" rx="30" fill={W} />
          {/* web */}
          <path d="M104 176 q-26 -6 -30 26 q22 8 34 -6 z" fill={accent} opacity="0.55" />
          {/* thumb */}
          <rect
            x="86"
            y="176"
            width="22"
            height="46"
            rx="11"
            fill={W}
            transform="rotate(-18 97 199)"
          />
          {/* seams */}
          <path d="M150 96 v66 M176 96 v66" stroke={line} strokeWidth="2" fill="none" />
          <rect x="110" y="240" width="100" height="22" rx="10" fill={accent} opacity="0.75" />
        </g>
      );

    case "bag":
      return (
        <g>
          {/* body */}
          <rect x="66" y="150" width="188" height="96" rx="34" fill={W} />
          <rect x="66" y="150" width="188" height="40" rx="20" fill={accent} opacity="0.12" />
          {/* zip */}
          <line x1="86" y1="176" x2="234" y2="176" stroke={line} strokeWidth="3" />
          {/* end panel */}
          <rect x="210" y="164" width="44" height="70" rx="20" fill={soft} />
          {/* handles */}
          <path d="M120 150 q40 -46 80 0" fill="none" stroke={W} strokeWidth="10" strokeLinecap="round" />
          <path d="M120 150 q40 -40 80 0" fill="none" stroke={accent} strokeWidth="4" opacity="0.6" strokeLinecap="round" />
          {/* wheels */}
          <circle cx="104" cy="252" r="14" fill={accent} opacity="0.8" />
          <circle cx="214" cy="252" r="14" fill={accent} opacity="0.8" />
          <circle cx="104" cy="252" r="5" fill={W} />
          <circle cx="214" cy="252" r="5" fill={W} />
        </g>
      );

    case "jersey":
      return (
        <g>
          <path
            d="M120 96 l-44 26 l16 34 l24 -12 v106 a10 10 0 0 0 10 10 h68 a10 10 0 0 0 10 -10 v-106 l24 12 l16 -34 l-44 -26 q-40 24 -80 0 z"
            fill={W}
          />
          {/* collar */}
          <path d="M136 96 q24 22 48 0" fill="none" stroke={accent} strokeWidth="5" opacity="0.7" />
          {/* side accent */}
          <path d="M110 150 v104" stroke={accent} strokeWidth="6" opacity="0.5" />
          <path d="M210 150 v104" stroke={accent} strokeWidth="6" opacity="0.5" />
          {/* number */}
          <circle cx="160" cy="196" r="4" fill={accent} opacity="0.4" />
        </g>
      );

    case "misc":
    default:
      return (
        <g>
          {/* three stumps */}
          {[120, 160, 200].map((x, i) => (
            <rect key={i} x={x - 8} y="118" width="16" height="140" rx="8" fill={W} />
          ))}
          {/* bails */}
          <rect x="112" y="108" width="56" height="9" rx="4" fill={accent} opacity="0.85" />
          <rect x="152" y="108" width="56" height="9" rx="4" fill={accent} opacity="0.85" />
          {/* grain hint */}
          {[120, 160, 200].map((x, i) => (
            <line key={`g${i}`} x1={x} y1="128" x2={x} y2="248" stroke={line} strokeWidth="2" />
          ))}
        </g>
      );
  }
}
