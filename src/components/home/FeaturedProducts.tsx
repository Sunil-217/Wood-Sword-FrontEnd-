"use client";

import { useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/ProductGrid";
import { useCatalog } from "@/context/CatalogContext";
import { SectionHeading } from "./SectionHeading";

export function FeaturedProducts() {
  const { products } = useCatalog();

  const featured = useMemo(
    () =>
      [...products]
        .filter((p) => p.inStock)
        .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
        .slice(0, 8),
    [products],
  );

  return (
    <Container className="py-4 sm:py-6">
      <SectionHeading
        eyebrow="Fan favourites"
        title="Best-selling gear"
        subtitle="The kit our cricketers reach for most."
        href="/shop"
        linkLabel="View all"
      />
      <div className="mt-8">
        <ProductGrid products={featured} />
      </div>
    </Container>
  );
}
