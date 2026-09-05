"use client";

/**
 * Last line of defence: a throw inside the root layout (or one of the context
 * providers it mounts) never reaches app/error.tsx, because that boundary is
 * rendered by the layout that failed. Without this the shopper gets Next's
 * unstyled default screen with no way back to the store.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf7f5",
          color: "#26070c",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <main style={{ maxWidth: 420, padding: 24, textAlign: "center" }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#b92b22",
              margin: 0,
            }}
          >
            Oneup Sports
          </p>
          <h1 style={{ fontSize: 26, margin: "12px 0 0", lineHeight: 1.2 }}>
            Something broke on our side
          </h1>
          <p style={{ margin: "10px 0 0", fontSize: 14, opacity: 0.7 }}>
            The page couldn&apos;t load. Nothing in your bag has been lost.
          </p>
          {error.digest && (
            <p style={{ margin: "10px 0 0", fontSize: 12, opacity: 0.45 }}>
              Reference: {error.digest}
            </p>
          )}
          <div
            style={{
              marginTop: 22,
              display: "flex",
              gap: 10,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={reset}
              style={{
                minHeight: 44,
                padding: "0 22px",
                borderRadius: 999,
                border: 0,
                background: "#26070c",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* A hard navigation on purpose: this boundary only renders when
                the root layout itself failed, so the client router is exactly
                what should not be trusted to get the shopper home. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                minHeight: 44,
                display: "inline-flex",
                alignItems: "center",
                padding: "0 22px",
                borderRadius: 999,
                border: "1px solid rgba(38,7,12,0.18)",
                color: "#26070c",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
