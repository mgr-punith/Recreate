import { Star } from "lucide-react";

type Review = {
  name: string;
  from: string;
  gear: string;
  quote: string;
};

const reviews: Review[] = [
  {
    name: "Satyaki",
    from: "Kolkata",
    gear: "Trekking Gear",
    quote:
      "I would recommend SharePal for anybody looking to rent trekking gears, on time delivery, condition of products delivered were very good, super transparent deposit return policy.",
  },
  {
    name: "Afrana",
    from: "Bangalore",
    gear: "Gaming Console",
    quote:
      "Have used their services twice now. They never disappoint. Quick responses, polite, transparent, hassle free, great products as well. Rented trekking gear and PS4. Thanks Sharepal! Cheers to you guys!",
  },
  {
    name: "Kanthikiran",
    from: "Bangalore",
    gear: "Riding Gear",
    quote:
      "It's an amazing service, starting from the quality of the gear provided to the pickup and drop at doorstep facility. The staff is extremely helpful and supportive. The jacket was freshly washed and the shoes provided were brand new. The refund for the deposit was also processed immediately. We had no clue that this kind of service existed in India, SharePal.",
  },
  {
    name: "Amal",
    from: "Bangalore",
    gear: "Gaming Console",
    quote:
      "I am a regular customer and order ps4 It's very affordable and booking an order is super easy and user friendly website and polite staff.",
  },
  {
    name: "Pankaj",
    from: "Mumbai",
    gear: "Action Cameras",
    quote:
      "The experience with share pal is awesome . The camera , service provide by them is good. Overall I am Happy by renting camera gear from share pal. Next time I will rent the gears from share pal only. Must recommend to everyone",
  },
  {
    name: "Jayaraman",
    from: "Mumbai",
    gear: "Riding Gear",
    quote:
      "Great company amazing products at affordable prices and great service I would recommend share pal to everybody they really go out of the way for the best service I surely know I will be their forever customer.",
  },
  {
    name: "Manish",
    from: "Mumbai",
    gear: "Gaming Console",
    quote:
      "I like the way sharepal work and really enjoyed the ps4 will order again. Thanks sharepal",
  },
  {
    name: "Rakesh",
    from: "Mumbai",
    gear: "Trekking Gear",
    quote:
      "Ordered 2 pair of shoes & 3 trekking poles. Shoes were in mint condition, very well cleaned and sanitized and so does the trekking poles. Delivery and pick-up was smooth. Refund was done within the time frame. If you have UPI it will be transferred immediately. I overall had a very good experience with Sharepal. Have recommended to my family and friends as well. Thank you Sharepal.",
  },
  {
    name: "Shruti",
    from: "Mumbai",
    gear: "Winter Wear",
    quote:
      "Right from the time I saw their website, till i got my refund the entire experience with SharePal was brilliant. The product listing, prices, delivery, communication, return. Everything was spot on. Product quality was brilliant. The way the team solves your issues is so rare to find in today's times.. I dont think I am gonna look at any other place for my travel needs.",
  },
  {
    name: "Amit",
    from: "Delhi",
    gear: "Riding Gear",
    quote:
      "Awesome experience. Please be the way you are. Received excellent clothes and shoes in washed and clean state. They looked like new ones. Received hasslefree refund.",
  },
];

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 shrink-0">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function ReviewCard({
  review,
  repeated = false,
}: {
  review: Review;
  repeated?: boolean;
}) {
  return (
    <li
      aria-hidden={repeated || undefined}
      className="flex min-w-82 max-w-82 shrink-0 snap-center rounded-2xl border border-neutral-200 bg-review p-3 md:rounded-3xl lg:min-w-90 lg:max-w-90 lg:p-4"
    >
      <figure className="flex flex-1 flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <GoogleMark />
            <p className="flex gap-1" aria-label="Rated 5 out of 5">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star
                  key={star}
                  aria-hidden="true"
                  className="size-5 fill-star text-star"
                />
              ))}
            </p>
          </div>

          <blockquote className="line-clamp-4 text-sm text-navy lg:text-base">
            &ldquo;{review.quote}&rdquo;
          </blockquote>
        </div>

        <figcaption className="flex gap-5">
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-avatar text-xs font-semibold text-avatar-ink md:text-base"
          >
            {review.name.slice(0, 2).toUpperCase()}
          </span>
          <span>
            <span className="block text-xs font-medium text-ink-muted lg:text-sm">
              {review.name}
            </span>
            <span className="block text-[10px] text-ink-faint lg:text-sm">
              {review.from} &bull; {review.gear}
            </span>
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

export function Testimonials() {
  return (
    <section>
      <h2 className="px-4 text-center font-display text-3xl font-bold md:text-display">
        Served more than 1 Lakh Orders
      </h2>

      <div className="group mt-6 overflow-hidden p-2 motion-reduce:overflow-x-auto">
        <ul className="flex w-max animate-marquee-horizontal gap-4 px-4 [--duration:60s] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}

          {/* The rail translates by half its width, so the reviews repeat to close the loop. */}
          {reviews.map((review) => (
            <ReviewCard key={`${review.name}-repeat`} review={review} repeated />
          ))}
        </ul>
      </div>
    </section>
  );
}
