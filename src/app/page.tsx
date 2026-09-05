import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PromoBand } from "@/components/home/PromoBand";
import { Newsletter } from "@/components/home/Newsletter";
import { Reveal } from "@/components/Reveal";
import { SportsTicker } from "@/components/home/SportsTicker";
import { SportsOS } from "@/components/home/SportsOS";
import { BrandStatement } from "@/components/home/BrandStatement";

export default function HomePage() {
  return (
    <>
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
      <SportsTicker />
      <Reveal>
        <Newsletter />
      </Reveal>
    </>
  );
}
