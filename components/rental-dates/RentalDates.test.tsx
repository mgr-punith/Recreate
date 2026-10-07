import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  RentalProvider,
  useRental,
} from "@/components/rental-context/RentalProvider";
import {
  RentalDatesBar,
  RentalDatesPill,
} from "@/components/rental-dates/RentalDates";
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

function SetDatesButton() {
  const { saveDates } = useRental();

  return (
    <button
      type="button"
      onClick={() => saveDates({ delivery: "2026-10-14", pickup: "2026-10-22" })}
    >
      Set dates
    </button>
  );
}

function renderDates() {
  render(
    <RentalProvider products={products}>
      <SetDatesButton />
      <header>
        <RentalDatesBar />
        <RentalDatesPill />
      </header>
    </RentalProvider>,
  );
}

// The cart drawer renders the same dates, so the top bar has to be scoped.
const topBar = () => within(screen.getByRole("banner"));

describe("rental dates in the top bar", () => {
  it("asks for rental dates while none are chosen", () => {
    renderDates();

    expect(topBar().getByRole("button", { name: "Delivery Date" })).toBeInTheDocument();
    expect(topBar().getByRole("button", { name: "Pickup Date" })).toBeInTheDocument();
    expect(topBar().getByText("Select Rental Dates")).toBeInTheDocument();
    expect(topBar().getAllByRole("button", { name: "Select" })).toHaveLength(2);
  });

  it("shows the chosen dates in the top bar", async () => {
    const user = userEvent.setup();
    renderDates();

    await user.click(screen.getByRole("button", { name: "Set dates" }));

    expect(
      topBar().getByRole("button", { name: "Delivery Date: 14th Oct" }),
    ).toBeInTheDocument();
    expect(
      topBar().getByRole("button", { name: "Pickup Date: 22nd Oct" }),
    ).toBeInTheDocument();
    expect(topBar().getByText("14th Oct - 22nd Oct")).toBeInTheDocument();
    expect(topBar().queryByText("Select Rental Dates")).not.toBeInTheDocument();
    expect(topBar().getAllByRole("button", { name: "Edit" })).toHaveLength(2);
  });

  it("reopens the picker on the chosen dates", async () => {
    const user = userEvent.setup();
    renderDates();

    await user.click(screen.getByRole("button", { name: "Set dates" }));
    await user.click(topBar().getAllByRole("button", { name: "Edit" })[0]);

    expect(
      screen.getByRole("dialog", { name: "Select your Dates" }),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("Oct 14, 2026")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Oct 22, 2026")).toBeInTheDocument();
  });
});
