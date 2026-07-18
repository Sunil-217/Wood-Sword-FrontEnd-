import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center py-28 text-center">
      <p className="font-display text-7xl font-extrabold text-brand-900/15">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-brand-950">
        That page has been caught behind
      </h1>
      <p className="mt-2 max-w-sm text-sm text-brand-900/55">
        We couldn&apos;t find what you were looking for. Let&apos;s get you back
        to the gear.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="rounded-full border border-brand-900/15 bg-white px-5 py-2.5 text-sm font-semibold text-brand-900 hover:bg-brand-50">
          Go home
        </Link>
        <Link href="/shop" className="rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]">
          Shop all gear
        </Link>
      </div>
    </Container>
  );
}
