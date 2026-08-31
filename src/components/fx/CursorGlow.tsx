"use client";

import { useEffect, useRef } from "react";

/**
 * A soft brand-red glow that follows the cursor across the parent
 * section (the parent must be position:relative). Fades out on leave.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.opacity = "1";
          el.style.background = `radial-gradient(420px circle at ${x}px ${y}px, rgba(232,35,42,0.14), transparent 70%)`;
        });
      }
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500"
    />
  );
}
