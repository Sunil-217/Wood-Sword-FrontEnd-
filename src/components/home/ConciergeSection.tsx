"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProductArt } from "@/components/ProductArt";
import { answer, samplePrompts } from "@/lib/concierge";
import { categoryMap } from "@/lib/catalog";
import { inr } from "@/lib/format";

/**
 * Oneup Assist — the catalog parser from lib/concierge given a full-width
 * home for itself. Type a budget, a sport and a product type and it answers
 * from stock. Results are real products; nothing here is generated prose.
 */
export function ConciergeSection() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const prompts = useMemo(() => samplePrompts(), []);
  const result = useMemo(
    () => (submitted.trim() ? answer(submitted) : null),
    [submitted],
  );

  function run(q: string) {
    setQuery(q);
    setSubmitted(q);
  }

  return (
    <section
      aria-labelledby="assist-heading"
      className="grain relative overflow-hidden border-y border-line/10 bg-brand-950 text-white"
    >
      <Container className="relative py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Pitch */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
              Oneup Assist
            </p>
            <h2
              id="assist-heading"
              className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight"
            >
              Tell it what
              <br />
              <span className="bg-gradient-to-r from-brand-400 to-gold-500 bg-clip-text text-transparent">
                you play.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
              Describe the sport, the kit and your budget in a sentence. It
              reads all three and answers from what&apos;s actually on the
              shelf — no results it can&apos;t back with stock.
            </p>
          </div>

          {/* Console */}
          <div className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10 backdrop-blur sm:p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(query);
              }}
            >
              <label
                htmlFor="assist-input"
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40"
              >
                What are you looking for?
              </label>
              <div className="mt-3 flex gap-2">
                <input
                  id="assist-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Badminton racquet under ₹5,000"
                  className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25"
                />
                <button
                  type="submit"
                  className="press shrink-0 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25"
                >
                  Ask
                </button>
              </div>
            </form>

            {/* Starter prompts */}
            <div className="mt-4 flex flex-wrap gap-2">
              {prompts.map((p) => (
                <button
                  key={p}
                  onClick={() => run(p)}
                  className="press rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/65 ring-1 ring-white/10 transition-colors duration-[--duration-fast] hover:bg-white/12 hover:text-white"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Answer */}
            {result && (
              <div className="mt-6 border-t border-white/10 pt-5" aria-live="polite">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-400">
                  {result.summary}
                </p>

                {result.products.length > 0 ? (
                  <>
                    <ul className="mt-4 space-y-2">
                      {result.products.slice(0, 4).map((p) => (
                        <li key={p.id}>
                          <Link
                            href={`/product/${p.slug}`}
                            className="flex items-center gap-3 rounded-xl p-2 transition-colors duration-[--duration-fast] hover:bg-white/6"
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
                              <span className="block truncate text-[11px] font-semibold uppercase tracking-wide text-white/45">
                                {p.brand} · {categoryMap[p.category].name}
                              </span>
                              <span className="block truncate text-sm text-white/90">
                                {p.name}
                              </span>
                            </span>
                            <span className="shrink-0 font-display text-sm font-bold tabular-nums text-white">
                              {inr(p.price)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {result.href && (
                      <Link
                        href={result.href}
                        className="press mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors duration-[--duration-fast] hover:bg-white/20"
                      >
                        See all in shop
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    )}
                  </>
                ) : (
                  <p className="mt-3 text-sm text-white/55">
                    Try naming a sport, a type of kit, or a budget.
                  </p>
                )}
              </div>
            )}

            <p className="mt-5 text-[11px] leading-relaxed text-white/35">
              Matching runs in your browser against the Oneup catalog. It reads
              budget, sport and product type — it isn&apos;t a language model,
              and it won&apos;t suggest anything the store doesn&apos;t stock.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
