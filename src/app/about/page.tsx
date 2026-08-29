import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { WordMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Oneup Sports — an exclusive sports store in Chromepet, Chennai. Cricket, badminton, football, table tennis, fitness and leisure gear, shipped worldwide.",
};

const values = [
  {
    title: "One stop, every sport",
    body: "Cricket, badminton, football, basketball, volleyball, table tennis, swimming, skating, fitness and leisure — all under one roof.",
  },
  {
    title: "Only genuine brands",
    body: "Yonex, Li-Ning, FZ Forza, SG, SS, Shrey, GN, New Balance, DSC, MRF, Adidas, Asics, Nivia, Stag and GKI — sourced through authorised channels.",
  },
  {
    title: "Free knocking-in",
    body: "Every English willow bat is ping-tested and knocked in by hand before it leaves the shop, at no extra cost.",
  },
  {
    title: "Chennai store, worldwide shipping",
    body: "Walk into Chromepet seven days a week, or order online — we ship across India and overseas.",
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
            <WordMark className="h-12 w-auto" />
          </div>
          <h1 className="hero-fluid mx-auto mt-6 max-w-3xl font-display font-extrabold tracking-tight">
            One stop shop for all your{" "}
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">
              sporting requirements.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-100/70">
            Oneup Sports is an exclusive sports store in Chromepet, Chennai —
            stocking gear for fourteen sports, from tournament English willow to
            beginner shuttles, with worldwide shipping.
          </p>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        {/* Story */}
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Our story</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            A counter you can actually stand at
          </h2>
          <div className="seam-stitch mt-3 w-16" aria-hidden />
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted/70">
            <p>
              Oneup Sports started because buying sports gear in Chennai meant
              either driving across the city for one brand, or gambling on a
              listing online. We wanted a shop where a parent buying their
              child&apos;s first badminton racquet and a club opener picking a
              ₹28,000 cleft get the same amount of time at the counter.
            </p>
            <p>
              Today the store carries cricket bats, protection, kit bags and
              whites; badminton racquets, shuttles and grips; footballs and
              keeper gloves; table tennis bats, balls and full-size tables;
              sport-specific shoes; swimming, skating, fitness and leisure gear.
              If it&apos;s played in Chennai, we try to stock it.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-line/8 bg-surface p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted/65">{v.body}</p>
            </div>
          ))}
        </div>

        {/* Store details */}
        <div className="mt-14 grid gap-4 rounded-3xl border border-line/8 bg-surface p-8 shadow-sm sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted/45">Store</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink">
              No.37, Ramachandra Road, Nehru Nagar, Chromepet, Chennai 600 044
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted/45">Hours</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink">
              MON – SUN · 11:00 AM – 09:00 PM
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted/45">Talk to us</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink">
              +91 80561 26269
              <br />
              support@oneupsports.in
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-3xl bg-brand-950 px-8 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Ready to kit up?</h2>
            <p className="mt-1.5 text-sm text-brand-100/70">Explore the full 2026 range across every sport.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/shop" className="press rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink transition-transform">
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
