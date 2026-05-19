import { test, expect } from "@playwright/test";
import { mockNasaApi } from "./helpers/nasaMock";

test.describe("Pagination", () => {
  test.beforeEach(async ({ page }) => {
    mockNasaApi(page, 20, "image");
    await page.goto("/");
    await page.getByLabel("Keywords").pressSequentially("moon");
    await page.getByLabel("Media type").selectOption("image");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByRole("heading", { name: "Results" })).toBeVisible();
  });

  test("starts on page 1 with Previous disabled", async ({ page }) => {
    await expect(page.getByText(/Page 1 of/)).toBeVisible();
    await expect(page.getByRole("button", { name: "Previous" })).toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Next", exact: true }),
    ).toBeEnabled();
  });

  test("advances to page 2 when Next is clicked", async ({ page }) => {
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await expect(page.getByText(/Page 2 of/)).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Previous", exact: true }),
    ).toBeEnabled();
  });

  test("returns to page 1 when Previous is clicked", async ({ page }) => {
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await expect(page.getByText(/Page 2 of/)).toBeVisible();

    await page.getByRole("button", { name: "Previous", exact: true }).click();
    await expect(page.getByText(/Page 1 of/)).toBeVisible();
  });

  test("resets to page 1 when a new search is submitted", async ({ page }) => {
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await expect(page.getByText(/Page 2 of/)).toBeVisible();

    await page.getByLabel("Keywords").pressSequentially("mars");
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await expect(page.getByText(/Page 1 of/)).toBeVisible();
  });
});
