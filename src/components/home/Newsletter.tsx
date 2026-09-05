import { Container } from "@/components/ui/Container";

/**
 * There is no mailing-list backend, so this block does not pretend to collect
 * addresses. It points at the channels the store actually answers on.
 */
const WHATSAPP = "918056126269";
const SUPPORT_EMAIL = "support@oneupsports.in";

export function Newsletter() {
  return (
    <Container className="pb-4">
      <div className="relative overflow-hidden rounded-3xl bg-brand-950 px-6 py-12 text-center text-white sm:px-10 sm:py-16">
        <div className="pitch-stripes pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-gold-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-lg">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Talk to the Oneup dressing room
          </h2>
          <p className="mt-3 text-sm text-brand-100/70">
            Sizing, grip weight, stringing tension, whether something is on the
            shelf today — message the shop in Chromepet and a person answers.
          </p>

          <div className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-400"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.6-3.2A8 8 0 0 1 4 12z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
              WhatsApp the store
            </a>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="press inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
                <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.7" />
              </svg>
              Email us
            </a>
          </div>

          <p className="mt-5 text-xs text-brand-100/50">
            Mon–Sun, 11:00 AM – 09:00 PM · No.37 Ramachandra Road, Chromepet
          </p>
        </div>
      </div>
    </Container>
  );
}
