const promos = [
  "Free shipping on all India orders above ₹2000",
  "Pro-grade gear, factory-direct from Meerut",
  "Knocking-in service available on all English willow bats",
  "Easy 7-day returns · WhatsApp support 7 days a week",
];

export function AnnouncementBar() {
  // duplicated track so the marquee loops seamlessly
  const track = [...promos, ...promos];
  return (
    <div className="overflow-hidden bg-brand-950 text-brand-50">
      <div className="animate-marquee flex w-max whitespace-nowrap py-2">
        {track.map((text, i) => (
          <span
            key={i}
            className="mx-6 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-brand-100/90"
          >
            <span className="text-gold-400">✦</span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
