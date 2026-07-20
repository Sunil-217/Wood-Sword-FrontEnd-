import { Container } from "@/components/ui/Container";

const props = [
  {
    title: "Free shipping",
    body: "On every India order above ₹2000.",
    // ball with speed lines — express delivery
    icon: (
      <>
        <circle cx="14" cy="12" r="6.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M14 5.5q3.5 6.5 0 13" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M2.5 8.5H7M1.5 12H6M2.5 15.5H7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Pro-grade quality",
    body: "Hand-crafted, ping-tested gear.",
    // bat with a star of approval
    icon: (
      <>
        <rect x="10.4" y="3" width="4.2" height="12.5" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12.5 15.5v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M19.5 15.5l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2-1.45-1.4 2-.3z" fill="currentColor" />
      </>
    ),
  },
  {
    title: "7-day returns",
    body: "Changed your mind? Send it back.",
    icon: <path d="M4 12a8 8 0 1 1 2.3 5.6M4 12V7m0 5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  {
    title: "Real support",
    body: "WhatsApp help, 7 days a week.",
    // chat bubble with seam stitches
    icon: (
      <>
        <path d="M4 5h16v11H8l-4 4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
        <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2.2 2.4" />
      </>
    ),
  },
];

export function ValueProps() {
  return (
    <Container className="relative z-20 -mt-8">
      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-line/8 bg-surface p-3 shadow-xl shadow-brand-900/5 sm:gap-4 lg:grid-cols-4">
        {props.map((p) => (
          <div
            key={p.title}
            className="flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-center sm:flex-row sm:items-center sm:gap-3 sm:px-3 sm:text-left"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-subtle text-accent sm:h-11 sm:w-11">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {p.icon}
              </svg>
            </span>
            <div>
              <p className="text-[13px] font-semibold text-ink sm:text-sm">{p.title}</p>
              <p className="text-xs text-muted/55">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
