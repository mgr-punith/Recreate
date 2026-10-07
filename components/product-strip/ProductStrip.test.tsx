import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ProductStrip } from "@/components/product-strip/ProductStrip";
import { RentalProvider } from "@/components/rental-context/RentalProvider";
import { SavedProvider } from "@/components/saved-context/SavedProvider";
import { savedStorageKey } from "@/lib/saved";
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

const ps5 = product();
const wheel = product({
  id: 2,
  name: "PS5 Mega Racing Wheel Combo",
  per_day_rent: 310,
  out_of_stock: true,
});

const catalogue = [ps5, wheel];

// The rail reads what an earlier visit left behind, which is how it is meant to work.
function seedLists(saved: number[], recent: number[]) {
  window.localStorage.setItem(
    savedStorageKey,
    JSON.stringify({ saved, recent }),
  );
}

async function renderRail(list: "saved" | "recent") {
  const user = userEvent.setup();

  render(
    <RentalProvider products={catalogue}>
      <SavedProvider products={catalogue}>
        <ProductStrip list={list} />
      </SavedProvider>
    </RentalProvider>,
  );

  await user.click(screen.getByRole("button", { name: "Close date picker" }));

  return user;
}

const railTitle = (name: string) => screen.queryByRole("heading", { name });

beforeEach(() => {
  window.localStorage.clear();
});

describe("ProductStrip", () => {
  it("stays out of the way until a gadget is saved", async () => {
    await renderRail("saved");

    expect(railTitle("Saved for later")).not.toBeInTheDocument();
  });

  it("brings saved gadgets back on a later visit", async () => {
    seedLists([wheel.id, ps5.id], []);

    await renderRail("saved");

    expect(
      await screen.findByRole("heading", { name: "Saved for later" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: wheel.name })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: ps5.name })).toBeInTheDocument();
  });

  it("drops a saved gadget that is no longer in the catalogue", async () => {
    seedLists([9999], []);

    await renderRail("saved");

    expect(railTitle("Saved for later")).not.toBeInTheDocument();
  });

  it("asks for rental dates before it will price a saved gadget", async () => {
    seedLists([ps5.id], []);

    await renderRail("saved");

    expect(
      await screen.findByText("Select Dates to view price"),
    ).toBeInTheDocument();
  });

  it("will not offer to add a saved gadget that is out of stock", async () => {
    seedLists([wheel.id], []);

    await renderRail("saved");

    expect(await screen.findByText("Out of Stock")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: `Add ${wheel.name} to cart` }),
    ).not.toBeInTheDocument();
  });

  it("takes a gadget out of the rail when it is removed", async () => {
    seedLists([ps5.id], []);

    const user = await renderRail("saved");
    await screen.findByRole("heading", { name: "Saved for later" });

    await user.click(
      screen.getByRole("button", { name: `Remove ${ps5.name} from saved` }),
    );

    expect(railTitle("Saved for later")).not.toBeInTheDocument();
  });

  it("shows the gadgets from an earlier visit as recently viewed", async () => {
    seedLists([], [wheel.id]);

    await renderRail("recent");

    expect(
      await screen.findByRole("heading", { name: "Recently viewed" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: wheel.name })).toBeInTheDocument();
  });

  it("offers no remove control on the recently viewed rail", async () => {
    seedLists([], [ps5.id]);

    await renderRail("recent");
    await screen.findByRole("heading", { name: "Recently viewed" });

    expect(
      screen.queryByRole("button", { name: `Remove ${ps5.name} from saved` }),
    ).not.toBeInTheDocument();
  });
});
