import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How can I rent from SharePal?",
    answer:
      "Renting from SharePal is quick and easy. You can browse the products, select your dates and add them to cart and checkout. You can choose to pay online or upon delivery.",
  },
  {
    question:
      "If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?",
    answer:
      "No, partial extension is not possible, all the products that are rented in that particular order have to be extended.",
  },
  {
    question: "When does the rental start?",
    answer:
      "The rental starts from the following day of the delivery day and ends a day prior to the return date. So for example, if you select the delivery date as 5th June and return date as 8th June. The rental is charged for 2 days.",
  },
  {
    question: "What will be the condition of the products at the time of delivery?",
    answer:
      "At SharePal.in, we make sure that the products you receive are in great condition upon delivery. We thoroughly inspect and clean each item before sending it your way. If you ever face any issues, our friendly customer support team is here to help. Your satisfaction matters to us the most!",
  },
  {
    question: "Why is verification required?",
    answer:
      "Profile verification is a crucial step at SharePal.in to ensure the safety and security of our platform and users. It helps us confirm the identity of our users, prevent fraud, and maintain a secure environment for everyone involved.",
  },
];

export function Faq() {
  return (
    <section className="rounded-card bg-surface p-6 lg:p-8 lg:mt-10">
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
