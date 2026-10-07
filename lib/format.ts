import type { Product } from "@/types/product";

const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatRent(perDayRent: number): string {
  return rupees.format(perDayRent);
}

export function formatBookedCount(bookedCount: number): string {
  if (bookedCount < 1000) {
    return String(bookedCount);
  }

  return `${Math.floor(bookedCount / 100) / 10}k+`;
}

export function isRentable(product: Product): boolean {
  return !product.out_of_stock && product.tag !== "Vote to Launch";
}
