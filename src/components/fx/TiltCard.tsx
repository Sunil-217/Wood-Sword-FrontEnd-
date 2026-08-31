"use client";

import { useRef } from "react";

/**
 * Mouse-tracking 3D tilt with a specular glare that follows the cursor.
 * Wrap any card in it; put grid/layout classes on this wrapper.
 * No-ops under prefers-reduced-motion and on touch-only devices.
 */
export function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  /** degrees */
  maxTilt?: number;
  style?: React.CSSProperties;
}) {
  const inner = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  function reduced() {
    return (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      if (inner.current) {
        const rx = (0.5 - py) * maxTilt;
        const ry = (px - 0.5) * maxTilt;
        inner.current.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(1.015)`;
      }
      if (glare.current) {
        glare.current.style.opacity = "1";
        glare.current.style.background = `radial-gradient(220px circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,0.22), transparent 65%)`;
      }
    });
  }

  function onLeave() {
    if (raf.current) {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    }
    if (inner.current) inner.current.style.transform = "";
    if (glare.current) glare.current.style.opacity = "0";
  }

  return (
    <div
      className={className}
      style={{ perspective: "900px", ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        ref={inner}
        className="relative h-full w-full transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d]"
      >
        {children}
        <div
          ref={glare}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300"
        />
      </div>
    </div>
  );
}
