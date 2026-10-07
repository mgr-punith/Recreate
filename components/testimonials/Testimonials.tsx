import { Star } from "lucide-react";

const reviews = [
  {
    name: "Ananya R.",
    member: "Member - 8 months",
    quote:
      "Booked a PS5 for a weekend with friends. It arrived sanitised and fully set up, and pickup was just as easy.",
  },
  {
    name: "Karthik M.",
    member: "Member - 1 year",
    quote:
      "Zero deposit and no hidden charges. I have rented a VR headset twice now and both times the gear was spotless.",
  },
  {
    name: "Sneha P.",
    member: "Member - 5 months",
    quote:
      "Cheaper than buying a console I would only use a few weeks. Support answered on WhatsApp within minutes.",
  },
  {
    name: "Rahul V.",
    member: "Member - 2 years",
    quote:
      "Rented a racing wheel for a month. Delivery was on time and the per-day price dropped for the longer tenure.",
  },
];

export function Testimonials() {
  return (
    <section>
      <h2 className="font-display text-section font-bold">
        Served more than 1 Lakh Orders
      </h2>

      <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reviews.map((review) => (
          <li
            key={review.name}
            className="flex flex-col rounded-card bg-surface p-5"
          >
            <p className="flex gap-0.5" aria-label="Rated 5 out of 5">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star
                  key={star}
                  aria-hidden="true"
                  className="size-4 fill-trending text-trending"
                />
              ))}
            </p>
            <blockquote className="mt-3 flex-1 text-sm text-ink-muted">
              {review.quote}
            </blockquote>
            <p className="mt-4">
              <span className="block font-semibold">{review.name}</span>
              <span className="text-xs text-ink-muted">{review.member}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
