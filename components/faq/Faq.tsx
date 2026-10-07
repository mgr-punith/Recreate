import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need to pay a security deposit to rent in Bangalore?",
    answer:
      "No. Every rental on SharePal is zero deposit. You only pay the rent for the days you keep the product.",
  },
  {
    question: "Is delivery and pickup free in Bangalore?",
    answer:
      "Yes. Delivery and pickup are free across Bangalore. Pick a delivery slot at checkout and we bring the gear to your door, then collect it when your rental ends.",
  },
  {
    question: "What if the product gets damaged during my rental?",
    answer:
      "Every rental includes accidental damage cover, so minor damage from normal use is covered. You are only liable for loss or damage outside the cover, as described in our damage policy.",
  },
  {
    question: "How long can I rent a gaming console for?",
    answer:
      "You can rent for as little as one day or as long as several months. The per-day price drops as your rental tenure gets longer.",
  },
  {
    question: "What do I need to share to place an order?",
    answer:
      "A government-issued photo ID and your delivery address in Bangalore. Verification takes a couple of minutes and is done once.",
  },
];

export function Faq() {
  return (
    <section className="rounded-card bg-surface p-6 lg:p-8">
      <h2 className="font-display text-section font-bold">
        Frequently Asked Questions (FAQs)
      </h2>

      <div className="mt-4 divide-y divide-line">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:content-none">
              {faq.question}
              <ChevronDown
                aria-hidden="true"
                className="size-5 shrink-0 text-ink-muted transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="mt-3 text-sm text-ink-muted">{faq.answer}</p>
          </details>
        ))}
      </div>

      <button
        type="button"
        className="mt-6 flex h-11 items-center justify-center rounded-pill border border-ink px-6 text-sm font-semibold transition-colors hover:bg-ink hover:text-white"
      >
        View more FAQ&rsquo;s
      </button>
    </section>
  );
}
