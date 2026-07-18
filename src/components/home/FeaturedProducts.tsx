import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/ProductGrid";
import { featuredProducts } from "@/lib/catalog";
import { SectionHeading } from "./SectionHeading";

export function FeaturedProducts() {
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
        <ProductGrid products={featuredProducts(8)} />
      </div>
    </Container>
  );
}
