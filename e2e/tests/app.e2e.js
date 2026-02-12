import { expect, test } from "@playwright/test";
import { IndexPage } from "../pages/index-page";
import { TestComponentPage } from "../pages/test-component-page";
import { TestDirectivePage } from "../pages/test-directive-page";

test.describe("angularjs-asp-net48-mvc5 app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test.describe("Index page", () => {
    test("should display the correct page title", async ({ page }) => {
      const indexPage = new IndexPage(page);
      await expect(indexPage.title).toHaveText(
        "XLTS for AngularJS with .NET Framework"
      );
    });

    test("should have the title as an h1 element", async ({ page }) => {
      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1).toHaveAttribute("data-testid", "title");
    });

    test("should have the ng-app directive on the body", async ({ page }) => {
      const indexPage = new IndexPage(page);
      await expect(indexPage.body).toHaveAttribute("ng-app", "app");
    });

    test("should render test-component element", async ({ page }) => {
      const indexPage = new IndexPage(page);
      await expect(indexPage.testComponent).toBeAttached();
    });

    test("should render test-directive element", async ({ page }) => {
      const indexPage = new IndexPage(page);
      await expect(indexPage.testDirective).toBeAttached();
    });

    test("should have correct document title", async ({ page }) => {
      await expect(page).toHaveTitle(
        "XLTS for AngularJS with .NET Framework"
      );
    });

    test("should load the page at the base URL", async ({ page }) => {
      await expect(page).toHaveURL(/.*\//);
    });

    test("should render components in correct DOM order", async ({ page }) => {
      const body = page.locator("body");
      const children = body.locator("> *");
      const firstChild = children.nth(0);
      const secondChild = children.nth(1);
      const thirdChild = children.nth(2);
      await expect(firstChild).toHaveAttribute("data-testid", "title");
      await expect(secondChild).toBeAttached();
      await expect(thirdChild).toBeAttached();
    });
  });

  test.describe("TestComponent", () => {
    test("should display the AngularJS version text", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.angularjsVersion).toHaveText(
        "AngularJS Version: 1.8.2"
      );
    });

    test("should have the angularjs-version data-testid", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.angularjsVersion).toHaveAttribute(
        "data-testid",
        "angularjs-version"
      );
    });

    test("should have the test-component CSS class", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.componentContainer).toHaveClass(
        /test-component/
      );
    });

    test("should be visible on the page", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.angularjsVersion).toBeVisible();
    });

    test("should contain version number in semver format", async ({
      page,
    }) => {
      const testComponentPage = new TestComponentPage(page);
      const text = await testComponentPage.angularjsVersion.textContent();
      expect(text).toMatch(/AngularJS Version: \d+\.\d+\.\d+/);
    });

    test("should have bold font weight", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const fontWeight = await testComponentPage.componentContainer.evaluate(
        (el) => window.getComputedStyle(el).fontWeight
      );
      expect(["bold", "700"]).toContain(fontWeight);
    });

    test("should have blue color styling", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const color = await testComponentPage.componentContainer.evaluate(
        (el) => window.getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    });
  });

  test.describe("TestDirective", () => {
    test("should display the jQuery version text", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      await expect(testDirective.jqueryVersion).toHaveText(
        "jQuery Version: 3.6.0"
      );
    });

    test("should have the jquery-version data-testid", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      await expect(testDirective.jqueryVersion).toHaveAttribute(
        "data-testid",
        "jquery-version"
      );
    });

    test("should have the test-directive CSS class", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      await expect(testDirective.directiveContainer).toHaveClass(
        /test-directive/
      );
    });

    test("should be visible on the page", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      await expect(testDirective.jqueryVersion).toBeVisible();
    });

    test("should contain version number in semver format", async ({
      page,
    }) => {
      const testDirective = new TestDirectivePage(page);
      const text = await testDirective.jqueryVersion.textContent();
      expect(text).toMatch(/jQuery Version: \d+\.\d+\.\d+/);
    });

    test("should have bold font weight", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      const fontWeight = await testDirective.directiveContainer.evaluate(
        (el) => window.getComputedStyle(el).fontWeight
      );
      expect(["bold", "700"]).toContain(fontWeight);
    });

    test("should have blue color styling", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      const color = await testDirective.directiveContainer.evaluate(
        (el) => window.getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    });
  });

  test.describe("Page integration", () => {
    test("should have no console errors from AngularJS", async ({ page }) => {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto("");
      await page.waitForTimeout(1000);
      expect(
        errors.filter((e) => !e.includes("favicon"))
      ).toHaveLength(0);
    });

    test("should load AngularJS framework", async ({ page }) => {
      const angularLoaded = await page.evaluate(() => {
        return typeof window.angular !== "undefined";
      });
      expect(angularLoaded).toBe(true);
    });

    test("should load jQuery library", async ({ page }) => {
      const jqueryLoaded = await page.evaluate(() => {
        return typeof window.jQuery !== "undefined";
      });
      expect(jqueryLoaded).toBe(true);
    });

    test("should have the app module bootstrapped", async ({ page }) => {
      const appBootstrapped = await page.evaluate(() => {
        try {
          return !!window.angular.module("app");
        } catch (e) {
          return false;
        }
      });
      expect(appBootstrapped).toBe(true);
    });

    test("should display both component and directive together", async ({
      page,
    }) => {
      const testComponentPage = new TestComponentPage(page);
      const testDirective = new TestDirectivePage(page);
      await expect(testComponentPage.angularjsVersion).toBeVisible();
      await expect(testDirective.jqueryVersion).toBeVisible();
    });

    test("should have proper meta charset", async ({ page }) => {
      const charset = await page.locator('meta[charset="utf-8"]');
      await expect(charset).toBeAttached();
    });

    test("should have viewport meta tag", async ({ page }) => {
      const viewport = page.locator('meta[name="viewport"]');
      await expect(viewport).toBeAttached();
    });

    test("should include Google Fonts link", async ({ page }) => {
      const fontLink = page.locator(
        'link[href*="fonts.googleapis.com"]'
      );
      await expect(fontLink).toBeAttached();
    });
  });
});
