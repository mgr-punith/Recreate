import { expect, test, type Page } from "@playwright/test";

const picker = (page: Page) =>
  page.getByRole("dialog", { name: "Select your Dates" });

// The picker greets every visitor, so anything that touches the page behind it
// has to send it away first.
async function dismissPicker(page: Page) {
  await picker(page).waitFor();
  await page.keyboard.press("Escape");
  await expect(picker(page)).toBeHidden();
}

// The first enabled day is today, so the ninth is eight days later and the
// seven days between them are the chargeable ones.
async function chooseRange(page: Page, from: number, to: number) {
  const days = picker(page)
    .getByRole("button", { name: /, \d{4}$/ })
    .and(picker(page).locator("button:enabled"));

  await days.nth(from).click();
  await days.nth(to).click();
  await picker(page).getByRole("button", { name: "Continue" }).click();
}

const chooseOneWeek = (page: Page) => chooseRange(page, 0, 8);

test("serves the home page", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("lists rentable gaming gadgets with their price hidden until dates are chosen", async ({
  page,
}) => {
  await page.goto("/");

  const cards = page.locator("article");
  await expect(cards.first()).toBeVisible();
  expect(await cards.count()).toBe(12);

  await expect(
    page.getByText("Select Dates to view price").first(),
  ).toBeVisible();
});

test("opens the catalogue with a promo and reveals the rest on demand", async ({
  page,
}) => {
  await page.goto("/");
  await dismissPicker(page);

  const cards = page.locator("article");
  expect(await cards.count()).toBe(12);

  const total = await page.getByText(/Showing 12 of (\d+) results/).textContent();
  const remaining = Number(total?.match(/of (\d+) results/)?.[1]);
  expect(remaining).toBeGreaterThan(12);

  await expect(page.getByRole("link", { name: /asset partner/i })).toBeVisible();

  await page.getByRole("button", { name: "Show More" }).click();

  expect(await cards.count()).toBe(remaining);
  await expect(
    page.getByText(`Showing ${remaining} of ${remaining} results`),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Show More" })).toBeHidden();
});

test("opens the empty cart from the cart icon", async ({ page }) => {
  await page.goto("/");
  await dismissPicker(page);

  await page.getByRole("button", { name: /^Cart/ }).click();

  const cart = page.locator('[role="dialog"][aria-label="Cart"]');
  await expect(cart).toBeVisible();
  await expect(cart.getByText("Nothing in your cart yet.")).toBeVisible();
});

test("reveals prices, then takes the rental into the cart", async ({ page }) => {
  await page.goto("/");

  await expect(picker(page)).toBeVisible();
  await chooseOneWeek(page);
  await expect(picker(page)).toBeHidden();

  const inTopBar =
    test.info().project.name === "mobile"
      ? page.locator("header").getByText(/\d+\w\w \w\w\w - \d+\w\w \w\w\w/)
      : page.getByRole("button", { name: /Delivery Date: \d/ });
  await expect(inTopBar).toBeVisible();

  await expect(page.getByText("Rent for 7 days").first()).toBeVisible();

  await page
    .getByRole("button", { name: /^Add .+ to cart$/ })
    .first()
    .click();

  const cart = page.locator('[role="dialog"][aria-label="Cart"]');
  await expect(cart).toBeVisible();
  await expect(cart).not.toHaveAttribute("aria-hidden", "true");
  await expect(cart.getByText("1 items added")).toBeVisible();
  await expect(cart.getByText("Rent for 7 days")).toBeVisible();
  await expect(cart.getByText("₹1,400")).toBeVisible();

  await cart
    .getByRole("button", { name: /Increase .+ quantity/ })
    .click();
  await expect(cart.getByText("₹2,800")).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);

  await page.keyboard.press("Escape");
  await expect(cart).toHaveAttribute("aria-hidden", "true");

  const cartTrigger =
    test.info().project.name === "mobile"
      ? page.locator("nav[aria-label='Primary']").getByRole("button", {
          name: /^Cart/,
        })
      : page.locator("header").getByRole("button", { name: /^Cart/ });

  await expect(cartTrigger.getByText("2")).toBeVisible();
});

test("re-prices the cart when the dates are changed from inside it", async ({
  page,
}) => {
  await page.goto("/");
  await chooseOneWeek(page);

  await page
    .getByRole("button", { name: /^Add .+ to cart$/ })
    .first()
    .click();

  const cart = page.locator('[role="dialog"][aria-label="Cart"]');
  await expect(cart.getByText("₹1,400")).toBeVisible();

  await cart.getByRole("button", { name: "Edit" }).click();
  await expect(picker(page)).toBeVisible();

  await chooseRange(page, 0, 15);

  await expect(picker(page)).toBeHidden();
  await expect(cart.getByText("Rent for 14 days")).toBeVisible();
  await expect(cart.getByText("₹2,800")).toBeVisible();
});

test("reveals an answer when a frequently asked question is opened", async ({
  page,
}) => {
  await page.goto("/");
  await dismissPicker(page);

  const question = page.getByText(/how can i rent from sharepal/i);
  await expect(question).toBeVisible();

  const answer = page.getByText(/browse the products, select your dates/i);
  await expect(answer).toBeHidden();

  await question.click();
  await expect(answer).toBeVisible();
});

test("keeps the footer's rental prose folded away until read more is opened", async ({
  page,
}) => {
  await page.goto("/");
  await dismissPicker(page);

  const categories = page.getByRole("heading", { name: "Categories on Rent" });
  await expect(categories).toBeHidden();

  await page.getByText("Read more").click();

  await expect(categories).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Gaming Consoles on Rent" }),
  ).toBeVisible();
  await expect(page.getByText("Read less")).toBeVisible();
});

test("opens a tab's sub-categories on hover", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "the row does not fit 375px");

  await page.goto("/");
  await dismissPicker(page);

  const tabs = page.getByRole("navigation", { name: "Rental categories" });
  await expect(tabs.getByRole("link", { name: "DJI Drones" })).toBeHidden();

  await tabs.getByRole("link", { name: "Photography" }).hover();

  await expect(tabs.getByRole("link", { name: "DJI Drones" })).toBeVisible();
  await expect(
    tabs.getByRole("link", { name: "Action Camera Add ons" }),
  ).toBeVisible();
});

test("does not scroll sideways on a narrow screen", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await dismissPicker(page);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );

  expect(overflow).toBeLessThanOrEqual(1);
});

test("narrows the catalogue with the search field, then puts it back", async ({
  page,
}) => {
  await page.goto("/");
  await dismissPicker(page);

  const search = page.getByLabel("Search gaming gadgets");
  await search.fill("fc27");

  await expect(page.getByText("Showing 3 of 3 results")).toBeVisible();
  expect(await page.locator("article").count()).toBe(3);

  await page.getByRole("button", { name: "Clear all" }).click();

  await expect(page.getByText("Showing 12 of 23 results")).toBeVisible();
  await expect(search).toHaveValue("");
});

test("says so when a search matches nothing, and clears on request", async ({
  page,
}) => {
  await page.goto("/");
  await dismissPicker(page);

  await page.getByLabel("Search gaming gadgets").fill("drone");

  await expect(page.getByText(/no gadgets match/i)).toBeVisible();
  expect(await page.locator("article").count()).toBe(0);

  await page.getByRole("button", { name: "Clear filters" }).click();

  await expect(page.getByText("Showing 12 of 23 results")).toBeVisible();
});

test("drops the out of stock gadgets when the stock filter is on", async ({
  page,
}) => {
  await page.goto("/");
  await dismissPicker(page);

  await page.getByRole("button", { name: "In stock only" }).click();

  await expect(page.getByText("Showing 12 of 19 results")).toBeVisible();
  await expect(page.getByRole("button", { name: /out of stock/i })).toBeHidden();
});

test("puts the cheapest gadget first when sorting by price", async ({ page }) => {
  await page.goto("/");
  await dismissPicker(page);

  await page.getByLabel("Sort by").selectOption("price-asc");

  await expect(
    page.locator("#categories").getByRole("heading", { level: 3 }).first(),
  ).toHaveText("PlayStation Portal Remote Player");
});

test("saves a gadget for later, then takes it out again", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await dismissPicker(page);

  const name = (
    await page.locator("#categories").getByRole("heading", { level: 3 }).first().textContent()
  )?.trim();

  await page.getByRole("button", { name: `Save ${name} for later` }).click();

  const count =
    testInfo.project.name === "mobile"
      ? page.getByRole("link", { name: "Saved, 1 items saved" })
      : page.getByRole("link", { name: "Saved (1)" });
  await expect(count).toBeVisible();

  const rail = page.locator("#saved");
  await expect(
    rail.getByRole("heading", { name: "Saved for later" }),
  ).toBeVisible();
  await expect(rail.getByRole("heading", { name })).toBeVisible();

  await rail.getByRole("button", { name: `Remove ${name} from saved` }).click();

  await expect(page.locator("#saved")).toHaveCount(0);
});

test("fills the recently viewed rail as gadgets scroll past", async ({ page }) => {
  await page.goto("/");
  await dismissPicker(page);

  const rail = page.locator("#recent");

  // Walk down the page so cards pass through the viewport at a readable pace.
  for (let step = 0; step < 40 && (await rail.count()) === 0; step += 1) {
    await page.evaluate(() => window.scrollBy(0, 600));
  }

  await expect(
    rail.getByRole("heading", { name: "Recently viewed" }),
  ).toBeVisible();

  const viewed = rail.getByRole("heading", { level: 3 });
  expect(await viewed.count()).toBeGreaterThan(0);
  expect(await viewed.count()).toBeLessThanOrEqual(6);
});
