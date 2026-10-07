import { ArrowRight } from "lucide-react";

const benefits = [
  { label: "Monthly Earnings", value: "₹15,000+" },
  { label: "Listing Fees", value: "Zero" },
  { label: "Pickup & Drop", value: "Free" },
  { label: "On Every Rental", value: "10% Cashback" },
];

export function AssetPartnerBanner() {
  return (
    <section className="rounded-card bg-linear-to-r from-grape to-grape-bright p-6 text-white lg:p-8">
      <h2 className="font-display text-section font-bold">
        Become an Asset Partner.
      </h2>
      <p className="mt-1 font-display text-section font-bold text-lime">
        Earn Monthly.
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <li key={benefit.label} className="rounded-2xl bg-white/10 p-4">
            <p className="text-xs text-white/70">{benefit.label}</p>
            <p className="mt-1 font-display text-lg font-bold">
              {benefit.value}
            </p>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-6 flex h-11 items-center gap-2 rounded-pill border border-lime bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-grape"
      >
        Know More
        <ArrowRight aria-hidden="true" className="size-4" />
      </button>
    </section>
  );
}
