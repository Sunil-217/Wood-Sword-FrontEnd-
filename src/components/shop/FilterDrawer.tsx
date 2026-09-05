"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Bottom-sheet wrapper for the filter panel on touch layouts.
 *
 * Filters are URL links, so a tap applies immediately and the results
 * behind the sheet are already correct — which is why the primary action
 * reads "View results" rather than "Apply". Calling it Apply would imply
 * nothing had happened yet.
 *
 * Handles the dialog contract: focus moves in, Tab is trapped, Escape
 * closes, focus returns to whatever opened it, and the background can't
 * be scrolled.
 */
export function FilterDrawer({
  open,
  onClose,
  activeCount,
  resultCount,
  clearHref,
  children,
}: {
  open: boolean;
  onClose: () => void;
  activeCount: number;
  resultCount: number;
  clearHref: string;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const focusables = useCallback(() => {
    const root = panelRef.current;
    if (!root) return [] as HTMLElement[];
    return [
      ...root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((el) => el.offsetParent !== null);
  }, []);

  useEffect(() => {
    if (!open) return;

    openerRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus in without stealing it from a control the user just used.
    const first = focusables()[0];
    first?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      if (e.shiftKey && document.activeElement === firstItem) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        firstItem.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      openerRef.current?.focus();
    };
  }, [open, onClose, focusables]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] lg:hidden">
      <div
        className="absolute inset-0 bg-brand-950/55 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className="animate-toast-in absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-3xl bg-surface shadow-2xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line/8 px-5 py-4">
          <h2 className="font-display text-base font-bold text-ink">
            Filters
            {activeCount > 0 && (
              <span className="ml-2 rounded-full bg-brand-500 px-2 py-0.5 text-[11px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="press inline-flex h-11 w-11 items-center justify-center rounded-full text-muted/55 hover:bg-subtle hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
          {children}
        </div>

        <div className="flex items-center gap-3 border-t border-line/8 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a
            href={clearHref}
            className="press inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-line/15 px-5 text-sm font-semibold text-ink"
          >
            Clear all
          </a>
          <button
            onClick={onClose}
            className="press inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-brand-500 px-5 text-sm font-semibold text-white"
          >
            View {resultCount} {resultCount === 1 ? "result" : "results"}
          </button>
        </div>
      </div>
    </div>
  );
}
