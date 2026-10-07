import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProductGrid } from "@/components/product-grid/ProductGrid";
import { ProductStrip } from "@/components/product-strip/ProductStrip";
import { RentalProvider } from "@/components/rental-context/RentalProvider";
import { SavedButton } from "@/components/saved/SavedButton";
import { SavedProvider } from "@/components/saved-context/SavedProvider";
import type { Product } from "@/types/product";

const image =
  "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5.webp";

function row(id: number, name: string, overrides: Partial<Product> = {}): Product {
  return {
    id,
    name,
    image,
    rating: 4.6,
    booked_count: 100 + id,
    tag: "",
    per_day_rent: 200,
    out_of_stock: false,
    ...overrides,
  };
}

const named = [
  row(1, "PS5 + Games (100+) + 1 Controller", {
    tag: "Trending",
    booked_count: 649,
  }),
  row(2, "PS5 Mega Racing Wheel Combo", {
    per_day_rent: 310,
    rating: 4.8,
    out_of_stock: true,
  }),
  row(3, "PS5 + FC27 + 1 Controller", {
    per_day_rent: 250,
    tag: "New",
    rating: 0,
  }),
  row(4, "PS5 + FC26 + 4 Controllers", {
    per_day_rent: 310,
    tag: "New",
    rating: 4.8,
  }),
  row(5, "PS5 + EA Play + 1 Controller", { per_day_rent: 180, rating: 4.5 }),
  row(6, "God Of War Ragnarök + 1 Controller (Digital Game)"),
  row(7, "Cricket 24 + 2 Controllers (Digital Game)", { rating: 4.8 }),
  row(8, "PS5 All in one Combo + 2 Controllers", {
    per_day_rent: 440,
    tag: "Trending",
  }),
  row(9, "PS5 + FC26 + 2 Controllers", {
    per_day_rent: 310,
    tag: "New",
    rating: 4.8,
  }),
];

// The rest of the catalogue is the same bundle repeated, so search and paging have enough to work on.
const fillers = Array.from({ length: 16 }, (_, index) =>
  row(10 + index, `PS5 Bundle ${10 + index}`),
);

const products = [...named, ...fillers];
const inStock = products.filter((product) => !product.out_of_stock).length;
const bundles = products.filter((product) => product.name.includes("Bundle")).length;

async function renderGrid() {
  const user = userEvent.setup();

  render(
    <RentalProvider products={products}>
      <SavedProvider products={products}>
        <ProductGrid products={products} />
      </SavedProvider>
    </RentalProvider>,
  );

  // The picker greets every visitor and marks the page behind it inert.
  await user.click(screen.getByRole("button", { name: "Close date picker" }));

  return user;
}

const searchBox = () => screen.getByLabelText("Search gaming gadgets");
const results = (shown: number, total: number) =>
  screen.getByText(`Showing ${shown} of ${total} results`);

describe("ProductGrid", () => {
  it("shows only the gadgets matching the search", async () => {
    const user = await renderGrid();

    await user.type(searchBox(), "racing");

    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: /racing wheel/i }),
    ).toBeInTheDocument();
    expect(results(1, 1)).toBeInTheDocument();
  });

  it("brings the whole catalogue back when the search is cleared", async () => {
    const user = await renderGrid();

    await user.type(searchBox(), "racing");
    await user.clear(searchBox());

    expect(screen.getAllByRole("article")).toHaveLength(12);
    expect(results(12, products.length)).toBeInTheDocument();
  });

  it("says so when nothing matches, and clears the filters on request", async () => {
    const user = await renderGrid();

    await user.type(searchBox(), "drone");

    expect(screen.queryAllByRole("article")).toHaveLength(0);
    expect(screen.getByText(/no gadgets match/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear filters" }));

    expect(searchBox()).toHaveValue("");
    expect(screen.getAllByRole("article")).toHaveLength(12);
    expect(results(12, products.length)).toBeInTheDocument();
  });

  it("narrows the grid to the gadgets behind a quick filter", async () => {
    const user = await renderGrid();

    await user.click(screen.getByRole("button", { name: "Trending" }));

    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(results(2, 2)).toBeInTheDocument();
  });

  it("drops the out of stock gadgets when the stock filter is on", async () => {
    const user = await renderGrid();

    await user.click(screen.getByRole("button", { name: "In stock only" }));

    expect(
      screen.queryByRole("button", { name: /out of stock/i }),
    ).not.toBeInTheDocument();
    expect(results(12, inStock)).toBeInTheDocument();
  });

  it("hides the promo banners once a filter is on", async () => {
    const user = await renderGrid();

    expect(
      screen.getByRole("link", { name: /asset partner/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Trending" }));

    expect(
      screen.queryByRole("link", { name: /asset partner/i }),
    ).not.toBeInTheDocument();
  });

  it("reorders the grid when the sorting changes", async () => {
    const user = await renderGrid();

    await user.selectOptions(screen.getByLabelText("Sort by"), "price-asc");

    expect(screen.getAllByRole("heading", { level: 3 })[0]).toHaveTextContent(
      "PS5 + EA Play + 1 Controller",
    );
  });

  it("starts the results again from the first page when a filter changes", async () => {
    const user = await renderGrid();

    await user.click(screen.getByRole("button", { name: "Show More" }));
    expect(results(24, products.length)).toBeInTheDocument();

    await user.type(searchBox(), "bundle");

    expect(results(12, bundles)).toBeInTheDocument();
  });

  it("carries a save from the grid into the header count and the rail", async () => {
    const user = userEvent.setup();

    render(
      <RentalProvider products={products}>
        <SavedProvider products={products}>
          <SavedButton />
          <ProductGrid products={products} />
          <ProductStrip list="saved" />
        </SavedProvider>
      </RentalProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Close date picker" }));

    expect(
      screen.queryByRole("link", { name: /saved/i }),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: `Save ${named[0].name} for later` }),
    );

    expect(screen.getByRole("link", { name: "Saved (1)" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Saved for later" }),
    ).toBeInTheDocument();
  });
});
