import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProductCard } from "@/components/product-card/ProductCard";
import { RentalProvider } from "@/components/rental-context/RentalProvider";
import { SavedProvider } from "@/components/saved-context/SavedProvider";
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

function renderCard(card: Product) {
  render(
    <RentalProvider products={[card]}>
      <SavedProvider products={[card]}>
        <ProductCard product={card} />
      </SavedProvider>
    </RentalProvider>,
  );
}

function availableDays() {
  return screen
    .getAllByRole("button", { name: /, \d{4}$/ })
    .filter((day) => !day.matches(":disabled"));
}

// The first available day is today, so the ninth is eight days later and the
// seven days between them are chargeable.
async function chooseOneWeek() {
  const user = userEvent.setup();
  const days = availableDays();
  await user.click(days[0]);
  await user.click(days[8]);
  await user.click(screen.getByRole("button", { name: "Continue" }));
}

describe("ProductCard", () => {
  it("hides the price until rental dates are chosen", () => {
    renderCard(product());

    expect(screen.getByText("Select Dates to view price")).toBeInTheDocument();
    expect(screen.queryByText(/^Rent for/)).not.toBeInTheDocument();
    expect(screen.queryByText("Incl. of GST")).not.toBeInTheDocument();
  });

  it("reveals the total for the chosen rental period", async () => {
    renderCard(product());
    await chooseOneWeek();

    expect(screen.getByText("Rent for 7 days")).toBeInTheDocument();
    expect(screen.getByText("₹1,400")).toBeInTheDocument();
    expect(screen.getByText("Incl. of GST")).toBeInTheDocument();
    expect(
      screen.queryByText("Select Dates to view price"),
    ).not.toBeInTheDocument();
  });

  it("asks for rental dates before a product can be added", async () => {
    const user = userEvent.setup();
    renderCard(product());

    await user.click(screen.getByRole("button", { name: "Close date picker" }));
    expect(
      screen.queryByRole("dialog", { name: "Select your Dates" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /add .* to cart/i }));

    expect(
      screen.getByRole("dialog", { name: "Select your Dates" }),
    ).toBeInTheDocument();
  });

  it("opens the date picker from the price placeholder", async () => {
    const user = userEvent.setup();
    renderCard(product());

    await user.click(screen.getByRole("button", { name: "Close date picker" }));
    await user.click(
      screen.getByRole("button", { name: "Select Dates to view price" }),
    );

    expect(
      screen.getByRole("dialog", { name: "Select your Dates" }),
    ).toBeInTheDocument();
  });

  it("adds the product to the open cart once dates are chosen", async () => {
    const user = userEvent.setup();
    renderCard(product());
    await chooseOneWeek();

    await user.click(screen.getByRole("button", { name: /add .* to cart/i }));

    expect(screen.getByRole("dialog", { name: "Cart" })).toBeInTheDocument();
    expect(screen.getByText("1 items added")).toBeInTheDocument();

    const card = within(screen.getByRole("article"));
    expect(card.getByText("1")).toBeInTheDocument();
    expect(
      card.queryByRole("button", { name: /add .* to cart/i }),
    ).not.toBeInTheDocument();
  });

  it("cannot be added to the cart once the product is out of stock", () => {
    renderCard(product({ out_of_stock: true }));

    expect(
      screen.getByRole("button", { name: /out of stock/i }),
    ).toBeDisabled();
  });

  it("asks for a vote instead of a rental while a product is launching", () => {
    renderCard(product({ tag: "Vote to Launch" }));

    expect(
      screen.getByRole("button", { name: /vote for .*/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /add .* to cart/i }),
    ).not.toBeInTheDocument();
  });

  it("shows the rating once a product has reviews", () => {
    renderCard(product());

    expect(screen.getByText("4.6")).toBeInTheDocument();
  });

  it("leaves the rating out while a product has no reviews", () => {
    renderCard(product({ rating: 0 }));

    expect(screen.queryByText("0")).not.toBeInTheDocument();
    expect(screen.getByText(/649 booked/)).toBeInTheDocument();
  });

  it("shows a badge only when the product carries a tag", () => {
    const trending = product({ tag: "Trending" });
    const plain = product();
    const { rerender } = render(
      <RentalProvider products={[trending]}>
        <SavedProvider products={[trending]}>
          <ProductCard product={trending} />
        </SavedProvider>
      </RentalProvider>,
    );
    expect(screen.getByText("Trending")).toBeInTheDocument();

    rerender(
      <RentalProvider products={[plain]}>
        <SavedProvider products={[plain]}>
          <ProductCard product={plain} />
        </SavedProvider>
      </RentalProvider>,
    );
    expect(screen.queryByText("Trending")).not.toBeInTheDocument();
  });

  it("shortens a large booking count", () => {
    renderCard(product({ booked_count: 2527 }));

    expect(screen.getByText(/2\.5k\+ booked/)).toBeInTheDocument();
  });

  it("fills the heart once a gadget is saved, and empties it again", async () => {
    const user = userEvent.setup();
    const name = product().name;
    renderCard(product());

    await user.click(screen.getByRole("button", { name: "Close date picker" }));

    expect(
      screen.getByRole("button", { name: `Save ${name} for later` }),
    ).toHaveAttribute("aria-pressed", "false");

    await user.click(
      screen.getByRole("button", { name: `Save ${name} for later` }),
    );

    expect(
      screen.getByRole("button", { name: `Remove ${name} from saved` }),
    ).toHaveAttribute("aria-pressed", "true");

    await user.click(
      screen.getByRole("button", { name: `Remove ${name} from saved` }),
    );

    expect(
      screen.getByRole("button", { name: `Save ${name} for later` }),
    ).toHaveAttribute("aria-pressed", "false");
  });
});
