/**
 * Horizontal checkout progress: 01 CART → 02 ADDRESS → 03 PAYMENT →
 * 04 CONFIRMATION. Purely presentational; the page owns which step is live.
 */
const STEPS = ["Cart", "Address", "Payment", "Confirmation"] as const;

export function CheckoutSteps({ current }: { current: 1 | 2 | 3 | 4 }) {
  return (
    <nav aria-label="Checkout progress" className="mt-6">
      <ol className="flex items-center gap-2 sm:gap-3">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          return (
            <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3">
              <span className="flex min-w-0 items-center gap-2">
                <span
                  aria-hidden
                  className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold tabular-nums transition-colors duration-[--duration-normal] ${
                    active
                      ? "bg-brand-500 text-white"
                      : done
                        ? "bg-brand-500/15 text-accent"
                        : "bg-subtle text-muted/45"
                  }`}
                >
                  {done ? "✓" : String(n).padStart(2, "0")}
                </span>
                <span
                  className={`truncate text-[11px] font-semibold uppercase tracking-wider transition-colors duration-[--duration-normal] sm:text-xs ${
                    active ? "text-ink" : "text-muted/45"
                  }`}
                >
                  {label}
                  {active && <span className="sr-only"> (current step)</span>}
                </span>
              </span>
              {n < STEPS.length && (
                <span
                  aria-hidden
                  className="h-px flex-1 origin-left bg-line/15"
                >
                  <span
                    className={`block h-px origin-left transition-transform duration-[--duration-slow] ease-[--ease-emphasized] ${
                      done ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={{
                      background:
                        "linear-gradient(90deg, var(--color-brand-500), var(--color-gold-500))",
                    }}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
