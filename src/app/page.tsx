import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PromoBand } from "@/components/home/PromoBand";
import { Newsletter } from "@/components/home/Newsletter";
import { Reveal } from "@/components/Reveal";
import { SportsOS } from "@/components/home/SportsOS";
import { BrandStatement } from "@/components/home/BrandStatement";
import { ConciergeSection } from "@/components/home/ConciergeSection";
import { StoreJsonLd } from "@/components/JsonLd";

export default function HomePage() {
  return (
    <>
      <StoreJsonLd />
      <Hero />
      <ValueProps />
      <Reveal>
        <CategoryTiles />
      </Reveal>
      <SportsOS />
      <Reveal>
        <FeaturedProducts />
      </Reveal>
      <BrandStatement />
      <Reveal>
        <PromoBand />
      </Reveal>
      <ConciergeSection />
      <Reveal>
        <Newsletter />
      </Reveal>
    </>
  );
}
