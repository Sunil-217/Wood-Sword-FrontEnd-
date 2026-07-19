import { Container } from "@/components/ui/Container";

export default function ShopLoading() {
  return (
    <Container className="py-8 sm:py-10">
      <div className="skeleton h-3 w-32 rounded-full" />
      <div className="skeleton mt-4 h-9 w-56 rounded-xl" />
      <div className="skeleton mt-3 h-4 w-72 rounded-full" />

      <div className="mt-8 grid gap-8 lg:grid-cols-[270px_1fr]">
        <div className="hidden lg:block">
          <div className="skeleton h-[480px] rounded-2xl" />
        </div>
        <div>
          <div className="flex items-center justify-between border-b border-brand-900/8 pb-4">
            <div className="skeleton h-4 w-24 rounded-full" />
            <div className="skeleton h-9 w-36 rounded-full" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-brand-900/8 bg-white">
                <div className="skeleton aspect-square" />
                <div className="space-y-2.5 p-4">
                  <div className="skeleton h-3 w-16 rounded-full" />
                  <div className="skeleton h-4 w-32 rounded-full" />
                  <div className="skeleton h-3 w-24 rounded-full" />
                  <div className="skeleton h-5 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
