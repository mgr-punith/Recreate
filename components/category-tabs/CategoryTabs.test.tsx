import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CategoryTabs } from "@/components/category-tabs/CategoryTabs";

describe("CategoryTabs", () => {
  it("reveals a tab's sub-categories on hover and hides them again on leave", async () => {
    const user = userEvent.setup();
    render(<CategoryTabs />);

    expect(
      screen.queryByRole("link", { name: "DJI Drones" }),
    ).not.toBeInTheDocument();

    await user.hover(screen.getByRole("link", { name: "Photography" }));

    expect(screen.getByRole("link", { name: "DJI Drones" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Action Camera Add ons" }),
    ).toBeInTheDocument();

    await user.unhover(screen.getByRole("link", { name: "Photography" }));

    expect(
      screen.queryByRole("link", { name: "DJI Drones" }),
    ).not.toBeInTheDocument();
  });

  it("shows only the hovered tab's sub-categories", async () => {
    const user = userEvent.setup();
    render(<CategoryTabs />);

    await user.hover(screen.getByRole("link", { name: "Entertainment" }));

    expect(screen.getByRole("link", { name: "Projectors" })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "DJI Drones" }),
    ).not.toBeInTheDocument();
  });

  it("fills each menu column with four entries before starting the next", async () => {
    const user = userEvent.setup();
    const { container } = render(<CategoryTabs />);

    await user.hover(screen.getByRole("link", { name: "Photography" }));

    const columns = container.querySelectorAll(
      "[aria-label='Photography categories'] > div",
    );

    expect(columns).toHaveLength(6);
    expect(columns[0]?.textContent).toBe(
      "DJI DronesiPhonesCamerasPocket Cameras",
    );
    expect(columns[5]?.textContent).toBe(
      "Action Camera MountsAction Camera Add ons",
    );
  });

  it("opens on focus and closes on Escape", async () => {
    const user = userEvent.setup();
    render(<CategoryTabs />);

    await user.tab();

    expect(screen.getByRole("link", { name: "Photography" })).toHaveFocus();
    expect(screen.getByRole("link", { name: "DJI Drones" })).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("link", { name: "DJI Drones" }),
    ).not.toBeInTheDocument();
  });
});
