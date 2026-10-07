"use client";

import { Heart, Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import { useRental } from "@/components/rental-context/RentalProvider";
import { formatBookedCount, formatRent } from "@/lib/format";
import { formatRentalLength, rentalTotal } from "@/lib/rental";
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
  const {
    days,
    canRent,
    quantityOf,
    addToCart,
    changeQuantity,
    openDatePicker,
  } = useRental();
  const quantity = quantityOf(product.id);

  // Without dates there is no price and no rental, so the CTA asks for dates first.
  const startRental = canRent
    ? () => addToCart(product.id)
    : () => openDatePicker();

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl bg-tile p-2.5 leading-5 transition-all duration-300 md:rounded-3xl md:bg-transparent md:p-3 md:hover:bg-surface ${
        product.out_of_stock ? "opacity-60" : ""
      }`}
    >
      {product.tag !== "" && (
        <span
          className={`absolute top-3 left-3 z-10 rounded-badge border px-2.5 py-0.5 text-xs font-semibold md:border-2 ${
            badgeTone[product.tag]
          }`}
        >
          {product.tag}
        </span>
      )}

      <button
        type="button"
        aria-label={`Save ${product.name} for later`}
        className="absolute top-1 right-1 z-10 scale-80 text-ink-muted opacity-10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100 hover:text-trending md:top-3 md:right-3 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
      >
        <Heart aria-hidden="true" className="size-5" />
      </button>

      <div className="relative aspect-square shrink-0 overflow-hidden rounded-lg bg-tile p-1.5 md:rounded-2xl md:bg-surface">
        <div className="relative size-full ">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 45vw, 200px"
            loading={eager ? "eager" : "lazy"}
            className={`object-contain transition-transform duration-300 group-hover:scale-105 group-hover:p-2 ${
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

      <div className="mt-3 flex flex-col gap-2 border-t border-line pt-3 lg:flex-row lg:items-end lg:justify-between">
        {canRent ? (
          <div>
            <p className="text-xs font-medium text-ink-faint">
              Rent for {formatRentalLength(days)}
            </p>
            <p className="mt-0.5 flex items-center gap-2">
              <span className="font-display text-lg font-bold">
                {formatRent(rentalTotal(product.per_day_rent, days))}
              </span>
              <span className="rounded-badge bg-secondary-150 px-1.5 py-0.5 text-xs font-semibold text-secondary-900">
                Incl. of GST
              </span>
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={openDatePicker}
            className="text-left"
          >
            <span className="block text-sm font-semibold text-ink-subtle">
              Select Dates to view price
            </span>
            <span aria-hidden="true" className="mt-0.5 block font-display text-lg font-bold">
              ₹<span className="blur-[3px]">N/A</span>
            </span>
          </button>
        )}

        {product.out_of_stock ? (
          <button
            type="button"
            disabled
            className="flex h-11 w-full cursor-not-allowed items-center justify-center rounded-pill border border-line px-4 text-sm font-semibold text-ink-muted lg:w-auto"
          >
            Out of Stock
          </button>
        ) : product.tag === "Vote to Launch" ? (
          <button
            type="button"
            aria-label={`Vote for ${product.name}`}
            className="flex h-11 w-full items-center justify-center rounded-pill bg-navy px-4 text-sm font-semibold text-lime transition-colors hover:bg-grape lg:w-auto"
          >
            Vote
          </button>
        ) : quantity > 0 ? (
          <div className="flex h-11 w-full items-center justify-between rounded-pill border border-ink px-1.5 lg:w-28">
            <button
              type="button"
              aria-label={`Decrease ${product.name} quantity`}
              onClick={() => changeQuantity(product.id, quantity - 1)}
              className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-tile"
            >
              <Minus aria-hidden="true" className="size-4" />
            </button>

            <span className="text-sm font-semibold">{quantity}</span>

            <button
              type="button"
              aria-label={`Increase ${product.name} quantity`}
              onClick={() => changeQuantity(product.id, quantity + 1)}
              className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-tile"
            >
              <Plus aria-hidden="true" className="size-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={startRental}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-pill border border-ink font-semibold transition-colors hover:bg-ink hover:text-white lg:w-11 lg:px-0"
          >
            <Plus aria-hidden="true" className="size-5" />
            <span className="text-sm lg:hidden">Add to Cart</span>
          </button>
        )}
      </div>
    </article>
  );
}
