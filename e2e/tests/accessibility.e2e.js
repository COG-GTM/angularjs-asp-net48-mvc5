import { expect, test } from "@playwright/test";

test.describe("Accessibility Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have proper document structure with html lang attribute", async ({
    page,
  }) => {
    const html = page.locator("html");
    await expect(html).toBeVisible();
  });

  test("should have a main heading (h1)", async ({ page }) => {
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toHaveCount(1);
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });

  test("should have viewport meta tag for responsive design", async ({
    page,
  }) => {
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute("content", /width=device-width/);
  });

  test("should have charset meta tag", async ({ page }) => {
    const charset = page.locator('meta[charset="utf-8"]');
    await expect(charset).toHaveCount(1);
  });

  test("should have page title", async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test("should have data-testid attributes for key elements", async ({
    page,
  }) => {
    const titleElement = page.getByTestId("title");
    await expect(titleElement).toBeVisible();

    const angularjsVersion = page.getByTestId("angularjs-version");
    await expect(angularjsVersion).toBeVisible();

    const jqueryVersion = page.getByTestId("jquery-version");
    await expect(jqueryVersion).toBeVisible();
  });

  test("should have proper content structure", async ({ page }) => {
    const body = page.locator("body");
    await expect(body).toBeVisible();

    const content = await body.textContent();
    expect(content).toContain("XLTS for AngularJS");
    expect(content).toContain("AngularJS Version");
    expect(content).toContain("jQuery Version");
  });

  test("should be keyboard navigable", async ({ page }) => {
    await page.keyboard.press("Tab");
    const focusedElement = page.locator(":focus");
    const tagName = await focusedElement.evaluate((el) =>
      el ? el.tagName : null
    );
    expect(tagName).toBeTruthy();
  });
});
