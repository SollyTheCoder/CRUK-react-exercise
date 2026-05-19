import { test, expect } from "@playwright/test";
import { mockNasaApi } from "./helpers/nasaMock";

test.describe("Form validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows error when keywords are too short", async ({ page }) => {
    await page.getByLabel("Keywords").pressSequentially("a");
    await page.getByLabel("Keywords").blur();
    await expect(
      page.getByText("keywords must have at least 2 characters."),
    ).toBeVisible();
  });

  test("shows error when keywords exceed 50 characters", async ({ page }) => {
    await page.getByLabel("Keywords").pressSequentially("a".repeat(51));
    await page.getByLabel("Keywords").blur();
    await expect(
      page.getByText("keywords must have at most 50 characters."),
    ).toBeVisible();
  });

  test("shows error when media type is not selected", async ({ page }) => {
    await page.getByLabel("Keywords").pressSequentially("moon");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("Please select a media type.")).toBeVisible();
  });

  test("shows error when yearStart contains non-digits", async ({ page }) => {
    await page.getByLabel("Year start").pressSequentially("abc");
    await page.getByLabel("Year start").blur();
    await expect(page.getByText("Please enter a valid number.")).toBeVisible();
  });

  test("shows error when yearStart is before 1900", async ({ page }) => {
    await page.getByLabel("Year start").pressSequentially("1800");
    await page.getByLabel("Year start").blur();
    await expect(
      page.getByText("Year start must be after 1900."),
    ).toBeVisible();
  });

  test("shows error when yearStart is in the future", async ({ page }) => {
    const futureYear = new Date().getFullYear() + 1;
    await page.getByLabel("Year start").pressSequentially(String(futureYear));
    await page.getByLabel("Year start").blur();
    await expect(
      page.getByText("Year start must not be in the future."),
    ).toBeVisible();
  });

  test("accepts valid input and submits", async ({ page }) => {
    mockNasaApi(page, 2, "image");
    await page.getByLabel("Keywords").pressSequentially("moon");
    await page.getByLabel("Media type").selectOption("image");
    await page.getByLabel("Year start").pressSequentially("2020");
    await page.getByRole("button", { name: "Submit" }).click();

    // No validation errors visible
    await expect(
      page.getByText(
        /must have at least|Please select|Please enter|after 1900|in the future/,
      ),
    ).not.toBeVisible();

    // Results heading appears
    await expect(page.getByRole("heading", { name: "Results" })).toBeVisible();
  });
});
