import { Container } from "@/components/ui/Container";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "./SectionHeading";

const quotes = [
  {
    name: "Arjun Nair",
    role: "Club opener · Kochi",
    number: 7,
    rating: 5,
    text: "The Vanguard Pro pings like bats twice its price. Knocked-in on arrival — I scored 74 with it the first weekend.",
    accent: "#c8901c",
  },
  {
    name: "Sameer Kulkarni",
    role: "Wicket-keeper · Pune",
    number: 23,
    rating: 5,
    text: "Catchmaster gloves swallowed everything behind the stumps all season. The web is stupidly tacky in the best way.",
    accent: "#a3521c",
  },
  {
    name: "Rehan Shaikh",
    role: "U-19 coach · Mumbai",
    number: 11,
    rating: 4.5,
    text: "Kitted out my whole academy squad — honest gear, quick WhatsApp support, and the youth sizes actually fit properly.",
    accent: "#256e49",
  },
];

export function Testimonials() {
  return (
    <Container className="pb-16 pt-4 sm:pb-20 sm:pt-6">
      <Reveal>
        <SectionHeading
          eyebrow="From the dressing room"
          title="Cricketers rate us 4.8/5"
          subtitle="Real reviews from players across India."
        />
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {quotes.map((q, i) => (
          <Reveal key={q.name} delay={i * 90}>
            <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand-900/8 bg-white shadow-sm">
              {/* player-card header strip */}
              <figcaption
                className="relative flex items-center gap-3 px-5 py-4 text-white"
                style={{
                  background: `linear-gradient(120deg, color-mix(in srgb, ${q.accent} 55%, #0a2016) 0%, #0a2016 100%)`,
                }}
              >
                <div className="pitch-stripes pointer-events-none absolute inset-0 opacity-30" />
                {/* jersey number */}
                <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 font-display text-lg font-extrabold text-gold-300 ring-1 ring-white/20">
                  {q.number}
                </span>
                <span className="relative min-w-0">
                  <span className="block truncate text-sm font-bold">{q.name}</span>
                  <span className="block truncate text-xs text-white/60">{q.role}</span>
                </span>
              </figcaption>

              <blockquote className="flex-1 px-5 pt-4 text-sm leading-relaxed text-brand-900/75">
                &ldquo;{q.text}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between px-5 pb-4 pt-4">
                <Rating value={q.rating} />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-900/35">
                  Verified buyer
                </span>
              </div>
            </figure>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
