import Image from "next/image";
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
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 25vw, 20vw",
}: {
  art: ArtKind;
  accent: string;
  className?: string;
  label?: string;
  image?: string;
  /** Layout width hint for next/image; default suits the product grid. */
  sizes?: string;
}) {
  // A real photo takes over the whole panel. Product shots sit on white, so
  // `contain` keeps the whole item visible instead of cropping into it.
  if (image) {
    return (
      <div
        className={`relative isolate overflow-hidden ${className}`}
        style={{
          // Photo shots arrive on white; a faint accent wash underneath keeps
          // them sitting in the same visual system as the SVG artwork tiles.
          backgroundImage: `radial-gradient(120% 100% at 20% 0%,
            #ffffff 0%,
            color-mix(in srgb, ${accent} 5%, #ffffff) 55%,
            color-mix(in srgb, ${accent} 14%, #f2f0ef) 100%)`,
        }}
      >
        <Image
          src={image}
          alt={label ?? "product photo"}
          fill
          sizes={sizes}
          className="object-contain p-2 transition-transform duration-700 [transition-timing-function:var(--ease-spring)] group-hover:scale-[1.06]"
          unoptimized={image.startsWith("data:")}
        />
      </div>
    );
  }

  const panel: React.CSSProperties = {
    backgroundImage: `radial-gradient(120% 100% at 20% 0%,
      color-mix(in srgb, ${accent} 10%, #ffffff) 0%,
      color-mix(in srgb, ${accent} 22%, #f4f2ec) 48%,
      color-mix(in srgb, ${accent} 55%, #2b2523) 100%)`,
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
          fill="#1c1717"
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

    case "racquet":
      return (
        <g transform="rotate(-28 160 160)">
          {/* head */}
          <ellipse cx="160" cy="116" rx="60" ry="72" fill="none" stroke={W} strokeWidth="13" />
          <ellipse cx="160" cy="116" rx="52" ry="64" fill={accent} opacity="0.14" />
          {/* strings */}
          <g stroke={soft} strokeWidth="2.4">
            {[-36, -18, 0, 18, 36].map((dx) => (
              <line key={`v${dx}`} x1={160 + dx} y1={116 - Math.sqrt(Math.max(0, 1 - (dx * dx) / 2704)) * 62} x2={160 + dx} y2={116 + Math.sqrt(Math.max(0, 1 - (dx * dx) / 2704)) * 62} />
            ))}
            {[-48, -24, 0, 24, 48].map((dy) => (
              <line key={`h${dy}`} x1={160 - Math.sqrt(Math.max(0, 1 - (dy * dy) / 4096)) * 50} y1={116 + dy} x2={160 + Math.sqrt(Math.max(0, 1 - (dy * dy) / 4096)) * 50} y2={116 + dy} />
            ))}
          </g>
          {/* throat */}
          <path d="M132 178 L152 214 M188 178 L168 214" stroke={W} strokeWidth="12" strokeLinecap="round" />
          {/* shaft + grip */}
          <rect x="150" y="208" width="20" height="42" rx="6" fill={W} />
          <rect x="147" y="242" width="26" height="52" rx="11" fill={accent} opacity="0.85" />
          <g stroke={W} strokeWidth="2.6" opacity="0.6">
            {[254, 266, 278].map((y) => (
              <line key={y} x1="149" y1={y} x2="171" y2={y - 5} />
            ))}
          </g>
        </g>
      );

    case "shuttle":
      return (
        <g>
          {/* feather skirt */}
          <path d="M160 92 L232 236 q-72 30 -144 0 z" fill={W} opacity="0.95" />
          <g stroke={accent} strokeWidth="2.6" opacity="0.5">
            {[-52, -26, 0, 26, 52].map((dx) => (
              <line key={dx} x1="160" y1="112" x2={160 + dx * 1.3} y2="240" />
            ))}
          </g>
          {/* binding rings */}
          <path d="M126 178 q34 14 68 0" fill="none" stroke={accent} strokeWidth="5" opacity="0.8" />
          <path d="M112 208 q48 18 96 0" fill="none" stroke={accent} strokeWidth="5" opacity="0.8" />
          {/* cork */}
          <path d="M132 96 a30 30 0 0 1 56 0 l-6 20 h-44 z" fill={soft} />
          <ellipse cx="160" cy="94" rx="28" ry="18" fill={W} />
          <ellipse cx="160" cy="94" rx="28" ry="18" fill={accent} opacity="0.16" />
        </g>
      );

    case "football":
      return (
        <g>
          <circle cx="160" cy="160" r="92" fill={W} />
          <circle cx="160" cy="160" r="92" fill={accent} opacity="0.08" />
          {/* centre pentagon */}
          <path d="M160 116 l38 28 -15 45 h-46 l-15 -45 z" fill={accent} opacity="0.82" />
          {/* outer pentagons */}
          {[0, 72, 144, 216, 288].map((a) => (
            <g key={a} transform={`rotate(${a} 160 160)`}>
              <path d="M160 68 l22 16 -8 24 h-28 l-8 -24 z" fill={accent} opacity="0.55" />
            </g>
          ))}
          {/* seams */}
          <g stroke={accent} strokeWidth="3" opacity="0.45" fill="none">
            <path d="M160 116 L160 74 M198 144 L236 132 M183 189 L198 230 M137 189 L122 230 M122 144 L84 132" />
          </g>
        </g>
      );

    case "basketball":
      return (
        <g>
          <circle cx="160" cy="160" r="92" fill={W} />
          <circle cx="160" cy="160" r="92" fill={accent} opacity="0.5" />
          <g stroke="#ffffff" strokeWidth="6" fill="none" opacity="0.95">
            <line x1="160" y1="68" x2="160" y2="252" />
            <line x1="68" y1="160" x2="252" y2="160" />
            <path d="M96 96 q64 64 0 128" />
            <path d="M224 96 q-64 64 0 128" />
          </g>
          {/* highlight */}
          <path d="M108 116 a92 92 0 0 1 54 -24" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="9" strokeLinecap="round" />
        </g>
      );

    case "volleyball":
      return (
        <g>
          <circle cx="160" cy="160" r="92" fill={W} />
          <circle cx="160" cy="160" r="92" fill={accent} opacity="0.1" />
          <g stroke={accent} strokeWidth="5" fill="none" opacity="0.75">
            <path d="M78 130 q70 30 138 -46" />
            <path d="M88 152 q76 26 140 -40" />
            <path d="M132 250 q6 -84 -50 -104" />
            <path d="M154 252 q4 -88 -56 -114" />
            <path d="M200 96 q42 62 6 138" />
            <path d="M218 110 q38 58 4 128" />
          </g>
          <path d="M108 116 a92 92 0 0 1 54 -24" fill="none" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="9" strokeLinecap="round" />
        </g>
      );

    case "tt-bat":
      return (
        <g transform="rotate(-24 160 160)">
          <circle cx="160" cy="136" r="74" fill={W} />
          <circle cx="160" cy="136" r="62" fill={accent} opacity="0.8" />
          {/* pimple texture */}
          <g fill="#ffffff" opacity="0.35">
            {[-36, -18, 0, 18, 36].map((dx) =>
              [-36, -18, 0, 18, 36].map((dy) =>
                dx * dx + dy * dy < 2400 ? <circle key={`${dx}:${dy}`} cx={160 + dx} cy={136 + dy} r="3" /> : null,
              ),
            )}
          </g>
          {/* handle */}
          <path d="M146 204 h28 l8 60 q-22 12 -44 0 z" fill="#f1ead7" />
          <path d="M146 204 h28 l2 16 h-32 z" fill={accent} opacity="0.4" />
        </g>
      );

    case "tt-table":
      return (
        <g>
          {/* table top in perspective */}
          <path d="M52 176 L268 176 L232 236 L88 236 z" fill={W} />
          <path d="M52 176 L268 176 L232 236 L88 236 z" fill={accent} opacity="0.45" />
          {/* centre line */}
          <line x1="160" y1="176" x2="160" y2="236" stroke="#ffffff" strokeWidth="3" opacity="0.9" />
          {/* white edge band */}
          <path d="M52 176 L268 176 L264 182 L56 182 z" fill="#ffffff" />
          {/* net */}
          <rect x="66" y="150" width="188" height="28" rx="3" fill={soft} />
          <g stroke={accent} strokeWidth="1.6" opacity="0.6">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1={72 + i * 16} y1="152" x2={72 + i * 16} y2="176" />
            ))}
          </g>
          <rect x="62" y="146" width="196" height="6" rx="3" fill="#ffffff" />
          {/* legs */}
          <rect x="94" y="236" width="12" height="44" rx="5" fill={W} />
          <rect x="214" y="236" width="12" height="44" rx="5" fill={W} />
        </g>
      );

    case "shoe":
      return (
        <g>
          {/* sole */}
          <path d="M56 240 q0 20 22 20 h164 q28 0 28 -22 q0 -12 -14 -16 H62 z" fill={accent} opacity="0.85" />
          {/* upper */}
          <path
            d="M62 222 q-4 -46 26 -58 q22 -9 40 4 l28 20 q30 20 68 26 q34 5 40 30 z"
            fill={W}
          />
          {/* toe cap */}
          <path d="M62 222 q-4 -34 16 -50 q18 12 22 50 z" fill={soft} />
          {/* swoosh-style flash */}
          <path d="M108 212 q40 -34 92 -12" fill="none" stroke={accent} strokeWidth="9" strokeLinecap="round" opacity="0.8" />
          {/* laces */}
          <g stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.75">
            <line x1="130" y1="186" x2="152" y2="176" />
            <line x1="146" y1="198" x2="168" y2="188" />
            <line x1="162" y1="208" x2="184" y2="199" />
          </g>
          {/* collar */}
          <path d="M232 202 q22 4 26 26" fill="none" stroke={soft} strokeWidth="10" strokeLinecap="round" />
        </g>
      );

    case "skate":
      return (
        <g transform="rotate(-8 160 160)">
          {/* deck */}
          <path d="M52 176 q0 -22 30 -22 h156 q30 0 30 22 q0 20 -30 20 H82 q-30 0 -30 -20 z" fill={W} />
          <path d="M52 176 q0 -22 30 -22 h156 q30 0 30 22 z" fill={accent} opacity="0.28" />
          {/* grip tape edge */}
          <path d="M60 162 h200" stroke={line} strokeWidth="2" />
          {/* trucks */}
          <rect x="96" y="194" width="26" height="14" rx="6" fill={accent} opacity="0.9" />
          <rect x="198" y="194" width="26" height="14" rx="6" fill={accent} opacity="0.9" />
          {/* wheels */}
          <circle cx="102" cy="216" r="16" fill={soft} />
          <circle cx="220" cy="216" r="16" fill={soft} />
          <circle cx="102" cy="216" r="6" fill={accent} />
          <circle cx="220" cy="216" r="6" fill={accent} />
        </g>
      );

    case "swim":
      return (
        <g>
          {/* strap */}
          <path d="M62 148 q98 -46 196 0" fill="none" stroke={accent} strokeWidth="12" strokeLinecap="round" opacity="0.8" />
          {/* lenses */}
          <g>
            <ellipse cx="112" cy="168" rx="44" ry="36" fill={W} />
            <ellipse cx="208" cy="168" rx="44" ry="36" fill={W} />
            <ellipse cx="112" cy="168" rx="34" ry="26" fill={accent} opacity="0.55" />
            <ellipse cx="208" cy="168" rx="34" ry="26" fill={accent} opacity="0.55" />
            {/* glints */}
            <path d="M92 156 q14 -12 30 -8" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
            <path d="M188 156 q14 -12 30 -8" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
          </g>
          {/* nose bridge */}
          <path d="M152 174 q8 10 16 0" fill="none" stroke={W} strokeWidth="9" strokeLinecap="round" />
          {/* water line */}
          <path d="M64 236 q24 -14 48 0 t48 0 t48 0 t48 0" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
        </g>
      );

    case "yoga":
      return (
        <g>
          {/* rolled mat */}
          <rect x="86" y="112" width="148" height="112" rx="56" fill={W} />
          <ellipse cx="86" cy="168" rx="26" ry="56" fill={soft} />
          <ellipse cx="86" cy="168" rx="15" ry="33" fill={accent} opacity="0.75" />
          <ellipse cx="86" cy="168" rx="6" ry="14" fill={W} />
          {/* strap */}
          <rect x="176" y="106" width="18" height="124" rx="8" fill={accent} opacity="0.85" />
          {/* unrolled tail */}
          <path d="M234 216 q34 10 42 24 l-18 10 q-20 -14 -46 -18 z" fill={soft} />
        </g>
      );

    case "dumbbell":
      return (
        <g transform="rotate(-18 160 160)">
          {/* bar */}
          <rect x="112" y="150" width="96" height="20" rx="10" fill="#f1ead7" />
          <g stroke={accent} strokeWidth="3" opacity="0.6">
            {[126, 138, 150, 162, 174, 186, 198].map((x) => (
              <line key={x} x1={x} y1="152" x2={x} y2="168" />
            ))}
          </g>
          {/* inner plates */}
          <rect x="92" y="126" width="24" height="68" rx="11" fill={W} />
          <rect x="204" y="126" width="24" height="68" rx="11" fill={W} />
          {/* outer plates */}
          <rect x="62" y="112" width="34" height="96" rx="16" fill={W} />
          <rect x="224" y="112" width="34" height="96" rx="16" fill={W} />
          <rect x="62" y="112" width="34" height="96" rx="16" fill={accent} opacity="0.3" />
          <rect x="224" y="112" width="34" height="96" rx="16" fill={accent} opacity="0.3" />
        </g>
      );

    case "carrom":
      return (
        <g>
          {/* frame */}
          <rect x="62" y="62" width="196" height="196" rx="14" fill={W} />
          <rect x="62" y="62" width="196" height="196" rx="14" fill={accent} opacity="0.22" />
          {/* playing bed */}
          <rect x="84" y="84" width="152" height="152" rx="6" fill="#f6efdf" />
          {/* centre circle */}
          <circle cx="160" cy="160" r="30" fill="none" stroke={accent} strokeWidth="3" opacity="0.7" />
          <circle cx="160" cy="160" r="9" fill={accent} opacity="0.65" />
          {/* base lines */}
          <g stroke={accent} strokeWidth="2.4" opacity="0.45">
            <rect x="102" y="102" width="116" height="116" fill="none" />
          </g>
          {/* pockets */}
          {[
            [96, 96],
            [224, 96],
            [96, 224],
            [224, 224],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="13" fill="#26070c" opacity="0.78" />
          ))}
          {/* coins + striker */}
          <circle cx="146" cy="152" r="7" fill={accent} opacity="0.9" />
          <circle cx="172" cy="166" r="7" fill="#26070c" opacity="0.55" />
          <circle cx="160" cy="212" r="10" fill="#ffffff" stroke={accent} strokeWidth="2.5" />
        </g>
      );

    case "chess":
      return (
        <g>
          {/* king */}
          <path d="M152 60 h16 v14 h14 v16 h-14 v18 h-16 v-18 h-14 v-16 h14 z" fill={accent} opacity="0.9" />
          <path d="M138 112 q22 16 44 0 l10 26 q-32 16 -64 0 z" fill={W} />
          <path d="M146 140 q14 40 -6 74 h40 q-20 -34 -6 -74 z" fill={W} />
          <path d="M118 214 h84 q10 0 10 12 v10 h-104 v-10 q0 -12 10 -12 z" fill={W} />
          <rect x="104" y="238" width="112" height="20" rx="9" fill={W} />
          <rect x="104" y="238" width="112" height="20" rx="9" fill={accent} opacity="0.3" />
          {/* board hint */}
          <g opacity="0.3">
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={72 + i * 44} y="266" width="22" height="14" fill="#26070c" />
            ))}
          </g>
        </g>
      );

    case "dart":
      return (
        <g>
          <circle cx="150" cy="160" r="90" fill={W} />
          <circle cx="150" cy="160" r="90" fill={accent} opacity="0.16" />
          <circle cx="150" cy="160" r="68" fill="none" stroke={accent} strokeWidth="10" opacity="0.55" />
          <circle cx="150" cy="160" r="44" fill="none" stroke={accent} strokeWidth="10" opacity="0.75" />
          <circle cx="150" cy="160" r="22" fill={W} />
          <circle cx="150" cy="160" r="11" fill={accent} />
          {/* wedge dividers */}
          <g stroke={line} strokeWidth="2" opacity="0.5">
            {[0, 45, 90, 135].map((a) => (
              <g key={a} transform={`rotate(${a} 150 160)`}>
                <line x1="60" y1="160" x2="240" y2="160" />
              </g>
            ))}
          </g>
          {/* dart */}
          <g transform="rotate(38 196 116)">
            <rect x="188" y="60" width="10" height="58" rx="5" fill={accent} opacity="0.9" />
            <path d="M193 118 l8 26 h-16 z" fill="#f1ead7" />
            <path d="M188 60 l-14 -20 h34 z" fill={soft} />
          </g>
        </g>
      );

    case "grip":
      return (
        <g>
          {/* coiled grip roll */}
          <rect x="118" y="88" width="84" height="150" rx="42" fill={W} />
          <rect x="118" y="88" width="84" height="150" rx="42" fill={accent} opacity="0.25" />
          <g stroke={accent} strokeWidth="5" opacity="0.75">
            {[110, 128, 146, 164, 182, 200, 218].map((y) => (
              <path key={y} d={`M120 ${y} q40 14 80 -8`} fill="none" />
            ))}
          </g>
          <ellipse cx="160" cy="90" rx="42" ry="16" fill={soft} />
          <ellipse cx="160" cy="90" rx="22" ry="8" fill={accent} opacity="0.6" />
          {/* loose tail */}
          <path d="M202 214 q40 8 46 34 l-20 8 q-10 -22 -34 -26 z" fill={soft} />
        </g>
      );

    case "socks":
      return (
        <g>
          {/* cuff */}
          <rect x="112" y="70" width="80" height="40" rx="10" fill={soft} />
          <g stroke={accent} strokeWidth="4" opacity="0.8">
            <line x1="116" y1="82" x2="188" y2="82" />
            <line x1="116" y1="94" x2="188" y2="94" />
          </g>
          {/* leg + foot */}
          <path d="M112 108 h80 v92 q0 20 22 20 h34 q22 0 22 22 t-22 22 h-72 q-64 0 -64 -60 z" fill={W} />
          {/* heel + toe accents */}
          <path d="M192 200 q22 0 22 20 h-22 z" fill={accent} opacity="0.5" />
          <path d="M226 220 h22 q22 0 22 22 t-22 22 h-22 z" fill={accent} opacity="0.7" />
        </g>
      );

    case "cap":
      return (
        <g>
          {/* crown */}
          <path d="M84 194 a76 68 0 0 1 152 0 z" fill={W} />
          <path d="M84 194 a76 68 0 0 1 152 0 z" fill={accent} opacity="0.14" />
          {/* panel seams */}
          <g stroke={line} strokeWidth="2.4" fill="none">
            <path d="M160 126 v68" />
            <path d="M116 142 q26 32 0 52" />
            <path d="M204 142 q-26 32 0 52" />
          </g>
          <circle cx="160" cy="130" r="7" fill={accent} opacity="0.85" />
          {/* peak */}
          <path d="M82 194 h84 q-6 26 -50 30 h-44 q-8 -16 10 -30 z" fill={soft} />
          {/* band */}
          <rect x="84" y="190" width="152" height="10" rx="5" fill={accent} opacity="0.75" />
        </g>
      );

    case "bottle":
      return (
        <g>
          {/* body */}
          <rect x="116" y="112" width="88" height="152" rx="26" fill={W} />
          <rect x="116" y="112" width="88" height="152" rx="26" fill={accent} opacity="0.2" />
          {/* fill level */}
          <path d="M116 190 h88 v48 q0 26 -26 26 h-36 q-26 0 -26 -26 z" fill={accent} opacity="0.6" />
          {/* measurement ticks */}
          <g stroke={line} strokeWidth="2.4" strokeLinecap="round">
            <line x1="188" y1="140" x2="196" y2="140" />
            <line x1="188" y1="164" x2="196" y2="164" />
            <line x1="188" y1="188" x2="196" y2="188" />
          </g>
          {/* neck + cap */}
          <rect x="140" y="86" width="40" height="30" rx="8" fill={soft} />
          <rect x="132" y="62" width="56" height="30" rx="12" fill={accent} opacity="0.9" />
          <rect x="152" y="42" width="16" height="24" rx="8" fill={W} />
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
