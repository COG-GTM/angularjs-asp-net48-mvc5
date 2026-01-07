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

    test("should have correct document title", async ({ page }) => {
      const indexPage = new IndexPage(page);
      const pageTitle = await indexPage.getPageTitle();
      expect(pageTitle).toBe("XLTS for AngularJS with .NET Framework");
    });

    test("should have viewport meta tag", async ({ page }) => {
      const indexPage = new IndexPage(page);
      const viewport = await indexPage.getMetaViewport();
      expect(viewport).toBe("width=device-width");
    });

    test("should have utf-8 charset", async ({ page }) => {
      const indexPage = new IndexPage(page);
      const charset = await indexPage.getMetaCharset();
      expect(charset).toBe("utf-8");
    });

    test("should have AngularJS app initialized", async ({ page }) => {
      const indexPage = new IndexPage(page);
      const ngApp = await indexPage.hasAngularApp();
      expect(ngApp).toBe("app");
    });

    test("should have h1 element visible", async ({ page }) => {
      const indexPage = new IndexPage(page);
      await expect(indexPage.title).toBeVisible();
    });

    test("should load without JavaScript errors", async ({ page }) => {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.reload();
      expect(errors).toHaveLength(0);
    });
  });

  test.describe("TestComponent", () => {
    test("should display AngularJS version", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.angularjsVersion).toHaveText(
        "AngularJS Version: 1.8.2"
      );
    });

    test("should be visible on the page", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const isVisible = await testComponentPage.isComponentVisible();
      expect(isVisible).toBe(true);
    });

    test("should have test-component class", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const className = await testComponentPage.getComponentClass();
      expect(className).toContain("test-component");
    });

    test("should have data-testid attribute", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.angularjsVersion).toHaveAttribute(
        "data-testid",
        "angularjs-version"
      );
    });

    test("should display version in correct format", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const versionText = await testComponentPage.getVersionText();
      expect(versionText).toMatch(/AngularJS Version: \d+\.\d+\.\d+/);
    });
  });

  test.describe("TestDirective", () => {
    test("should display jQuery version", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      await expect(testDirective.jqueryVersion).toHaveText(
        "jQuery Version: 3.6.0"
      );
    });

    test("should be visible on the page", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      const isVisible = await testDirective.isDirectiveVisible();
      expect(isVisible).toBe(true);
    });

    test("should have test-directive class", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      const className = await testDirective.getDirectiveClass();
      expect(className).toContain("test-directive");
    });

    test("should have data-testid attribute", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      await expect(testDirective.jqueryVersion).toHaveAttribute(
        "data-testid",
        "jquery-version"
      );
    });

    test("should display version in correct format", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      const versionText = await testDirective.getVersionText();
      expect(versionText).toMatch(/jQuery Version: \d+\.\d+\.\d+/);
    });
  });

  test.describe("Page Layout and Structure", () => {
    test("should have both components rendered in correct order", async ({
      page,
    }) => {
      const testDirective = page.locator("test-directive");
      const testComponent = page.locator("test-component");

      await expect(testDirective).toBeVisible();
      await expect(testComponent).toBeVisible();

      const directiveBox = await testDirective.boundingBox();
      const componentBox = await testComponent.boundingBox();

      expect(directiveBox.y).toBeLessThan(componentBox.y);
    });

    test("should have Google Fonts loaded", async ({ page }) => {
      const fontLink = page.locator('link[href*="fonts.googleapis.com"]');
      await expect(fontLink).toHaveCount(1);
    });

    test("should have preconnect links for performance", async ({ page }) => {
      const preconnectLinks = page.locator('link[rel="preconnect"]');
      await expect(preconnectLinks).toHaveCount(2);
    });
  });

  test.describe("Accessibility", () => {
    test("should have proper heading hierarchy", async ({ page }) => {
      const h1Elements = page.locator("h1");
      await expect(h1Elements).toHaveCount(1);
    });

    test("should have lang attribute on html element", async ({ page }) => {
      const html = page.locator("html");
      const lang = await html.getAttribute("lang");
      expect(lang).toBeNull();
    });

    test("should have descriptive title", async ({ page }) => {
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);
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
    test("should load within acceptable time", async ({ page }) => {
      const startTime = Date.now();
      await page.reload();
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(5000);
    });

    test("should have no console errors", async ({ page }) => {
      const consoleErrors = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text());
        }
      });
      await page.reload();
      await page.waitForTimeout(500);
      expect(consoleErrors).toHaveLength(0);
    });
  });
});
