import { test, expect } from "@playwright/test";
import { mockNasaApi } from "./helpers/nasaMock";

test.describe("Search results", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays a list of results after a successful search", async ({
    page,
  }) => {
    mockNasaApi(page, 5, "image");
    await page.getByLabel("Keywords").pressSequentially("moon");
    await page.getByLabel("Media type").selectOption("image");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByRole("heading", { name: "Results" })).toBeVisible();

    // At least one result rendered
    const items = page
      .locator("li")
      .filter({ has: page.getByRole("heading", { level: 3 }) });
    await expect(items.first()).toBeVisible();
  });

  test("limits results to 10 per page", async ({ page }) => {
    mockNasaApi(page, 10, "image");
    await page.getByLabel("Keywords").pressSequentially("moon");
    await page.getByLabel("Media type").selectOption("image");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByRole("heading", { name: "Results" })).toBeVisible();

    const items = page
      .locator("li")
      .filter({ has: page.getByRole("heading", { level: 3 }) });
    await expect(items).toHaveCount(10);
  });

  test("each result links to NASA's detail page", async ({ page }) => {
    mockNasaApi(page, 5, "image");
    await page.getByLabel("Keywords").pressSequentially("moon");
    await page.getByLabel("Media type").selectOption("image");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByRole("heading", { name: "Results" })).toBeVisible();

    const firstLink = page.getByRole("link", { name: /View image/ }).first();
    await expect(firstLink).toHaveAttribute(
      "href",
      /https:\/\/images\.nasa\.gov\/details\//,
    );
    await expect(firstLink).toHaveAttribute("target", "_blank");
  });

  test("renders video previews for video searches", async ({ page }) => {
    mockNasaApi(page, 5, "video");
    await page.getByLabel("Keywords").pressSequentially("apollo");
    await page.getByLabel("Media type").selectOption("video");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(
      page.getByRole("link", { name: /Play video/ }).first(),
    ).toBeVisible();
  });

  test("renders audio previews for audio searches", async ({ page }) => {
    mockNasaApi(page, 5, "audio");
    await page.getByLabel("Keywords").pressSequentially("apollo");
    await page.getByLabel("Media type").selectOption("audio");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(
      page.getByRole("link", { name: /Listen/ }).first(),
    ).toBeVisible();
  });
});
