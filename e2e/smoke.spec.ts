import { expect, test } from "@playwright/test";

test("serves the home page", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("lists rentable gaming gadgets with their per-day price", async ({
  page,
}) => {
  await page.goto("/");

  const cards = page.locator("article");
  await expect(cards.first()).toBeVisible();
  expect(await cards.count()).toBeGreaterThan(20);

  await expect(page.getByText("/day").first()).toBeVisible();
});

test("reveals an answer when a frequently asked question is opened", async ({
  page,
}) => {
  await page.goto("/");

  const question = page.getByText(/security deposit to rent in bangalore/i);
  await expect(question).toBeVisible();

  const answer = page.getByText(/only pay the rent for the days/i);
  await expect(answer).toBeHidden();

  await question.click();
  await expect(answer).toBeVisible();
});

test("does not scroll sideways on a narrow screen", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );

  expect(overflow).toBeLessThanOrEqual(1);
});
