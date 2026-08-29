"use client";

import { useEffect, useState } from "react";

const promos = [
  "Free shipping on all India orders above ₹2000 · worldwide shipping available",
  "One stop shop for all your sporting requirements — Chromepet, Chennai",
  "Free knocking-in service on every English willow bat",
  "Open MON–SUN, 11:00 AM – 09:00 PM · WhatsApp +91 80561 26269",
];

const ROTATE_MS = 4500;

/**
 * One announcement at a time, rotating with a gentle vertical
 * crossfade — always readable, never clipped.
 */
export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((v) => (v + 1) % promos.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, [paused]);

  const prev = (index + promos.length - 1) % promos.length;

  return (
    <div
      className="border-b border-gold-500/15 bg-brand-950 text-brand-50"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* full list for screen readers, once */}
      <ul className="sr-only">
        {promos.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      {/* rotating message */}
      <div aria-hidden className="relative h-9 overflow-hidden">
        {promos.map((text, i) => {
          const state =
            i === index
              ? "translate-y-0 opacity-100"
              : i === prev
                ? "-translate-y-3 opacity-0"
                : "translate-y-3 opacity-0";
          return (
            <p
              key={text}
              className={`absolute inset-0 flex items-center justify-center gap-2 px-4 text-xs font-medium tracking-wide transition-all duration-500 [transition-timing-function:var(--ease-spring)] ${state}`}
            >
              <span className="shrink-0 text-[9px] text-gold-500">●</span>
              <span className="truncate text-brand-100/90">{text}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
}
