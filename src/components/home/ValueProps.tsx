import { Container } from "@/components/ui/Container";

const props = [
  {
    title: "Free shipping",
    body: "On every India order above ₹2000.",
    icon: (
      <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z M7.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    ),
  },
  {
    title: "Pro-grade quality",
    body: "Hand-crafted, ping-tested gear.",
    icon: <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 21l-5-2.8 1-5.5-4-3.9 5.5-.8z" />,
  },
  {
    title: "7-day returns",
    body: "Changed your mind? Send it back.",
    icon: <path d="M4 12a8 8 0 1 1 2.3 5.6M4 12V7m0 5h5" />,
  },
  {
    title: "Real support",
    body: "WhatsApp help, 7 days a week.",
    icon: <path d="M4 5h16v11H8l-4 4z" />,
  },
];

export function ValueProps() {
  return (
    <Container className="-mt-8 relative z-20">
      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-brand-900/8 bg-white p-3 shadow-xl shadow-brand-900/5 sm:gap-4 lg:grid-cols-4">
        {props.map((p) => (
          <div
            key={p.title}
            className="flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-center sm:flex-row sm:items-center sm:gap-3 sm:px-3 sm:text-left"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 sm:h-11 sm:w-11">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                {p.icon}
              </svg>
            </span>
            <div>
              <p className="text-[13px] font-semibold text-brand-950 sm:text-sm">{p.title}</p>
              <p className="text-xs text-brand-900/55">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
