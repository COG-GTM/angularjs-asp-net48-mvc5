import { expect, test } from "@playwright/test";
import { IndexPage } from "../pages/index-page";

test.describe("Navigation and Routing Tests", () => {
  test("should load the landing page at root URL", async ({ page }) => {
    const response = await page.goto("/");
    expect(response.status()).toBe(200);
  });

  test("should have correct page title in browser tab", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("XLTS for AngularJS with .NET Framework");
  });

  test("should maintain URL after page load", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/");
  });

  test("should handle page refresh correctly", async ({ page }) => {
    await page.goto("/");
    const indexPage = new IndexPage(page);
    await expect(indexPage.title).toBeVisible();

    await page.reload();
    await expect(indexPage.title).toBeVisible();
    await expect(indexPage.title).toHaveText(
      "XLTS for AngularJS with .NET Framework"
    );
  });

  test("should return 404 for non-existent routes", async ({ page }) => {
    const response = await page.goto("/non-existent-page");
    expect(response.status()).toBe(404);
  });

  test("should handle query parameters gracefully", async ({ page }) => {
    const response = await page.goto("/?test=param&foo=bar");
    expect(response.status()).toBe(200);

    const indexPage = new IndexPage(page);
    await expect(indexPage.title).toBeVisible();
  });

  test("should handle hash fragments in URL", async ({ page }) => {
    await page.goto("/#section");
    const indexPage = new IndexPage(page);
    await expect(indexPage.title).toBeVisible();
  });
});
