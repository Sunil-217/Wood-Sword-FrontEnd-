import { ImageResponse } from "next/og";

export const alt = "Oneup Sports — One stop shop for all your sporting requirements";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RED = "#e8232a";
const ORANGE = "#f2641c";
const BG = "#1a0509";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BG,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* wordmark — "—ONEup" with a seam-cut ball O */}
        <svg width="655" height="210" viewBox="0 0 262 84">
          <rect x="0" y="37" width="18" height="10" rx="2" fill={RED} />
          <circle cx="62" cy="42" r="34" fill={RED} />
          <path d="M20 72 L80 12" stroke={BG} strokeWidth="5" />
          <path d="M40 76 L98 18" stroke={BG} strokeWidth="5" />
          <path d="M101 76 L107 8 H120 L114 76 Z" fill={RED} />
          <path d="M107 8 H120 L151 76 H138 Z" fill={RED} />
          <path d="M138 76 L144 8 H157 L151 76 Z" fill={RED} />
          <path d="M165 76 L171 8 H183 L177 76 Z" fill={ORANGE} />
          <path d="M171 8 H207 L206 20 H170 Z" fill={ORANGE} />
          <path d="M169 37 H200 L199 48 H168 Z" fill={ORANGE} />
          <path d="M166 64 H204 L203 76 H165 Z" fill={ORANGE} />
          <path
            d="M216 6 V18.5 A7.5 7.5 0 0 0 231 18.5 V6"
            stroke={ORANGE}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M242 6 V40" stroke={ORANGE} strokeWidth="6" strokeLinecap="round" />
          <circle cx="250" cy="15" r="8" stroke={ORANGE} strokeWidth="5.5" fill="none" />
        </svg>
        <div style={{ marginTop: 34, fontSize: 34, fontWeight: 700, color: "#f0c14e" }}>
          One stop shop for all your sporting requirements.
        </div>
        <div style={{ marginTop: 14, fontSize: 23, color: "rgba(255,255,255,0.62)" }}>
          Cricket · Badminton · Football · Fitness · Chennai
        </div>
      </div>
    ),
    { ...size },
  );
}
