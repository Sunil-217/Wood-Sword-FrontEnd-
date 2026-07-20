"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "mmsports-reviews-v1";

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1-5
  text: string;
  createdAt: string; // ISO
}

export interface NewReviewInput {
  author: string;
  rating: number;
  text: string;
}

interface ReviewsApi {
  ready: boolean;
  getFor: (productId: string) => Review[];
  addReview: (productId: string, input: NewReviewInput) => void;
}

const ReviewsContext = createContext<ReviewsApi | null>(null);

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setReviews(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      /* ignore */
    }
  }, [reviews, ready]);

  const getFor = useCallback(
    (productId: string) =>
      reviews
        .filter((r) => r.productId === productId)
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    [reviews],
  );

  const addReview = useCallback((productId: string, input: NewReviewInput) => {
    const review: Review = {
      id: `rv-${Math.floor(100000 + Math.random() * 900000)}`,
      productId,
      author: input.author.trim() || "Anonymous",
      rating: Math.min(5, Math.max(1, Math.round(input.rating))),
      text: input.text.trim(),
      createdAt: new Date().toISOString(),
    };
    setReviews((prev) => [review, ...prev]);
  }, []);

  const value = useMemo<ReviewsApi>(
    () => ({ ready, getFor, addReview }),
    [ready, getFor, addReview],
  );

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}

export function useReviews(): ReviewsApi {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error("useReviews must be used within <ReviewsProvider>");
  return ctx;
}
