"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const EVENT = "ws:toast";

/** Fire a toast from anywhere on the client. */
export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: message }));
}

interface Toast {
  id: number;
  message: string;
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    function onToast(e: Event) {
      const message = (e as CustomEvent<string>).detail;
      const id = nextId.current++;
      setToasts((t) => [...t.slice(-2), { id, message }]);
      window.setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, 2600);
    }
    window.addEventListener(EVENT, onToast);
    return () => window.removeEventListener(EVENT, onToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-5 z-[80] flex flex-col items-center gap-2 px-4 sm:items-end sm:pr-20"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-toast-in pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl bg-brand-950 py-3 pl-4 pr-3 text-white shadow-2xl shadow-brand-950/30 ring-1 ring-white/10"
        >
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12.5l4.5 4.5L19 7"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="flex-1 truncate text-sm font-medium">{t.message}</p>
          <Link
            href="/cart"
            className="shrink-0 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-gold-300 transition-colors hover:bg-white/20"
          >
            View bag
          </Link>
        </div>
      ))}
    </div>
  );
}
