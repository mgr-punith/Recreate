"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { DatePickerDialog } from "@/components/date-picker/DatePickerDialog";
import {
  addLine,
  cartCount,
  cartTotal,
  removeLine,
  setQuantity,
  type CartLine,
} from "@/lib/cart";
import { isRentalReady, rentalDays, type RentalDates } from "@/lib/rental";
import type { Product } from "@/types/product";

interface RentalContextValue {
  products: Product[];
  dates: RentalDates | null;
  days: number;
  canRent: boolean;
  lines: CartLine[];
  itemCount: number;
  total: number;
  isDatePickerOpen: boolean;
  isCartOpen: boolean;
  quantityOf: (productId: number) => number;
  saveDates: (dates: RentalDates) => void;
  openDatePicker: () => void;
  closeDatePicker: () => void;
  addToCart: (productId: number) => void;
  changeQuantity: (productId: number, quantity: number) => void;
  dropLine: (productId: number) => void;
  openCart: () => void;
  closeCart: () => void;
}

const RentalContext = createContext<RentalContextValue | null>(null);

export function RentalProvider({
  products,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) {
  const [dates, setDates] = useState<RentalDates | null>(null);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  const days = dates ? rentalDays(dates) : 0;
  const isOverlayOpen = isDatePickerOpen || isCartOpen;

  // The original greets every visitor with the picker. Waiting for the client
  // keeps the server's idea of today out of the calendar.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- today is a browser value, so the picker can only open after the first render
    setDatePickerOpen(true);
  }, []);

  useEffect(() => {
    if (!isOverlayOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOverlayOpen]);

  useEffect(() => {
    if (!isOverlayOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      if (isDatePickerOpen) {
        setDatePickerOpen(false);
      } else {
        setCartOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOverlayOpen, isDatePickerOpen]);

  const value: RentalContextValue = {
    products,
    dates,
    days,
    canRent: isRentalReady(dates),
    lines,
    itemCount: cartCount(lines),
    total: cartTotal(lines, products, days),
    isDatePickerOpen,
    isCartOpen,
    quantityOf: (productId) =>
      lines.find((line) => line.productId === productId)?.quantity ?? 0,
    saveDates: (next) => {
      setDates(next);
      setDatePickerOpen(false);
    },
    openDatePicker: () => setDatePickerOpen(true),
    closeDatePicker: () => setDatePickerOpen(false),
    addToCart: (productId) => {
      setLines((current) => addLine(current, productId));
      setCartOpen(true);
    },
    changeQuantity: (productId, quantity) =>
      setLines((current) => setQuantity(current, productId, quantity)),
    dropLine: (productId) =>
      setLines((current) => removeLine(current, productId)),
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
  };

  return (
    <RentalContext value={value}>
      <div className="contents" inert={isOverlayOpen}>
        {children}
      </div>
      <CartDrawer />
      {isDatePickerOpen && <DatePickerDialog />}
    </RentalContext>
  );
}

export function useRental(): RentalContextValue {
  const value = useContext(RentalContext);

  if (!value) {
    throw new Error("useRental must be used inside RentalProvider");
  }

  return value;
}
