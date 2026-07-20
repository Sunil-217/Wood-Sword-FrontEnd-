"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <Container className="pb-4">
      <div className="relative overflow-hidden rounded-3xl bg-brand-950 px-6 py-12 text-center text-white sm:px-10 sm:py-16">
        <div className="pitch-stripes pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-gold-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-lg">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Join the MM Sports dressing room
          </h2>
          <p className="mt-3 text-sm text-brand-100/70">
            Early access to new gear, restock alerts and members-only pricing.
            No spam — just cricket.
          </p>

          {done ? (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              You&apos;re in! Check your inbox.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setDone(true);
              }}
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white outline-none placeholder:text-brand-100/40 focus:border-gold-400/60"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink press transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </Container>
  );
}
