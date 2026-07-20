"use client";

import { useMemo, useState } from "react";
import { Rating } from "@/components/ui/Rating";
import { showToast } from "@/components/Toaster";
import { useReviews } from "@/context/ReviewsContext";
import type { Product } from "@/lib/types";

export function ProductReviews({ product }: { product: Product }) {
  const { getFor, addReview, ready } = useReviews();
  const userReviews = ready ? getFor(product.id) : [];

  // Blend the seeded base rating with real user reviews.
  const { avg, total } = useMemo(() => {
    const baseSum = product.rating * product.reviews;
    const userSum = userReviews.reduce((n, r) => n + r.rating, 0);
    const count = product.reviews + userReviews.length;
    return {
      avg: count ? Math.round(((baseSum + userSum) / count) * 10) / 10 : product.rating,
      total: count,
    };
  }, [product.rating, product.reviews, userReviews]);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [err, setErr] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (rating < 1) return setErr("Please pick a star rating.");
    if (!text.trim()) return setErr("Please write a few words.");
    addReview(product.id, { author, rating, text });
    setRating(0);
    setAuthor("");
    setText("");
    setErr(null);
    showToast("Thanks — your review is live!");
  }

  return (
    <section className="mt-20">
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
        Ratings &amp; reviews
      </h2>
      <div className="seam-stitch mt-3 w-16" aria-hidden />

      <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Summary + form */}
        <div>
          <div className="rounded-2xl border border-line/8 bg-surface p-6 text-center shadow-sm">
            <p className="font-display text-5xl font-extrabold text-ink">{avg.toFixed(1)}</p>
            <div className="mt-2 flex justify-center">
              <Rating value={avg} size="md" />
            </div>
            <p className="mt-1 text-sm text-muted/55">
              {total.toLocaleString("en-IN")} {total === 1 ? "rating" : "ratings"}
            </p>
          </div>

          <form onSubmit={submit} className="mt-4 rounded-2xl border border-line/8 bg-surface p-5 shadow-sm">
            <h3 className="font-display text-base font-bold text-ink">Write a review</h3>
            <div className="mt-3 flex gap-1" onMouseLeave={() => setHover(0)}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setRating(n);
                    setErr(null);
                  }}
                  onMouseEnter={() => setHover(n)}
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  className="press"
                >
                  <svg width="26" height="26" viewBox="0 0 20 20" fill={(hover || rating) >= n ? "#e0a82e" : "none"}>
                    <path
                      d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9l-4.94 2.6.94-5.5-4-3.9 5.53-.8z"
                      stroke="#e0a82e"
                      strokeWidth="1.2"
                    />
                  </svg>
                </button>
              ))}
            </div>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name (optional)"
              className="mt-3 w-full rounded-xl border border-line/15 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setErr(null);
              }}
              rows={3}
              placeholder="How was the gear?"
              className="mt-2 w-full resize-none rounded-xl border border-line/15 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
            {err && <p className="mt-1.5 text-xs text-ball-600">{err}</p>}
            <button
              type="submit"
              className="press mt-3 w-full rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              Submit review
            </button>
          </form>
        </div>

        {/* Review list */}
        <div>
          {userReviews.length === 0 ? (
            <div className="flex h-full min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-line/15 bg-white/60 p-8 text-center">
              <p className="font-display text-lg font-bold text-ink">Be the first to review</p>
              <p className="mt-1.5 max-w-xs text-sm text-muted/55">
                Bought this? Share your thoughts to help other cricketers choose.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {userReviews.map((r) => (
                <li key={r.id} className="rounded-2xl border border-line/8 bg-surface p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-900 text-sm font-bold text-white">
                        {(r.author || "A")[0].toUpperCase()}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink">{r.author}</p>
                        <p className="text-xs text-muted/45">
                          {new Date(r.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <Rating value={r.rating} />
                  </div>
                  {r.text && <p className="mt-3 text-sm leading-relaxed text-muted/75">{r.text}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
