import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ShieldMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "About us",
  description:
    "MM Sports — pro-grade cricket equipment hand-crafted in Meerut and shipped factory-direct across India.",
};

const values = [
  {
    title: "Hand-crafted in Meerut",
    body: "Every bat is pressed, shaped and knocked-in by craftsmen in the home of Indian cricket manufacturing.",
  },
  {
    title: "Factory-direct pricing",
    body: "We skip the middlemen and the pro-shop markup, so you get tournament gear at honest prices.",
  },
  {
    title: "Ping-tested quality",
    body: "Nothing leaves the bench until it performs — clefts are graded, pressed and rung by hand.",
  },
  {
    title: "Built for every level",
    body: "From gully cricket to club finals, there's kit here sized and priced for the way you play.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="stadium relative overflow-hidden text-white">
        <div className="pitch-stripes pointer-events-none absolute inset-0 opacity-40" />
        <Container className="relative py-16 text-center sm:py-20">
          <div className="mx-auto flex justify-center">
            <span className="inline-flex items-center justify-center rounded-2xl bg-white p-2.5">
              <ShieldMark className="h-12 w-auto" />
            </span>
          </div>
          <h1 className="hero-fluid mx-auto mt-6 max-w-3xl font-display font-extrabold tracking-tight">
            Gear built to be{" "}
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">
              played, not admired.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-100/70">
            MM Sports is a cricket-first equipment brand from Meerut. We make
            pro-grade bats, protection and kit for cricketers who care more about
            the middle of the bat than the sticker on it.
          </p>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        {/* Story */}
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">Our story</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-brand-950 sm:text-3xl">
            From the willow bench to your bag
          </h2>
          <div className="seam-stitch mt-3 w-16" aria-hidden />
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-brand-900/70">
            <p>
              MM Sports started with a simple frustration — brilliant bats being
              sold for double their worth once they passed through distributors
              and pro shops. So we went straight to the source: the willow
              workshops of Meerut, where India&apos;s finest clefts are pressed.
            </p>
            <p>
              Today we craft and curate a full range — English and Kashmir willow
              bats, the Armour protection line, wicket-keeping gear, kit bags and
              team essentials — and ship them factory-direct across India. No
              inflated retail markup, no compromise on the gear.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-brand-900/8 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-brand-950">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-900/65">{v.body}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-3xl bg-brand-950 px-8 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Ready to kit up?</h2>
            <p className="mt-1.5 text-sm text-brand-100/70">Explore the full 2026 range.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/shop" className="press rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-950 transition-transform">
              Shop all gear
            </Link>
            <Link href="/contact" className="press rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Contact us
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
