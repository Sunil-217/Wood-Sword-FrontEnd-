import { ImageResponse } from "next/og";

export const alt = "MM Sports — Pro-grade cricket equipment";
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
            "radial-gradient(120% 100% at 50% -20%, #1a2a43 0%, #0b1524 60%)",
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
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: "#c11f2f",
              lineHeight: 1,
            }}
          >
            M
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, letterSpacing: -2 }}>
          <span>MM</span>
          <span style={{ color: "#c11f2f", marginLeft: 18 }}>SPORTS</span>
        </div>
        <div style={{ marginTop: 20, fontSize: 30, color: "#f0c14e" }}>
          Gear built to be played, not admired.
        </div>
        <div style={{ marginTop: 10, fontSize: 22, color: "rgba(255,255,255,0.6)" }}>
          Pro-grade cricket equipment · shipped across India
        </div>
      </div>
    ),
    { ...size },
  );
}
