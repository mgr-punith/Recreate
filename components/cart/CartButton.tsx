"use client";

import { ShoppingCart } from "lucide-react";
import { useRental } from "@/components/rental-context/RentalProvider";

export function CartButton({ className }: { className: string }) {
  const { itemCount, openCart } = useRental();

  return (
    <button
      type="button"
      aria-label={itemCount === 0 ? "Cart" : `Cart, ${itemCount} items added`}
      onClick={openCart}
      className={className}
    >
      <ShoppingCart aria-hidden="true" className="size-5" />
    </button>
  );
}
