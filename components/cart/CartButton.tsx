"use client";

import { ShoppingCart } from "lucide-react";
import {
  CartCountBadge,
  cartCountLabel,
} from "@/components/cart/CartCountBadge";
import { useRental } from "@/components/rental-context/RentalProvider";

export function CartButton({ className }: { className: string }) {
  const { itemCount, openCart } = useRental();

  return (
    <button
      type="button"
      aria-label={cartCountLabel(itemCount)}
      onClick={openCart}
      className={className}
    >
      <span className="relative">
        <ShoppingCart aria-hidden="true" className="size-5" />
        <CartCountBadge count={itemCount} />
      </span>
    </button>
  );
}
