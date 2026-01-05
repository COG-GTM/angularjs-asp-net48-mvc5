import { expect, test } from "@playwright/test";
import { IndexPage } from "../pages/index-page";
import { TestComponentPage } from "../pages/test-component-page";
import { TestDirectivePage } from "../pages/test-directive-page";

test.describe("angularjs-asp-net48-mvc5 app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test.describe("Index Page", () => {
    test("should display the main title", async ({ page }) => {
      const indexPage = new IndexPage(page);

      await expect(indexPage.title).toHaveText(
        "XLTS for AngularJS with .NET Framework"
      );
    });

    test("should have correct page title in browser tab", async ({ page }) => {
      await expect(page).toHaveTitle(
        "XLTS for AngularJS with .NET Framework"
      );
    });

    test("should have the ng-app directive on body", async ({ page }) => {
      const body = page.locator("body");
      await expect(body).toHaveAttribute("ng-app", "app");
    });

    test("should have the title as an h1 element", async ({ page }) => {
      const h1 = page.locator("h1");
      await expect(h1).toBeVisible();
      await expect(h1).toHaveAttribute("data-testid", "title");
    });
  });

  test.describe("Test Component", () => {
    test("should display AngularJS version", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);

      await expect(testComponentPage.angularjsVersion).toHaveText(
        "AngularJS Version: 1.8.2"
      );
    });

    test("should have the test-component element", async ({ page }) => {
      const component = page.locator("test-component");
      await expect(component).toBeVisible();
    });

    test("should have the correct data-testid attribute", async ({ page }) => {
      const versionElement = page.getByTestId("angularjs-version");
      await expect(versionElement).toBeVisible();
    });

    test("should have the test-component class", async ({ page }) => {
      const componentDiv = page.locator(".test-component");
      await expect(componentDiv).toBeVisible();
    });

    test("should display version text containing a version number", async ({
      page,
    }) => {
      const versionElement = page.getByTestId("angularjs-version");
      await expect(versionElement).toContainText(/AngularJS Version: \d+\.\d+\.\d+/);
    });
  });

  test.describe("Test Directive", () => {
    test("should display jQuery version", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);

      await expect(testDirective.jqueryVersion).toHaveText(
        "jQuery Version: 3.6.0"
      );
    });

    test("should have the test-directive element", async ({ page }) => {
      const directive = page.locator("test-directive");
      await expect(directive).toBeVisible();
    });

    test("should have the correct data-testid attribute", async ({ page }) => {
      const versionElement = page.getByTestId("jquery-version");
      await expect(versionElement).toBeVisible();
    });

    test("should have the test-directive class", async ({ page }) => {
      const directiveDiv = page.locator(".test-directive");
      await expect(directiveDiv).toBeVisible();
    });

    test("should display version text containing a version number", async ({
      page,
    }) => {
      const versionElement = page.getByTestId("jquery-version");
      await expect(versionElement).toContainText(/jQuery Version: \d+\.\d+\.\d+/);
    });
  });

  test.describe("Page Structure", () => {
    test("should have proper HTML structure", async ({ page }) => {
      const html = page.locator("html");
      await expect(html).toBeVisible();
    });

    test("should have a head element with meta tags", async ({ page }) => {
      const viewport = page.locator('meta[name="viewport"]');
      await expect(viewport).toHaveAttribute("content", "width=device-width");
    });

    test("should have charset meta tag", async ({ page }) => {
      const charset = page.locator('meta[charset="utf-8"]');
      await expect(charset).toHaveCount(1);
    });

    test("should load Google Fonts", async ({ page }) => {
      const fontLink = page.locator(
        'link[href*="fonts.googleapis.com"]'
      );
      await expect(fontLink).toHaveCount(1);
    });

    test("should have both test-component and test-directive", async ({
      page,
    }) => {
      const component = page.locator("test-component");
      const directive = page.locator("test-directive");
      await expect(component).toBeVisible();
      await expect(directive).toBeVisible();
    });
  });

  test.describe("Accessibility", () => {
    test("should have a main heading", async ({ page }) => {
      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
    });

    test("should have readable text content", async ({ page }) => {
      const body = page.locator("body");
      const text = await body.textContent();
      expect(text).toContain("XLTS for AngularJS");
      expect(text).toContain("AngularJS Version");
      expect(text).toContain("jQuery Version");
    });
  });

  test.describe("Visual Regression", () => {
    test("should render components in correct order", async ({ page }) => {
      const elements = page.locator("body > *");
      const count = await elements.count();
      expect(count).toBeGreaterThanOrEqual(3);

      const firstElement = elements.nth(0);
      await expect(firstElement).toHaveAttribute("data-testid", "title");
    });

    test("should have visible version information", async ({ page }) => {
      const angularVersion = page.getByTestId("angularjs-version");
      const jqueryVersion = page.getByTestId("jquery-version");

      await expect(angularVersion).toBeVisible();
      await expect(jqueryVersion).toBeVisible();
    });
  });

  test.describe("AngularJS Integration", () => {
    test("should have AngularJS bootstrapped", async ({ page }) => {
      const ngApp = page.locator("[ng-app]");
      await expect(ngApp).toHaveCount(1);
    });

    test("should render AngularJS expressions", async ({ page }) => {
      const angularVersion = page.getByTestId("angularjs-version");
      const text = await angularVersion.textContent();
      expect(text).not.toContain("{{");
      expect(text).not.toContain("}}");
    });

    test("should render directive template expressions", async ({ page }) => {
      const jqueryVersion = page.getByTestId("jquery-version");
      const text = await jqueryVersion.textContent();
      expect(text).not.toContain("{{");
      expect(text).not.toContain("}}");
    });
  });

  test.describe("Performance", () => {
    test("should load within reasonable time", async ({ page }) => {
      const startTime = Date.now();
      await page.goto("");
      await page.waitForLoadState("domcontentloaded");
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(5000);
    });

    test("should have all elements rendered after load", async ({ page }) => {
      await page.waitForLoadState("networkidle");
      const title = page.getByTestId("title");
      const angularVersion = page.getByTestId("angularjs-version");
      const jqueryVersion = page.getByTestId("jquery-version");

      await expect(title).toBeVisible();
      await expect(angularVersion).toBeVisible();
      await expect(jqueryVersion).toBeVisible();
    });
  });
});
