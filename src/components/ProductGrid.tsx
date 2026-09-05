import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  /**
   * Give the first product a 2x2 footprint. Use it where the set is curated
   * or freshly browsed — not while someone is comparing filtered results,
   * where a uniform grid is easier to scan.
   */
  spotlight = false,
}: {
  products: Product[];
  spotlight?: boolean;
}) {
  // A hero only reads as deliberate when there's a grid behind it.
  const hero = spotlight && products.length >= 5;

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {products.map((p, i) => (
        <div
          key={p.id}
          className={
            hero && i === 0 ? "col-span-2 row-span-2 md:col-span-2" : undefined
          }
        >
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
