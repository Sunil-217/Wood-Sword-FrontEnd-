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
    <div className="relative overflow-hidden border-b border-gold-500/15 bg-[#06120c] text-brand-50">
      {/* LIVE chip, pinned left like a score ticker */}
      <div className="absolute inset-y-0 left-0 z-10 flex items-center gap-1.5 bg-[#06120c] pl-3 pr-2 sm:pl-4">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ball-500 opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ball-500" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
          Live
        </span>
        {/* fade edge */}
        <span className="pointer-events-none absolute left-full top-0 h-full w-8 bg-gradient-to-r from-[#06120c] to-transparent" />
      </div>

      <div className="animate-marquee flex w-max whitespace-nowrap py-2 pl-24">
        {track.map((text, i) => (
          <span
            key={i}
            className="mx-6 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-brand-100/85"
          >
            <span className="text-gold-500">●</span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
