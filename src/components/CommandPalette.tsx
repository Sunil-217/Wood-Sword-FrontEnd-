"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProductArt } from "@/components/ProductArt";
import { answer, samplePrompts } from "@/lib/concierge";
import { categoryMap, groups } from "@/lib/catalog";
import { useCatalog } from "@/context/CatalogContext";
import { inr } from "@/lib/format";

const RECENT_KEY = "oneup-recent-searches";
const MAX_RECENT = 5;

/**
 * Command palette. Opens on Ctrl/Cmd+K or "/" and answers in one of two
 * ways: matching sports, or matching products via the catalog parser in
 * lib/concierge. Every result is a real catalog entry.
 */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // The trigger unmounts while the dialog is open, so focus has to go back
  // once it returns rather than at the moment of closing.
  const restoreFocus = useRef(false);

  const prompts = useMemo(() => samplePrompts(), []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const openPalette = useCallback(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      setRecent(raw ? JSON.parse(raw) : []);
    } catch {
      /* storage unavailable — recents are optional */
    }
    restoreFocus.current = true;
    setOpen(true);
  }, []);

  useEffect(() => {
    if (open || !restoreFocus.current) return;
    restoreFocus.current = false;
    triggerRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusable = [
        ...root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement;
      if (e.shiftKey && (activeEl === first || !root.contains(activeEl))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* ---- open / close shortcuts ---- */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement | null;
      const typing =
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable);

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else openPalette();
        return;
      }
      if (e.key === "/" && !typing) {
        e.preventDefault();
        openPalette();
        return;
      }
      if (e.key === "Escape" && open) close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, openPalette]);

  /* ---- focus and scroll lock ---- */
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function remember(q: string) {
    const next = [q, ...recent.filter((r) => r !== q)].slice(0, MAX_RECENT);
    setRecent(next);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  function go(href: string, q?: string) {
    if (q) remember(q);
    close();
    router.push(href);
  }

  const { products: liveCatalog } = useCatalog();
  const result = useMemo(
    () => (query.trim() ? answer(query, liveCatalog) : null),
    [query, liveCatalog],
  );
  const sportHits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return groups.filter((g) => g.name.toLowerCase().includes(q)).slice(0, 4);
  }, [query]);

  /** Sports first, then products — the order they're rendered in. */
  const options = useMemo(
    () => [
      ...sportHits.map((g) => ({
        key: `sport-${g.slug}`,
        href: `/shop?group=${g.slug}`,
        label: g.name,
      })),
      ...(result?.products ?? []).map((p) => ({
        key: `product-${p.id}`,
        href: `/product/${p.slug}`,
        label: p.name,
      })),
    ],
    [sportHits, result],
  );

  // A new query invalidates the old highlight position.
  useEffect(() => {
    setActive(0);
  }, [query]);

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (options.length === 0) {
      if (e.key === "Enter" && result?.href) go(result.href, query);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(options.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[active];
      if (opt) go(opt.href, query);
    }
  }

  const activeId = options[active]?.key;

  /* ---- trigger button (in the header) ---- */
  if (!open) {
    return (
      <button
        ref={triggerRef}
        onClick={openPalette}
        aria-label="Search products and sports"
        aria-keyshortcuts="Control+K"
        className="press group flex min-h-11 items-center gap-2 rounded-full bg-subtle py-2 pl-3.5 pr-2 text-sm text-muted/60 ring-1 ring-line/10 transition-colors duration-[--duration-fast] hover:bg-brand-100 hover:text-ink md:w-64"
      >
        <SearchIcon />
        <span className="hidden flex-1 text-left md:block">Search gear…</span>
        <kbd className="hidden rounded border border-line/15 bg-surface px-1.5 py-0.5 font-sans text-[10px] font-semibold text-muted/50 md:block">
          Ctrl K
        </kbd>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[10vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div
        className="absolute inset-0 bg-brand-950/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden
      />

      <div
        ref={dialogRef}
        className="animate-toast-in relative flex max-h-[76vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-surface shadow-2xl ring-1 ring-line/10"
      >
        {/* Prompt line */}
        <div className="flex items-center gap-3 border-b border-line/8 px-4 py-3.5">
          <span className="text-accent" aria-hidden>
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            maxLength={120}
            placeholder="What are you looking for?"
            role="combobox"
            aria-expanded={options.length > 0}
            aria-controls="search-listbox"
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            aria-label="Search products, sports and brands"
            className="flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted/40"
          />
          <button
            onClick={close}
            aria-label="Close search"
            className="press rounded-full p-1.5 text-muted/50 hover:bg-subtle hover:text-ink"
          >
            <CloseIcon />
          </button>
        </div>

        <p aria-live="polite" className="sr-only">
          {query.trim()
            ? options.length > 0
              ? `${options.length} result${options.length === 1 ? "" : "s"}`
              : "No results"
            : ""}
        </p>

        <div
          id="search-listbox"
          role={options.length > 0 ? "listbox" : undefined}
          aria-label="Search results"
          className="overflow-y-auto p-3"
        >
          {!query.trim() ? (
            <>
              {recent.length > 0 && (
                <Section title="Recent">
                  {recent.map((r) => (
                    <Row key={r} onClick={() => setQuery(r)}>
                      {r}
                    </Row>
                  ))}
                </Section>
              )}
              <Section title="Ask Oneup">
                {prompts.map((p) => (
                  <Row key={p} onClick={() => setQuery(p)}>
                    {p}
                  </Row>
                ))}
              </Section>
              <Section title="Sports">
                <div className="flex flex-wrap gap-1.5 px-1 pb-1">
                  {groups.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/shop?group=${g.slug}`}
                      onClick={close}
                      className="rounded-full bg-subtle px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-line/8 transition-colors duration-[--duration-fast] hover:bg-brand-100"
                    >
                      {g.name}
                    </Link>
                  ))}
                </div>
              </Section>
            </>
          ) : (
            <>
              {sportHits.length > 0 && (
                <Section title="Sports">
                  {sportHits.map((g) => (
                    <Row
                      key={g.slug}
                      id={`sport-${g.slug}`}
                      highlighted={activeId === `sport-${g.slug}`}
                      onClick={() => go(`/shop?group=${g.slug}`, query)}
                    >
                      {g.name}
                    </Row>
                  ))}
                </Section>
              )}

              {result && result.products.length === 0 ? (
                // The "nothing matched" line is the most important thing the
                // palette says, so it is set as readable prose rather than as
                // a faint all-caps section label.
                <div className="px-3 py-8 text-center">
                  <p className="text-sm font-medium text-ink">
                    {result.summary || "No results"}
                  </p>
                  <p className="mt-1.5 text-sm text-muted/55">
                    Try a different sport, product type or budget.
                  </p>
                </div>
              ) : result ? (
                <Section title={result.summary || "Results"}>
                  {(
                    <ul>
                      {result.products.map((p) => (
                        <li key={p.id}>
                          <button
                            id={`product-${p.id}`}
                            role="option"
                            aria-selected={activeId === `product-${p.id}`}
                            onClick={() => go(`/product/${p.slug}`, query)}
                            className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors duration-[--duration-fast] ${
                              activeId === `product-${p.id}`
                                ? "bg-brand-100 ring-1 ring-brand-500/30"
                                : "hover:bg-subtle"
                            }`}
                          >
                            <ProductArt
                              art={p.art}
                              accent={p.accent}
                              image={p.image}
                              label={p.name}
                              sizes="56px"
                              className="h-12 w-12 shrink-0 overflow-hidden rounded-lg"
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[11px] font-semibold uppercase tracking-wide text-accent">
                                {p.brand} · {categoryMap[p.category].name}
                              </span>
                              <span className="block truncate text-sm font-medium text-ink">
                                {p.name}
                              </span>
                            </span>
                            <span className="shrink-0 font-display text-sm font-bold text-ink">
                              {inr(p.price)}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {result.href && result.products.length > 0 && (
                    <button
                      onClick={() => go(result.href!, query)}
                      className="press mt-2 w-full rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      See all in shop
                    </button>
                  )}
                </Section>
              ) : null}
            </>
          )}
        </div>

        <p className="border-t border-line/8 px-4 py-2.5 text-[11px] text-muted/45">
          Results come from the Oneup catalog — budget, sport and product type
          are read from what you type.
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3 last:mb-0">
      <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted/45">
        {title}
      </p>
      {children}
    </div>
  );
}

function Row({
  children,
  onClick,
  id,
  highlighted,
}: {
  children: React.ReactNode;
  onClick: () => void;
  id?: string;
  highlighted?: boolean;
}) {
  return (
    <button
      id={id}
      role={id ? "option" : undefined}
      aria-selected={id ? !!highlighted : undefined}
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-ink transition-colors duration-[--duration-fast] ${
        highlighted ? "bg-brand-100 ring-1 ring-brand-500/30" : "hover:bg-subtle"
      }`}
    >
      <span className="text-muted/35" aria-hidden>
        <ArrowIcon />
      </span>
      {children}
    </button>
  );
}

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
