import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CartButton } from "@/components/cart/CartButton";
import {
  RentalProvider,
  useRental,
} from "@/components/rental-context/RentalProvider";
import type { Product } from "@/types/product";

const products: Product[] = [
  {
    id: 18273,
    name: "PS5 + Games (100+) + 1 Controller",
    image: "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5.webp",
    rating: 4.6,
    booked_count: 649,
    tag: "",
    per_day_rent: 200,
    out_of_stock: false,
  },
];

function AddButton({ times }: { times: number }) {
  const { addToCart } = useRental();

  return (
    <button
      type="button"
      onClick={() => {
        for (let count = 0; count < times; count += 1) {
          addToCart(products[0].id);
        }
      }}
    >
      Add
    </button>
  );
}

function renderHeader() {
  const user = userEvent.setup();
  render(
    <RentalProvider products={products}>
      <CartButton className="size-10" />
      <AddButton times={2} />
    </RentalProvider>,
  );

  return user;
}

describe("CartButton", () => {
  it("carries no count while the cart is empty", () => {
    renderHeader();

    const button = screen.getByRole("button", { name: "Cart" });

    expect(within(button).queryByText(/\d/)).not.toBeInTheDocument();
  });

  it("shows how many items are in the cart", async () => {
    const user = renderHeader();

    // One click adds two copies: a second click would land on the page behind
    // the drawer, which the provider marks inert.
    await user.click(screen.getByRole("button", { name: "Add" }));

    const button = screen.getByRole("button", {
      name: "Cart, 2 items added",
    });

    expect(within(button).getByText("2")).toBeInTheDocument();
  });
});
