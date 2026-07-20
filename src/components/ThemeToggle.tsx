"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    const theme = next ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("mmsports-theme", theme);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="press relative inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-subtle"
    >
      {/* avoid an icon flash before we know the theme */}
      <span className={mounted ? "" : "opacity-0"}>
        {dark ? (
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4.2" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
              <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
            </g>
          </svg>
        ) : (
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 14.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 14.5z"
              fill="currentColor"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
