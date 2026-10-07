"use client";

import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  SquarePen,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRental } from "@/components/rental-context/RentalProvider";
import { cartItems } from "@/lib/cart";
import { formatRent } from "@/lib/format";
import { formatRentalLength, formatShortDate } from "@/lib/rental";

export function CartDrawer() {
  const {
    products,
    lines,
    days,
    itemCount,
    total,
    dates,
    isCartOpen,
    closeCart,
    openDatePicker,
    changeQuantity,
    dropLine,
  } = useRental();
  const [isCouponListOpen, setCouponListOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isCartOpen) return;

    const previouslyFocused = document.activeElement;
    closeButton.current?.focus();

    return () => {
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [isCartOpen]);

  const items = cartItems(lines, products);
  const rentLength = formatRentalLength(days);
  const delivery = dates ? formatShortDate(dates.delivery) : "—";
  const pickup = dates ? formatShortDate(dates.pickup) : "—";

  return (
    <div
      inert={!isCartOpen}
      className={`fixed inset-0 z-50 ${isCartOpen ? "" : "pointer-events-none"}`}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close cart"
        onClick={closeCart}
        className={`absolute inset-0 h-full w-full bg-navy/30 backdrop-blur-sm transition-opacity ${
          isCartOpen ? "duration-500 opacity-100" : "duration-300 opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        aria-hidden={!isCartOpen || undefined}
        className={`absolute top-0 right-0 flex h-full w-3/4 flex-col border-l border-line bg-page transition-transform sm:max-w-sm md:min-w-cart md:rounded-l-3xl ${
          isCartOpen
            ? "translate-x-0 duration-500 ease-out"
            : "translate-x-full duration-300 ease-in"
        }`}
      >
        <header className="flex h-20 shrink-0 items-center gap-3 border-b border-neutral-200 bg-surface px-4">
          <button
            ref={closeButton}
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex size-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-tile"
          >
            <X aria-hidden="true" className="size-6" />
          </button>

          <h2 className="font-display text-xl font-bold">Cart Items</h2>

          <span className="ml-auto rounded-pill bg-neutral-150 px-3 py-1.5 text-xs font-medium text-ink-soft">
            {itemCount} items added
          </span>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="p-8 text-center text-sm text-ink-muted">
              Nothing in your cart yet.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map(({ line, product }) => (
                <li
                  key={line.productId}
                  className="flex gap-3 rounded-2xl bg-surface p-3"
                >
                  <div className="relative h-16 w-13 shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="52px"
                      className="object-contain"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="font-bold">{product.name}</p>
                    {product.tag !== "" && (
                      <p className="mt-0.5 text-xs text-ink-faint">
                        {product.tag}
                      </p>
                    )}

                    <div className="mt-2.5 flex items-center gap-2.5">
                      <div className="flex h-6 w-17 items-center rounded-pill border border-neutral-200 bg-surface">
                        <button
                          type="button"
                          aria-label={`Decrease ${product.name} quantity`}
                          onClick={() =>
                            changeQuantity(product.id, line.quantity - 1)
                          }
                          className="flex h-full flex-1 items-center justify-center text-ink"
                        >
                          <Minus aria-hidden="true" className="size-3.5" />
                        </button>

                        <span className="text-sm font-semibold">
                          {line.quantity}
                        </span>

                        <button
                          type="button"
                          aria-label={`Increase ${product.name} quantity`}
                          onClick={() =>
                            changeQuantity(product.id, line.quantity + 1)
                          }
                          className="flex h-full flex-1 items-center justify-center text-primary"
                        >
                          <Plus aria-hidden="true" className="size-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        aria-label={`Remove ${product.name} from cart`}
                        onClick={() => dropLine(product.id)}
                        className="text-ink-ghost transition-colors hover:text-trending"
                      >
                        <Trash2 aria-hidden="true" className="size-4" />
                      </button>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-bold">
                      {formatRent(product.per_day_rent)}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-faint">
                      Rent for {rentLength}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="shrink-0 border-t border-neutral-200 bg-surface px-4 pt-3 pb-4">
            <div className="flex items-center">
              <div className="flex h-8.5 min-w-0 flex-1 items-center gap-2 rounded-pill bg-neutral-200 pr-9 pl-3.5 text-xs font-semibold text-ink-soft">
                <CalendarDays aria-hidden="true" className="size-4 shrink-0" />
                <span className="truncate">Delivery Date: {delivery}</span>

                <span aria-hidden="true" className="h-4 w-px shrink-0 bg-line" />

                <CalendarDays aria-hidden="true" className="size-4 shrink-0" />
                <span className="truncate">Pickup Date: {pickup}</span>
              </div>

              <button
                type="button"
                onClick={openDatePicker}
                className="-ml-7 flex h-8.5 shrink-0 items-center gap-1.5 rounded-pill bg-navy px-4 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <SquarePen aria-hidden="true" className="size-3.5" />
                Edit
              </button>
            </div>

            <div className="mt-3 flex items-center justify-end">
              <div className="flex h-7.5 items-center gap-1.5 rounded-pill bg-neutral-200 pr-4 pl-3">
                <Tag aria-hidden="true" className="size-3.5 text-ink-muted" />
                <input
                  disabled
                  placeholder="Enter coupon code"
                  className="w-44 bg-transparent text-xs text-ink-muted placeholder:text-ink-muted"
                />
              </div>

              <button
                type="button"
                disabled
                className="-ml-3 h-7.5 shrink-0 rounded-pill bg-ink-ghost px-4 text-xs font-semibold text-surface"
              >
                Apply
              </button>
            </div>

            <button
              type="button"
              aria-expanded={isCouponListOpen}
              onClick={() => setCouponListOpen((open) => !open)}
              className="mt-1.5 ml-auto flex items-center gap-1 text-xs font-semibold text-primary"
            >
              View Coupons
              <ChevronDown
                aria-hidden="true"
                className={`size-3.5 transition-transform ${
                  isCouponListOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCouponListOpen && (
              <p className="mt-1 text-right text-xs text-ink-muted">
                No coupon codes available right now.
              </p>
            )}

            <div className="mt-3 flex items-center justify-between gap-4 border-t border-neutral-200 pt-3">
              <div>
                <p className="flex items-center gap-1.5 text-base font-bold">
                  Total Charges
                  <ChevronUp aria-hidden="true" className="size-4" />
                </p>
                <p className="mt-0.5 text-xs text-ink-faint">
                  Price incl. of all taxes
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-display text-2xl font-bold">
                  {formatRent(total)}
                </p>

                <button
                  type="button"
                  className="h-8.5 shrink-0 rounded-pill bg-primary px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Login to CheckOut
                </button>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
