"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `value` when scrolled into view.
 * Ease-out curve, ~1.4s; reduced-motion users see the final value instantly.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => (0).toFixed(decimals));
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value.toFixed(decimals));
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();

        const duration = 1400;
        const start = performance.now();
        function frame(now: number) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4); // ease-out-quart
          setDisplay((value * eased).toFixed(decimals));
          if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, decimals]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
