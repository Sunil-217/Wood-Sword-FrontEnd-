import { ImageResponse } from "next/og";

export const alt = "Oneup Sports — One stop shop for all your sporting requirements";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background:
            "radial-gradient(120% 100% at 50% -20%, #5a121b 0%, #26070c 60%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* shield mark */}
        <div
          style={{
            display: "flex",
            width: 150,
            height: 165,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 28,
            background: "#ffffff",
            marginBottom: 40,
          }}
        >
          <svg width="110" height="110" viewBox="0 0 120 120">
            <path
              d="M22 92 q38 20 76 0"
              fill="none"
              stroke="#f0c14e"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M26 60 L60 24 L94 60 M60 28 V84"
              fill="none"
              stroke="#e0342a"
              strokeWidth="16"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, letterSpacing: -2 }}>
          <span>ONEUP</span>
          <span style={{ color: "#ff8375", marginLeft: 18 }}>SPORTS</span>
        </div>
        <div style={{ marginTop: 20, fontSize: 30, color: "#f0c14e" }}>
          One stop shop for all your sporting requirements.
        </div>
        <div style={{ marginTop: 10, fontSize: 22, color: "rgba(255,255,255,0.6)" }}>
          Cricket · Badminton · Football · Fitness · Chennai
        </div>
      </div>
    ),
    { ...size },
  );
}
