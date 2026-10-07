import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
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

function OpenPickerButton() {
  const { openDatePicker } = useRental();

  return (
    <button type="button" onClick={openDatePicker}>
      Open picker
    </button>
  );
}

function renderPicker() {
  render(
    <RentalProvider products={products}>
      <OpenPickerButton />
    </RentalProvider>,
  );
}

function availableDays() {
  return screen
    .getAllByRole("button", { name: /, \d{4}$/ })
    .filter((day) => !day.matches(":disabled"));
}

describe("DatePickerDialog", () => {
  it("greets the visitor with the picker", () => {
    renderPicker();

    expect(
      screen.getByRole("dialog", { name: "Select your Dates" }),
    ).toBeInTheDocument();
  });

  it("cannot be continued until both dates are chosen", async () => {
    const user = userEvent.setup();
    renderPicker();

    const continueButton = screen.getByRole("button", { name: "Continue" });
    expect(continueButton).toBeDisabled();

    await user.click(availableDays()[0]);
    expect(continueButton).toBeDisabled();
    expect(screen.getByText("00")).toBeInTheDocument();
    expect(screen.getByText("Day")).toBeInTheDocument();
    expect(screen.getByText(/Chargeable Period: --/)).toBeInTheDocument();

    await user.click(availableDays()[8]);
    expect(continueButton).toBeEnabled();
  });

  it("counts only the days between delivery and pickup", async () => {
    const user = userEvent.setup();
    renderPicker();
    const days = availableDays();

    await user.click(days[0]);
    await user.click(days[8]);

    expect(screen.getByText("07")).toBeInTheDocument();
    expect(screen.getByText("Days")).toBeInTheDocument();
    expect(
      screen.getByText(/Chargeable Period: \d+\w\w \w\w\w - \d+\w\w \w\w\w/),
    ).toBeInTheDocument();
  });

  it("saves the dates, closes, and reopens on them", async () => {
    const user = userEvent.setup();
    renderPicker();
    const days = availableDays();

    await user.click(days[0]);
    await user.click(days[8]);
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(
      screen.queryByRole("dialog", { name: "Select your Dates" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open picker" }));

    expect(screen.getAllByDisplayValue(/\w\w\w \d{1,2}, \d{4}/)).toHaveLength(2);
  });

  it("closes on Escape without saving the dates", async () => {
    const user = userEvent.setup();
    renderPicker();

    await user.click(availableDays()[0]);
    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("dialog", { name: "Select your Dates" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open picker" }));

    expect(
      screen.queryByDisplayValue(/\w\w\w \d{1,2}, \d{4}/),
    ).not.toBeInTheDocument();
  });
});
