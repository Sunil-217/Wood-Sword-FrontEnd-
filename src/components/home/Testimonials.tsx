import { Container } from "@/components/ui/Container";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "./SectionHeading";

const quotes = [
  {
    name: "Arjun Nair",
    role: "Club opener · Kochi",
    rating: 5,
    text: "The Vanguard Pro pings like bats twice its price. Knocked-in on arrival — I scored 74 with it the first weekend.",
    initials: "AN",
    accent: "#c8901c",
  },
  {
    name: "Sameer Kulkarni",
    role: "Wicket-keeper · Pune",
    rating: 5,
    text: "Catchmaster gloves swallowed everything behind the stumps all season. The web is stupidly tacky in the best way.",
    initials: "SK",
    accent: "#a3521c",
  },
  {
    name: "Rehan Shaikh",
    role: "U-19 coach · Mumbai",
    rating: 4.5,
    text: "Kitted out my whole academy squad — honest gear, quick WhatsApp support, and the youth sizes actually fit properly.",
    initials: "RS",
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
            <figure className="flex h-full flex-col rounded-2xl border border-brand-900/8 bg-white p-6 shadow-sm">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="text-gold-500"
                aria-hidden
              >
                <path
                  d="M10 7H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2m14-12h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-brand-900/75">
                {q.text}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-brand-900/8 pt-4">
                <span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: q.accent }}
                >
                  {q.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-brand-950">
                    {q.name}
                  </span>
                  <span className="block truncate text-xs text-brand-900/50">{q.role}</span>
                </span>
                <span className="ml-auto shrink-0">
                  <Rating value={q.rating} />
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
