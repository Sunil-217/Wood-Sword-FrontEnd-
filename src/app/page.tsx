import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PromoBand } from "@/components/home/PromoBand";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import { Reveal } from "@/components/Reveal";
import { BoundaryRope } from "@/components/BoundaryRope";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <Reveal>
        <CategoryTiles />
      </Reveal>
      <BoundaryRope />
      <Reveal>
        <FeaturedProducts />
      </Reveal>
      <Reveal>
        <PromoBand />
      </Reveal>
      <BoundaryRope />
      <Testimonials />
      <Reveal>
        <Newsletter />
      </Reveal>
    </>
  );
}
