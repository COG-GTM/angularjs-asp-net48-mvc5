import { expect, test } from "@playwright/test";

test.describe("Performance Tests", () => {
  test("page should load within acceptable time", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(10000);
  });

  test("page should reach network idle state", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const title = page.getByTestId("title");
    await expect(title).toBeVisible();
  });

  test("AngularJS should bootstrap quickly", async ({ page }) => {
    await page.goto("/");

    const angularVersion = page.getByTestId("angularjs-version");
    await expect(angularVersion).toBeVisible({ timeout: 5000 });

    const text = await angularVersion.textContent();
    expect(text).not.toContain("{{");
  });

  test("directive template should load quickly", async ({ page }) => {
    await page.goto("/");

    const jqueryVersion = page.getByTestId("jquery-version");
    await expect(jqueryVersion).toBeVisible({ timeout: 5000 });

    const text = await jqueryVersion.textContent();
    expect(text).not.toContain("{{");
  });

  test("page should handle multiple rapid reloads", async ({ page }) => {
    await page.goto("/");

    for (let i = 0; i < 3; i++) {
      await page.reload();
      const title = page.getByTestId("title");
      await expect(title).toBeVisible();
    }
  });

  test("scripts should load without errors", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(errors.length).toBe(0);
  });

  test("console should not have critical errors", async ({ page }) => {
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const criticalErrors = consoleErrors.filter(
      (error) =>
        !error.includes("favicon") && !error.includes("404") && error.length > 0
    );
    expect(criticalErrors.length).toBe(0);
  });

  test("page should have reasonable DOM size", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const elementCount = await page.evaluate(
      () => document.querySelectorAll("*").length
    );
    expect(elementCount).toBeLessThan(1000);
  });
});
