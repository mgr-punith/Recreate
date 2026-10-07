import { describe, expect, it } from "vitest";
import { formatBookedCount, formatRent, isRentable } from "@/lib/format";
import type { Product } from "@/types/product";

function product(overrides: Partial<Product> = {}): Product {
  return {
    id: 18273,
    name: "PS5 + Games (100+) + 1 Controller",
    image: "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5.webp",
    rating: 4.6,
    booked_count: 649,
    tag: "",
    per_day_rent: 200,
    out_of_stock: false,
    ...overrides,
  };
}

describe("formatRent", () => {
  it("shows a whole-rupee rent as an INR amount", () => {
    expect(formatRent(200)).toBe("₹200");
  });

  it("keeps the paise when a rent is a decimal", () => {
    expect(formatRent(158.25)).toBe("₹158.25");
  });
});

describe("formatBookedCount", () => {
  it("shows counts under a thousand as they are", () => {
    expect(formatBookedCount(649)).toBe("649");
  });

  it("shortens counts over a thousand to one decimal place", () => {
    expect(formatBookedCount(2527)).toBe("2.5k+");
  });

  it("drops the decimal when the shortened count is exact", () => {
    expect(formatBookedCount(1000)).toBe("1k+");
  });
});

describe("isRentable", () => {
  it("is true for a product in stock", () => {
    expect(isRentable(product())).toBe(true);
  });

  it("is false for a product that is out of stock", () => {
    expect(isRentable(product({ out_of_stock: true }))).toBe(false);
  });

  it("is false for a product that is still gathering votes", () => {
    expect(isRentable(product({ tag: "Vote to Launch" }))).toBe(false);
  });
});
