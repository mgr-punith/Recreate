"use client";

import { Plus, X } from "lucide-react";
import Image from "next/image";
import { useRental } from "@/components/rental-context/RentalProvider";
import { useSaved } from "@/components/saved-context/SavedProvider";
import { formatRent } from "@/lib/format";
import { rentalTotal } from "@/lib/rental";

const lists = {
  saved: { id: "saved", title: "Saved for later" },
  recent: { id: "recent", title: "Recently viewed" },
} as const;

export function ProductStrip({ list }: { list: keyof typeof lists }) {
  const { days, canRent, addToCart, openDatePicker } = useRental();
  const { savedProducts, recentProducts, toggleSaved } = useSaved();

  const { id, title } = lists[list];
  const products = list === "saved" ? savedProducts : recentProducts;
  const canRemove = list === "saved";

  // An empty rail is noise, so it takes itself out until there is something to show.
  if (products.length === 0) return null;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="space-y-3">
      <h2 id={`${id}-title`} className="font-display text-section font-bold">
        {title}
      </h2>

      <ul className="flex snap-x gap-3 overflow-x-auto pb-2">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex w-40 shrink-0 snap-start flex-col rounded-2xl bg-tile p-2.5"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-surface">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="160px"
                className={`object-contain p-1.5 ${
                  product.out_of_stock ? "grayscale" : ""
                }`}
              />
            </div>

            <h3 className="mt-2 line-clamp-2 text-sm leading-5 font-semibold">
              {product.name}
            </h3>

            <div className="mt-auto pt-1.5">
              {canRent ? (
                <p className="text-sm font-bold">
                  {formatRent(rentalTotal(product.per_day_rent, days))}
                </p>
              ) : (
                <button
                  type="button"
                  onClick={openDatePicker}
                  className="text-left text-xs font-medium text-ink-subtle"
                >
                  Select Dates to view price
                </button>
              )}

              <div className="mt-1.5 flex items-center gap-1.5">
                {product.out_of_stock ? (
                  <p className="text-xs font-semibold text-ink-muted">
                    Out of Stock
                  </p>
                ) : (
                  <button
                    type="button"
                    aria-label={`Add ${product.name} to cart`}
                    onClick={
                      canRent
                        ? () => addToCart(product.id)
                        : () => openDatePicker()
                    }
                    className="flex size-8 items-center justify-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-white"
                  >
                    <Plus aria-hidden="true" className="size-4" />
                  </button>
                )}

                {canRemove && (
                  <button
                    type="button"
                    aria-label={`Remove ${product.name} from saved`}
                    onClick={() => toggleSaved(product.id)}
                    className="flex size-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-neutral-150 hover:text-ink"
                  >
                    <X aria-hidden="true" className="size-4" />
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
