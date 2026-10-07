import { describe, expect, it } from "vitest";
import {
  filterProducts,
  hasActiveFilters,
  noFilters,
  sortProducts,
} from "@/lib/catalogue";
import type { Product } from "@/types/product";

function product(overrides: Partial<Product> = {}): Product {
  return {
    id: 1,
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

const portal = product({
  id: 2,
  name: "PlayStation Portal Remote Player",
  tag: "Vote to Launch",
  per_day_rent: 158.25,
  rating: 0,
  booked_count: 10000,
});
const racingWheel = product({
  id: 3,
  name: "PS5 Mega Racing Wheel Combo",
  per_day_rent: 310,
  out_of_stock: true,
});
const fc27 = product({
  id: 4,
  name: "PS5 + FC27 + 2 Controllers",
  tag: "New",
  per_day_rent: 300,
  rating: 0,
  booked_count: 652,
});

const catalogue = [product({ tag: "Trending" }), portal, racingWheel, fc27];

describe("filterProducts", () => {
  it("keeps the products whose name contains the search text", () => {
    const matches = filterProducts(catalogue, {
      ...noFilters,
      query: "racing wheel",
    });

    expect(matches).toEqual([racingWheel]);
  });

  it("ignores case and spare spaces in the search", () => {
    const matches = filterProducts(catalogue, {
      ...noFilters,
      query: "  portal ",
    });

    expect(matches).toEqual([portal]);
  });

  it("keeps only the products carrying a selected chip", () => {
    const matches = filterProducts(catalogue, {
      ...noFilters,
      quick: ["trending"],
    });

    expect(matches.map((match) => match.tag)).toEqual(["Trending"]);
  });

  it("keeps a product that matches any of the selected chips", () => {
    const matches = filterProducts(catalogue, {
      ...noFilters,
      quick: ["new", "trending"],
    });

    expect(matches).toHaveLength(2);
    expect(matches).toContain(fc27);
  });

  it("drops out of stock products when the stock filter is on", () => {
    const matches = filterProducts(catalogue, {
      ...noFilters,
      inStockOnly: true,
    });

    expect(matches).not.toContain(racingWheel);
    expect(matches).toHaveLength(3);
  });

  it("returns nothing when no product matches", () => {
    expect(filterProducts(catalogue, { ...noFilters, query: "drone" })).toEqual(
      [],
    );
  });
});

describe("sortProducts", () => {
  it("leaves the given order alone for the recommended sort", () => {
    expect(sortProducts(catalogue, "recommended")).toBe(catalogue);
  });

  it("puts the cheapest product first when sorting by price", () => {
    const sorted = sortProducts(catalogue, "price-asc");

    expect(sorted[0]).toBe(portal);
    expect(sorted.at(-1)).toBe(racingWheel);
  });

  it("puts the dearest product first when sorting the other way", () => {
    expect(sortProducts(catalogue, "price-desc")[0]).toBe(racingWheel);
  });

  it("puts unrated products last when sorting by rating", () => {
    const sorted = sortProducts(catalogue, "rating");

    expect(sorted.slice(0, 2).map((entry) => entry.rating)).toEqual([4.6, 4.6]);
    expect(sorted.slice(2).every((entry) => entry.rating === 0)).toBe(true);
  });

  it("puts the most booked product first when sorting by bookings", () => {
    expect(sortProducts(catalogue, "booked")[0]).toBe(portal);
  });
});

describe("hasActiveFilters", () => {
  it("reports when no filter is narrowing the catalogue", () => {
    expect(hasActiveFilters(noFilters)).toBe(false);
    expect(hasActiveFilters({ ...noFilters, query: "   " })).toBe(false);
  });

  it("reports each kind of filter", () => {
    expect(hasActiveFilters({ ...noFilters, query: "ps5" })).toBe(true);
    expect(hasActiveFilters({ ...noFilters, quick: ["new"] })).toBe(true);
    expect(hasActiveFilters({ ...noFilters, inStockOnly: true })).toBe(true);
  });
});
