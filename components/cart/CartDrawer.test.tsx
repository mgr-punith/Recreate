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

const ps5 = products[0];

function AddButton() {
  const { addToCart } = useRental();

  return (
    <button type="button" onClick={() => addToCart(ps5.id)}>
      Add
    </button>
  );
}

function availableDays() {
  return screen
    .getAllByRole("button", { name: /, \d{4}$/ })
    .filter((day) => !day.matches(":disabled"));
}

// The cart prices every line over the chosen rental period, so the tests need
// dates before they can assert a total.
async function renderCart() {
  const user = userEvent.setup();
  render(
    <RentalProvider products={products}>
      <AddButton />
    </RentalProvider>,
  );

  const days = availableDays();
  await user.click(days[0]);
  await user.click(days[8]);
  await user.click(screen.getByRole("button", { name: "Continue" }));

  return user;
}

function cart() {
  return within(screen.getByRole("dialog", { name: "Cart" }));
}

describe("CartDrawer", () => {
  it("stays out of the way until something is added", async () => {
    await renderCart();

    expect(
      screen.queryByRole("dialog", { name: "Cart" }),
    ).not.toBeInTheDocument();
  });

  it("opens from the header cart button while it is still empty", async () => {
    const user = userEvent.setup();
    render(
      <RentalProvider products={products}>
        <CartButton className="size-10" />
      </RentalProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Cart" }));

    expect(screen.getByRole("dialog", { name: "Cart" })).toBeInTheDocument();
    expect(screen.getByText("Nothing in your cart yet.")).toBeInTheDocument();
  });

  it("shows the added product over the chosen rental period", async () => {
    const user = await renderCart();

    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(cart().getByText(ps5.name)).toBeInTheDocument();
    expect(cart().getByText("Rent for 7 days")).toBeInTheDocument();
    expect(cart().getByText("₹1,400")).toBeInTheDocument();
  });

  it("counts a repeated product once and raises its quantity", async () => {
    const user = await renderCart();

    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(
      cart().getByRole("button", { name: /increase .* quantity/i }),
    );

    expect(cart().getByText("2 items added")).toBeInTheDocument();
    expect(cart().getByText("2")).toBeInTheDocument();
    expect(cart().getByText("₹2,800")).toBeInTheDocument();
  });

  it("drops the line when its quantity reaches zero", async () => {
    const user = await renderCart();

    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(
      cart().getByRole("button", { name: /decrease .* quantity/i }),
    );

    expect(cart().getByText("Nothing in your cart yet.")).toBeInTheDocument();
    expect(cart().getByText("0 items added")).toBeInTheDocument();
  });

  it("empties the cart when the line is removed", async () => {
    const user = await renderCart();

    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(
      cart().getByRole("button", { name: /remove .* from cart/i }),
    );

    expect(cart().getByText("Nothing in your cart yet.")).toBeInTheDocument();
  });

  it("reopens the date picker over itself from the Edit button", async () => {
    const user = await renderCart();

    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(cart().getByRole("button", { name: "Edit" }));

    expect(
      screen.getByRole("dialog", { name: "Select your Dates" }),
    ).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const user = await renderCart();

    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByRole("dialog", { name: "Cart" })).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("dialog", { name: "Cart" }),
    ).not.toBeInTheDocument();
  });

  it("closes from its own close button", async () => {
    const user = await renderCart();

    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(cart().getByRole("button", { name: "Close cart" }));

    expect(
      screen.queryByRole("dialog", { name: "Cart" }),
    ).not.toBeInTheDocument();
  });
});
