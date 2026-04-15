import { expect, test } from "@playwright/test";
import { IndexPage } from "../pages/index-page";
import { TestComponentPage } from "../pages/test-component-page";
import { TestDirectivePage } from "../pages/test-directive-page";

test.describe("angular-asp-net48-mvc5 app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("Index", async ({ page }) => {
    const indexPage = new IndexPage(page);

    await expect(indexPage.title).toHaveText("Hello, angular-app");
  });

  test("TestComponent", async ({ page }) => {
    const testComponentPage = new TestComponentPage(page);

    await expect(testComponentPage.angularVersion).toHaveText(
      "Angular Version: 21.2.0"
    );
  });

  test("TestDirective", async ({ page }) => {
    const testDirective = new TestDirectivePage(page);

    await expect(testDirective.angularVersion).toHaveText(
      "Angular Version: 21.2.0"
    );
  });

  test("app-root renders and contains heading", async ({ page }) => {
    const heading = page.locator("app-root h1");
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("Hello, angular-app");
  });

  test("angular version test-ids are visible", async ({ page }) => {
    const angularVersion = page.locator('[data-testid="angular-version"]');
    const angularVersionDirective = page.locator(
      '[data-testid="angular-version-directive"]'
    );

    await expect(angularVersion).toBeVisible();
    await expect(angularVersionDirective).toBeVisible();
  });

  test("no JavaScript console errors on page load", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("");
    await page.waitForLoadState("networkidle");

    expect(errors).toEqual([]);
  });

  test("visual regression", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot();
  });
});
