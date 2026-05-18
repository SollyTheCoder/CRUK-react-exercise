import { Page } from "@playwright/test";
import { createResponse } from "./response";

type MediaType = "image" | "video" | "audio";

export async function mockNasaApi(
  page: Page,
  totalResults: number,
  mediaType: MediaType,
) {
  await page.route("**/images-api.nasa.gov/search**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(createResponse(mediaType, totalResults)),
    });
  });
}
