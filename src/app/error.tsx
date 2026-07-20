"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Container } from "@/components/ui/Container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface for observability tooling; replace with a reporter in prod.
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-center justify-center py-28 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ball-500/10 text-ball-500">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path d="M12 8v5M12 16.5v.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M10.3 3.8 2.9 17a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="mt-5 font-display text-2xl font-bold text-ink">
        That one caught the edge
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted/55">
        Something went wrong loading this page. It&apos;s us, not you — try
        again, or head back to the gear.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={reset}
          className="press rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          Try again
        </button>
        <Link
          href="/"
          className="press rounded-full border border-line/15 bg-surface px-5 py-2.5 text-sm font-semibold text-ink hover:bg-subtle"
        >
          Go home
        </Link>
      </div>
    </Container>
  );
}
