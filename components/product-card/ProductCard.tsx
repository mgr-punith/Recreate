import { Heart, Plus, Star } from "lucide-react";
import Image from "next/image";
import { formatBookedCount, formatRent } from "@/lib/format";
import type { Product, ProductTag } from "@/types/product";

const badgeTone: Record<Exclude<ProductTag, "">, string> = {
  Trending: "border-trending text-trending",
  New: "border-new text-new",
  "Vote to Launch": "border-grape-bright text-grape-bright",
};

export function ProductCard({
  product,
  eager = false,
}: {
  product: Product;
  eager?: boolean;
}) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl bg-tile p-2.5 leading-5 transition-all duration-300 md:rounded-3xl md:bg-transparent md:p-3 md:hover:bg-tile ${
        product.out_of_stock ? "opacity-60" : ""
      }`}
    >
      {product.tag !== "" && (
        <span
          className={`absolute top-3 left-3 z-10 rounded-badge border px-2.5 py-0.5 text-xs font-semibold ${
            badgeTone[product.tag]
          }`}
        >
          {product.tag}
        </span>
      )}

      <button
        type="button"
        aria-label={`Save ${product.name} for later`}
        className="absolute top-3 right-3 z-10 text-ink-muted transition-colors hover:text-trending"
      >
        <Heart aria-hidden="true" className="size-5" />
      </button>

      <div className="relative aspect-square shrink-0 overflow-hidden rounded-lg bg-tile p-1.5 md:rounded-2xl md:p-3">
        <div className="relative size-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 45vw, 200px"
            loading={eager ? "eager" : "lazy"}
            className={`object-contain transition-transform duration-300 group-hover:scale-105 ${
              product.out_of_stock ? "grayscale" : ""
            }`}
          />
        </div>
      </div>

      <h3 className="mt-3 line-clamp-2 font-semibold">{product.name}</h3>

      <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
        {product.rating > 0 && (
          <span className="flex items-center gap-1">
            <Star
              aria-hidden="true"
              className="size-3.5 fill-trending text-trending"
            />
            {product.rating}
          </span>
        )}
        <span>{formatBookedCount(product.booked_count)} booked</span>
      </p>

      <div className="mt-3 flex items-end justify-between gap-2 border-t border-line pt-3">
        <p>
          <span className="font-display text-lg font-bold">
            {formatRent(product.per_day_rent)}
          </span>
          <span className="text-xs text-ink-muted"> /day</span>
        </p>

        {product.out_of_stock ? (
          <button
            type="button"
            disabled
            className="flex h-11 cursor-not-allowed items-center justify-center rounded-pill border border-line px-4 text-sm font-semibold text-ink-muted"
          >
            Out of Stock
          </button>
        ) : product.tag === "Vote to Launch" ? (
          <button
            type="button"
            aria-label={`Vote for ${product.name}`}
            className="flex h-11 items-center justify-center rounded-pill bg-navy px-4 text-sm font-semibold text-lime transition-colors hover:bg-grape"
          >
            Vote
          </button>
        ) : (
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            className="flex h-11 items-center justify-center gap-2 rounded-pill border border-ink font-semibold transition-colors hover:bg-ink hover:text-white lg:w-11 lg:px-0"
          >
            <Plus aria-hidden="true" className="size-5" />
            <span className="text-sm lg:hidden">Add to Cart</span>
          </button>
        )}
      </div>
    </article>
  );
}
