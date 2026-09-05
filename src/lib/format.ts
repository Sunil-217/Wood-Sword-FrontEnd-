/** Format a number as Indian Rupees, e.g. 12499 -> "₹12,499". */
export function inr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Percentage saved when there is an MRP above the selling price. */
export function discountPct(price: number, mrp?: number): number | null {
  if (!mrp || mrp <= price) return null;
  const pct = Math.round(((mrp - price) / mrp) * 100);
  // A saving that rounds down to nothing gets no badge.
  return pct >= 1 ? pct : null;
}
