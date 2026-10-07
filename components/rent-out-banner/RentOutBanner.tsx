import { ArrowRight } from "lucide-react";

export function RentOutBanner() {
  return (
    <section className="rounded-card bg-linear-to-r from-new to-grape-bright p-6 text-white lg:p-8">
      <h2 className="font-display text-section font-bold">
        Got gear you don&rsquo;t use anymore?
      </h2>
      <p className="mt-1 font-display text-section font-bold text-lime">
        Rent Out Your Gear on SharePal.
      </p>

      <button
        type="button"
        className="mt-6 flex h-11 items-center gap-2 rounded-pill bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-grape"
      >
        Earn With Us
        <ArrowRight aria-hidden="true" className="size-4" />
      </button>
    </section>
  );
}
