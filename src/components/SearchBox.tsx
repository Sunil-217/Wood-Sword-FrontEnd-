"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { categoryMap, groupMap, products } from "@/lib/catalog";
import { inr } from "@/lib/format";
import { ProductArt } from "./ProductArt";

export function SearchBox({
  variant = "desktop",
  onNavigate,
}: {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return products
      .filter((p) => {
        const hay = `${p.name} ${p.brand} ${categoryMap[p.category].name} ${groupMap[categoryMap[p.category].group].name}`.toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 6);
  }, [query]);

  // close on outside click
  useEffect(() => {
    function onDown(e: PointerEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    setActive(-1);
    onNavigate?.();
    router.push(href);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (active >= 0 && suggestions[active]) {
      go(`/product/${suggestions[active].slug}`);
      return;
    }
    go(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const showPanel = open && query.trim().length >= 2;

  return (
    <div ref={boxRef} className={`relative ${variant === "mobile" ? "w-full" : ""}`}>
      <form onSubmit={submit}>
        <div className="flex items-center rounded-full bg-subtle ring-1 ring-line/5 focus-within:ring-brand-500/40">
          <span className="pl-3 text-muted/40">
            <SearchIcon />
          </span>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActive(-1);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder="Search gear…"
            aria-label="Search products"
            className={`bg-transparent px-2 text-sm outline-none placeholder:text-muted/40 ${
              variant === "mobile" ? "w-full py-2.5" : "w-40 py-2 lg:w-52"
            }`}
          />
        </div>
      </form>

      {showPanel && (
        <div
          className={`absolute z-50 mt-2 overflow-hidden rounded-2xl border border-line/10 bg-surface shadow-xl shadow-brand-900/10 ${
            variant === "mobile" ? "inset-x-0" : "right-0 w-80"
          }`}
        >
          {suggestions.length > 0 ? (
            <ul className="max-h-[60vh] overflow-y-auto p-1.5">
              {suggestions.map((p, i) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(`/product/${p.slug}`)}
                    className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors ${
                      i === active ? "bg-subtle" : "hover:bg-subtle"
                    }`}
                  >
                    <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-line/8">
                      <ProductArt art={p.art} accent={p.accent} label={p.name} className="h-full w-full" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{p.name}</span>
                      <span className="block truncate text-xs text-muted/50">
                        {categoryMap[p.category].name}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-ink">{inr(p.price)}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-4 text-sm text-muted/55">
              No matches for “{query.trim()}”.
            </p>
          )}
          <button
            type="button"
            onClick={() => go(`/shop?q=${encodeURIComponent(query.trim())}`)}
            className="flex w-full items-center justify-between border-t border-line/8 bg-brand-50/50 px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-subtle"
          >
            See all results for “{query.trim()}”
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
