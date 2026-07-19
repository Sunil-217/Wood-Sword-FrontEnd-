"use client";

import { useEffect, useRef } from "react";

/**
 * Pointer-tracking parallax container.
 * Children opt in with `data-depth="0.4"` — higher = moves more.
 * Motion is lerped on requestAnimationFrame for buttery response,
 * disabled for touch devices and reduced-motion users.
 */
export function ParallaxScene({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const layers = Array.from(
      el.querySelectorAll<HTMLElement>("[data-depth]"),
    ).map((node) => ({ node, depth: parseFloat(node.dataset.depth || "0") }));
    if (layers.length === 0) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;
    let running = false;

    function tick() {
      // critically-damped-ish lerp
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      for (const { node, depth } of layers) {
        node.style.transform = `translate3d(${(curX * depth).toFixed(2)}px, ${(curY * depth).toFixed(2)}px, 0)`;
      }
      if (Math.abs(targetX - curX) + Math.abs(targetY - curY) > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    }

    function kick() {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    }

    function onMove(e: PointerEvent) {
      const r = el!.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5;
      targetX = nx * 26;
      targetY = ny * 18;
      kick();
    }

    function onLeave() {
      targetX = 0;
      targetY = 0;
      kick();
    }

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
