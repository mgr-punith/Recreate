import { describe, expect, it } from "vitest";
import {
  addLine,
  cartCount,
  cartItems,
  cartTotal,
  removeLine,
  setQuantity,
} from "@/lib/cart";
import type { Product } from "@/types/product";

function product(id: number, perDayRent: number): Product {
  return {
    id,
    name: `Product ${id}`,
    image: `https://images.sharepal.in/${id}.webp`,
    rating: 4.6,
    booked_count: 10,
    tag: "",
    per_day_rent: perDayRent,
    out_of_stock: false,
  };
}

describe("addLine", () => {
  it("adds a product that is not in the cart yet", () => {
    expect(addLine([], 1)).toEqual([{ productId: 1, quantity: 1 }]);
  });

  it("raises the quantity instead of adding the product twice", () => {
    expect(addLine(addLine([], 1), 1)).toEqual([
      { productId: 1, quantity: 2 },
    ]);
  });

  it("keeps other lines untouched", () => {
    expect(addLine([{ productId: 2, quantity: 3 }], 1)).toEqual([
      { productId: 2, quantity: 3 },
      { productId: 1, quantity: 1 },
    ]);
  });
});

describe("setQuantity", () => {
  it("changes the quantity of one line", () => {
    expect(setQuantity([{ productId: 1, quantity: 1 }], 1, 4)).toEqual([
      { productId: 1, quantity: 4 },
    ]);
  });

  it("removes the line when the quantity drops to zero", () => {
    expect(setQuantity([{ productId: 1, quantity: 1 }], 1, 0)).toEqual([]);
  });
});

describe("removeLine", () => {
  it("drops only the requested product", () => {
    const lines = [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 1 },
    ];

    expect(removeLine(lines, 1)).toEqual([{ productId: 2, quantity: 1 }]);
  });
});

describe("cartCount", () => {
  it("counts every unit rather than every line", () => {
    const lines = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ];

    expect(cartCount(lines)).toBe(5);
  });

  it("counts nothing in an empty cart", () => {
    expect(cartCount([])).toBe(0);
  });
});

describe("cartItems", () => {
  it("pairs every line with the product it refers to", () => {
    expect(cartItems([{ productId: 1, quantity: 2 }], [product(1, 200)])).toEqual(
      [{ line: { productId: 1, quantity: 2 }, product: product(1, 200) }],
    );
  });
});

describe("cartTotal", () => {
  it("charges every unit for every rental day", () => {
    expect(cartTotal([{ productId: 1, quantity: 2 }], [product(1, 200)], 7)).toBe(
      2800,
    );
  });

  it("adds the lines together", () => {
    const lines = [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 1 },
    ];

    expect(cartTotal(lines, [product(1, 200), product(2, 100)], 7)).toBe(2100);
  });

  it("totals nothing in an empty cart", () => {
    expect(cartTotal([], [product(1, 200)], 7)).toBe(0);
  });
});
