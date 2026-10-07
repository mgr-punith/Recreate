import { describe, expect, it } from "vitest";
import {
  addRecentItem,
  emptySaved,
  parseSaved,
  RECENT_LIMIT,
  resolveProducts,
  toggleSavedItem,
} from "@/lib/saved";
import type { Product } from "@/types/product";

function product(id: number): Product {
  return {
    id,
    name: `Gadget ${id}`,
    image: "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5.webp",
    rating: 4.6,
    booked_count: 100,
    tag: "",
    per_day_rent: 200,
    out_of_stock: false,
  };
}

const catalogue = [product(1), product(2), product(3)];

describe("toggleSavedItem", () => {
  it("keeps the newest save first", () => {
    expect(toggleSavedItem([], 7)).toEqual([7]);
    expect(toggleSavedItem([7], 9)).toEqual([9, 7]);
  });

  it("takes an item back out when it is already saved", () => {
    expect(toggleSavedItem([9, 7], 9)).toEqual([7]);
  });
});

describe("addRecentItem", () => {
  it("moves a product that was seen before back to the front", () => {
    expect(addRecentItem([3, 2, 1], 1)).toEqual([1, 3, 2]);
  });

  it("keeps the list capped so the rail stays a glance, not a history", () => {
    const full = Array.from({ length: RECENT_LIMIT }, (_, index) => index);

    const next = addRecentItem(full, 99);

    expect(next).toHaveLength(RECENT_LIMIT);
    expect(next[0]).toBe(99);
    expect(next).not.toContain(RECENT_LIMIT - 1);
  });

  it("returns the same list when the newest product is seen again", () => {
    const recent = [3, 2, 1];

    expect(addRecentItem(recent, 3)).toBe(recent);
  });
});

describe("resolveProducts", () => {
  it("returns the products in the order they were saved", () => {
    expect(resolveProducts(catalogue, [3, 1]).map((p) => p.id)).toEqual([3, 1]);
  });

  it("skips an id the catalogue no longer has", () => {
    expect(resolveProducts(catalogue, [1, 404]).map((p) => p.id)).toEqual([1]);
  });
});

describe("parseSaved", () => {
  it("reads back what it stored", () => {
    expect(parseSaved('{"saved":[4],"recent":[5,6]}')).toEqual({
      saved: [4],
      recent: [5, 6],
    });
  });

  it("starts empty when nothing has been stored", () => {
    expect(parseSaved(null)).toEqual(emptySaved);
  });

  it("starts empty rather than throwing on storage it did not write", () => {
    expect(parseSaved("not json")).toEqual(emptySaved);
    expect(parseSaved('"a string"')).toEqual(emptySaved);
    expect(parseSaved('{"saved":"nope","recent":[1,"two"]}')).toEqual({
      saved: [],
      recent: [1],
    });
  });
});
