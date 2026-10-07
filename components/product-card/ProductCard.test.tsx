import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductCard } from "@/components/product-card/ProductCard";
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

describe("ProductCard", () => {
  it("shows the per-day rent and offers to add a rentable product to the cart", () => {
    render(<ProductCard product={product()} />);

    expect(screen.getByText("₹200")).toBeInTheDocument();
    expect(screen.getByText("/day")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add .* to cart/i }),
    ).toBeEnabled();
  });

  it("cannot be added to the cart once the product is out of stock", () => {
    render(<ProductCard product={product({ out_of_stock: true })} />);

    expect(
      screen.getByRole("button", { name: /out of stock/i }),
    ).toBeDisabled();
  });

  it("asks for a vote instead of a rental while a product is launching", () => {
    render(<ProductCard product={product({ tag: "Vote to Launch" })} />);

    expect(
      screen.getByRole("button", { name: /vote for .*/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /add .* to cart/i }),
    ).not.toBeInTheDocument();
  });

  it("shows the rating once a product has reviews", () => {
    render(<ProductCard product={product()} />);

    expect(screen.getByText("4.6")).toBeInTheDocument();
  });

  it("leaves the rating out while a product has no reviews", () => {
    render(<ProductCard product={product({ rating: 0 })} />);

    expect(screen.queryByText("0")).not.toBeInTheDocument();
    expect(screen.getByText(/649 booked/)).toBeInTheDocument();
  });

  it("shows a badge only when the product carries a tag", () => {
    const { rerender } = render(
      <ProductCard product={product({ tag: "Trending" })} />,
    );
    expect(screen.getByText("Trending")).toBeInTheDocument();

    rerender(<ProductCard product={product({ tag: "" })} />);
    expect(screen.queryByText("Trending")).not.toBeInTheDocument();
  });

  it("shortens a large booking count", () => {
    render(<ProductCard product={product({ booked_count: 2527 })} />);

    expect(screen.getByText(/2\.5k\+ booked/)).toBeInTheDocument();
  });
});
