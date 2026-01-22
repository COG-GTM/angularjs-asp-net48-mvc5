import { expect, test } from "@playwright/test";
import { IndexPage } from "../pages/index-page";
import { TestComponentPage } from "../pages/test-component-page";
import { TestDirectivePage } from "../pages/test-directive-page";

test.describe("angularjs-asp-net48-mvc5 app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test.describe("Index Page", () => {
    test("should display the correct page title", async ({ page }) => {
      const indexPage = new IndexPage(page);
      await expect(indexPage.title).toHaveText(
        "XLTS for AngularJS with .NET Framework"
      );
    });

    test("should have the title visible", async ({ page }) => {
      const indexPage = new IndexPage(page);
      await expect(indexPage.title).toBeVisible();
    });

    test("should have correct data-testid attribute on title", async ({
      page,
    }) => {
      const titleElement = page.getByTestId("title");
      await expect(titleElement).toBeVisible();
    });

    test("should have h1 tag for title", async ({ page }) => {
      const h1Element = page.locator("h1");
      await expect(h1Element).toBeVisible();
      await expect(h1Element).toHaveText(
        "XLTS for AngularJS with .NET Framework"
      );
    });
  });

  test.describe("TestComponent", () => {
    test("should display AngularJS version", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.angularjsVersion).toContainText(
        "AngularJS Version:"
      );
    });

    test("should have the component visible", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.angularjsVersion).toBeVisible();
    });

    test("should have correct data-testid attribute", async ({ page }) => {
      const componentElement = page.getByTestId("angularjs-version");
      await expect(componentElement).toBeVisible();
    });

    test("should have test-component class", async ({ page }) => {
      const componentElement = page.locator(".test-component");
      await expect(componentElement).toBeVisible();
    });

    test("should display version in correct format", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const text = await testComponentPage.angularjsVersion.textContent();
      expect(text).toMatch(/AngularJS Version: \d+\.\d+\.\d+/);
    });
  });

  test.describe("TestDirective", () => {
    test("should display jQuery version", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      await expect(testDirective.jqueryVersion).toContainText("jQuery Version:");
    });

    test("should have the directive visible", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      await expect(testDirective.jqueryVersion).toBeVisible();
    });

    test("should have correct data-testid attribute", async ({ page }) => {
      const directiveElement = page.getByTestId("jquery-version");
      await expect(directiveElement).toBeVisible();
    });

    test("should have test-directive class", async ({ page }) => {
      const directiveElement = page.locator(".test-directive");
      await expect(directiveElement).toBeVisible();
    });

    test("should display version in correct format", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      const text = await testDirective.jqueryVersion.textContent();
      expect(text).toMatch(/jQuery Version: \d+\.\d+\.\d+/);
    });
  });

  test.describe("Page Structure", () => {
    test("should have ng-app attribute on body", async ({ page }) => {
      const body = page.locator('body[ng-app="app"]');
      await expect(body).toBeVisible();
    });

    test("should have both component and directive on page", async ({
      page,
    }) => {
      const component = page.locator("test-component");
      const directive = page.locator("test-directive");
      await expect(component).toBeVisible();
      await expect(directive).toBeVisible();
    });

    test("should have correct page structure order", async ({ page }) => {
      const elements = page.locator("body > *");
      const count = await elements.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test("should load without JavaScript errors", async ({ page }) => {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error));
      await page.reload();
      await page.waitForLoadState("networkidle");
      expect(errors).toHaveLength(0);
    });
  });

  test.describe("Accessibility", () => {
    test("should have proper heading hierarchy", async ({ page }) => {
      const h1Elements = page.locator("h1");
      const h1Count = await h1Elements.count();
      expect(h1Count).toBe(1);
    });

    test("should have data-testid attributes for testing", async ({ page }) => {
      const titleTestId = page.getByTestId("title");
      const angularVersionTestId = page.getByTestId("angularjs-version");
      const jqueryVersionTestId = page.getByTestId("jquery-version");

      await expect(titleTestId).toBeVisible();
      await expect(angularVersionTestId).toBeVisible();
      await expect(jqueryVersionTestId).toBeVisible();
    });

    test("should have viewport meta tag", async ({ page }) => {
      const viewport = page.locator('meta[name="viewport"]');
      await expect(viewport).toHaveAttribute("content", "width=device-width");
    });

    test("should have charset meta tag", async ({ page }) => {
      const charset = page.locator('meta[charset="utf-8"]');
      await expect(charset).toBeAttached();
    });
  });

  test.describe("Responsive Design", () => {
    test("should render correctly on mobile viewport", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const indexPage = new IndexPage(page);
      await expect(indexPage.title).toBeVisible();
    });

    test("should render correctly on tablet viewport", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      const indexPage = new IndexPage(page);
      await expect(indexPage.title).toBeVisible();
    });

    test("should render correctly on desktop viewport", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const indexPage = new IndexPage(page);
      await expect(indexPage.title).toBeVisible();
    });
  });

  test.describe("Performance", () => {
    test("should load page within acceptable time", async ({ page }) => {
      const startTime = Date.now();
      await page.goto("");
      await page.waitForLoadState("domcontentloaded");
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(5000);
    });

    test("should have AngularJS bootstrapped", async ({ page }) => {
      const ngApp = page.locator("[ng-app]");
      await expect(ngApp).toBeVisible();
    });
  });

  test.describe("Navigation", () => {
    test("should handle page refresh", async ({ page }) => {
      const indexPage = new IndexPage(page);
      await expect(indexPage.title).toBeVisible();
      await page.reload();
      await expect(indexPage.title).toBeVisible();
    });

    test("should maintain state after refresh", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const versionBefore =
        await testComponentPage.angularjsVersion.textContent();
      await page.reload();
      const versionAfter =
        await testComponentPage.angularjsVersion.textContent();
      expect(versionBefore).toBe(versionAfter);
    });
  });
});
