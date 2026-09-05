/**
 * Loading placeholders shaped like the content they stand in for, so nothing
 * shifts when the real thing arrives. Marked aria-hidden with a polite live
 * message on the wrapper — a screen reader hears "Loading", not a shape.
 */
function Bar({ className = "" }: { className?: string }) {
  return <span className={`skeleton block rounded ${className}`} aria-hidden />;
}

function Wrap({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div role="status" aria-busy="true" aria-live="polite" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

/** Matches ProductCard: square art, brand line, two title lines, price row. */
export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line/8 bg-surface">
      <Bar className="aspect-square w-full rounded-none" />
      <div className="space-y-2 p-3 sm:p-4">
        <Bar className="h-2.5 w-1/3" />
        <Bar className="h-3.5 w-full" />
        <Bar className="h-3.5 w-2/3" />
        <div className="flex items-center justify-between pt-2">
          <Bar className="h-4 w-20" />
          <Bar className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <Wrap label="Loading products">
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </Wrap>
  );
}

/** Matches the product page: gallery left, purchase panel right. */
export function ProductDetailSkeleton() {
  return (
    <Wrap label="Loading product" className="grid gap-8 lg:grid-cols-2 lg:gap-14">
      <Bar className="aspect-square w-full rounded-3xl" />
      <div className="space-y-4">
        <Bar className="h-2.5 w-1/4" />
        <Bar className="h-9 w-3/4" />
        <Bar className="h-9 w-1/2" />
        <Bar className="h-6 w-32" />
        <div className="space-y-2 pt-4">
          <Bar className="h-2.5 w-16" />
          <div className="flex gap-2">
            <Bar className="h-11 w-24 rounded-full" />
            <Bar className="h-11 w-24 rounded-full" />
            <Bar className="h-11 w-24 rounded-full" />
          </div>
        </div>
        <Bar className="h-14 w-full rounded-full" />
        <div className="space-y-3 pt-4">
          <Bar className="h-12 w-full" />
          <Bar className="h-12 w-full" />
          <Bar className="h-12 w-full" />
        </div>
      </div>
    </Wrap>
  );
}

/** Matches an order summary card. */
export function OrderCardSkeleton() {
  return (
    <div className="rounded-2xl border border-line/8 bg-surface p-5">
      <div className="flex items-center justify-between">
        <Bar className="h-4 w-32" />
        <Bar className="h-4 w-20" />
      </div>
      <div className="mt-4 flex gap-3">
        <Bar className="h-12 w-12 rounded-lg" />
        <Bar className="h-12 w-12 rounded-lg" />
        <Bar className="h-12 w-12 rounded-lg" />
      </div>
      <Bar className="mt-4 h-4 w-24" />
    </div>
  );
}

export function OrderListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <Wrap label="Loading orders" className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <OrderCardSkeleton key={i} />
      ))}
    </Wrap>
  );
}

/** Matches the order detail layout: items list beside a totals panel. */
export function OrderDetailSkeleton() {
  return (
    <Wrap label="Loading order" className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        <Bar className="h-8 w-52" />
        <Bar className="h-4 w-32" />
        <div className="mt-6 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4 rounded-2xl border border-line/8 p-4">
              <Bar className="h-20 w-20 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Bar className="h-3 w-1/4" />
                <Bar className="h-4 w-2/3" />
                <Bar className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Bar className="h-72 w-full rounded-2xl" />
    </Wrap>
  );
}

/** Line items beside the totals panel, as the cart and checkout lay them out. */
export function CartSkeleton() {
  return (
    <Wrap label="Loading your bag" className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 rounded-2xl border border-line/8 bg-surface p-4 shadow-sm"
          >
            <Bar className="h-24 w-24 shrink-0 rounded-xl" />
            <div className="flex-1 space-y-2 py-1">
              <Bar className="h-3 w-20 rounded-full" />
              <Bar className="h-4 w-3/5 rounded-full" />
              <Bar className="h-4 w-24 rounded-full" />
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-3 rounded-2xl border border-line/8 bg-surface p-6 shadow-sm">
        <Bar className="h-4 w-28 rounded-full" />
        <Bar className="h-3 w-full rounded-full" />
        <Bar className="h-3 w-4/5 rounded-full" />
        <Bar className="mt-4 h-12 w-full rounded-full" />
      </div>
    </Wrap>
  );
}

/** Profile card beside the account summary links. */
export function AccountSkeleton() {
  return (
    <Wrap label="Loading your account" className="grid gap-8 lg:grid-cols-[1fr_300px]">
      <div className="space-y-4 rounded-2xl border border-line/8 bg-surface p-6 shadow-sm sm:p-8">
        <Bar className="h-5 w-24 rounded-full" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <Bar className="h-3 w-20 rounded-full" />
            <Bar className="h-12 w-full rounded-xl" />
          </div>
        ))}
        <Bar className="mt-2 h-12 w-40 rounded-full" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Bar key={i} className="h-16 w-full rounded-2xl" />
        ))}
      </div>
    </Wrap>
  );
}
