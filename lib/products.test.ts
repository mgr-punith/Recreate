import { describe, expect, it } from "vitest";
import { getProducts } from "./products";

describe("getProducts", () => {
  it("returns all 23 products from the data file", () => {
    expect(getProducts()).toHaveLength(23);
  });

  it("gives every product a tag the badge can render", () => {
    const tags = ["Trending", "New", "Vote to Launch", ""];

    for (const product of getProducts()) {
      expect(tags).toContain(product.tag);
    }
  });
});
