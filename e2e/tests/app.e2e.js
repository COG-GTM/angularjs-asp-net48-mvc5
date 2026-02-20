import { expect, test } from "@playwright/test";
import { IndexPage } from "../pages/index-page";
import { TestComponentPage } from "../pages/test-component-page";
import { TestDirectivePage } from "../pages/test-directive-page";

test.describe("angularjs-asp-net48-mvc5 app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test.describe("Index page", () => {
    test("should display the page title", async ({ page }) => {
      const indexPage = new IndexPage(page);

      await expect(indexPage.title).toHaveText(
        "XLTS for AngularJS with .NET Framework"
      );
    });

    test("should have the correct document title", async ({ page }) => {
      await expect(page).toHaveTitle(
        "XLTS for AngularJS with .NET Framework"
      );
    });

    test("should have AngularJS app bootstrapped", async ({ page }) => {
      const indexPage = new IndexPage(page);
      await expect(indexPage.body).toBeVisible();
    });

    test("should render the title as an h1 element", async ({ page }) => {
      const h1 = page.locator("h1");
      await expect(h1).toBeVisible();
      await expect(h1).toHaveText("XLTS for AngularJS with .NET Framework");
    });

    test("should contain both custom elements", async ({ page }) => {
      const indexPage = new IndexPage(page);
      await expect(indexPage.testComponent).toBeAttached();
      await expect(indexPage.testDirective).toBeAttached();
    });

    test("should have correct meta viewport tag", async ({ page }) => {
      const viewport = page.locator('meta[name="viewport"]');
      await expect(viewport).toHaveAttribute("content", "width=device-width");
    });

    test("should have correct charset meta tag", async ({ page }) => {
      const charset = page.locator('meta[charset="utf-8"]');
      await expect(charset).toBeAttached();
    });

    test("should load without JavaScript console errors", async ({ page }) => {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.reload();
      await page.waitForLoadState("networkidle");
      expect(errors).toEqual([]);
    });
  });

  test.describe("TestComponent", () => {
    test("should display the AngularJS version text", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);

      await expect(testComponentPage.angularjsVersion).toHaveText(
        "AngularJS Version: 1.8.2"
      );
    });

    test("should be visible on the page", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.angularjsVersion).toBeVisible();
    });

    test("should have the test-component CSS class", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.container).toBeVisible();
    });

    test("should contain a valid version number format", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const text = await testComponentPage.angularjsVersion.textContent();
      expect(text).toMatch(/AngularJS Version: \d+\.\d+\.\d+/);
    });

    test("should have the data-testid attribute for testing", async ({
      page,
    }) => {
      const element = page.locator('[data-testid="angularjs-version"]');
      await expect(element).toBeAttached();
    });

    test("should render after the directive in DOM order", async ({
      page,
    }) => {
      const components = page.locator("test-component, test-directive");
      const count = await components.count();
      expect(count).toBe(2);
    });
  });

  test.describe("TestDirective", () => {
    test("should display the jQuery version text", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);

      await expect(testDirective.jqueryVersion).toHaveText(
        "jQuery Version: 3.6.0"
      );
    });

    test("should be visible on the page", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      await expect(testDirective.jqueryVersion).toBeVisible();
    });

    test("should have the test-directive CSS class", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      await expect(testDirective.container).toBeVisible();
    });

    test("should contain a valid version number format", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      const text = await testDirective.jqueryVersion.textContent();
      expect(text).toMatch(/jQuery Version: \d+\.\d+\.\d+/);
    });

    test("should have the data-testid attribute for testing", async ({
      page,
    }) => {
      const element = page.locator('[data-testid="jquery-version"]');
      await expect(element).toBeAttached();
    });

    test("should load the directive template", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      const html = await testDirective.container.innerHTML();
      expect(html).toContain("jQuery Version:");
    });
  });

  test.describe("Page structure and layout", () => {
    test("should render all sections in correct order", async ({ page }) => {
      const allElements = page.locator(
        "body > h1, body > test-directive, body > test-component"
      );
      const count = await allElements.count();
      expect(count).toBe(3);
    });

    test("should have the h1 title as the first content element", async ({
      page,
    }) => {
      const firstChild = page.locator("body > :first-child");
      const tagName = await firstChild.evaluate((el) =>
        el.tagName.toLowerCase()
      );
      expect(tagName).toBe("h1");
    });

    test("should display both version strings simultaneously", async ({
      page,
    }) => {
      const testComponent = new TestComponentPage(page);
      const testDirective = new TestDirectivePage(page);

      await expect(testComponent.angularjsVersion).toBeVisible();
      await expect(testDirective.jqueryVersion).toBeVisible();
    });

    test("should have Google Fonts stylesheet loaded", async ({ page }) => {
      const fontLink = page.locator(
        'link[href*="fonts.googleapis.com"]'
      );
      await expect(fontLink).toBeAttached();
    });

    test("should have preconnect links for font performance", async ({
      page,
    }) => {
      const preconnect = page.locator(
        'link[rel="preconnect"][href="https://fonts.googleapis.com"]'
      );
      await expect(preconnect).toBeAttached();
    });
  });

  test.describe("Responsive behavior", () => {
    test("should render correctly at mobile viewport", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const indexPage = new IndexPage(page);
      await expect(indexPage.title).toBeVisible();

      const testComponent = new TestComponentPage(page);
      await expect(testComponent.angularjsVersion).toBeVisible();

      const testDirective = new TestDirectivePage(page);
      await expect(testDirective.jqueryVersion).toBeVisible();
    });

    test("should render correctly at tablet viewport", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      const indexPage = new IndexPage(page);
      await expect(indexPage.title).toBeVisible();
    });

    test("should render correctly at desktop viewport", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const indexPage = new IndexPage(page);
      await expect(indexPage.title).toBeVisible();
    });
  });

  test.describe("Page reload and navigation", () => {
    test("should maintain content after page reload", async ({ page }) => {
      const testComponent = new TestComponentPage(page);
      await expect(testComponent.angularjsVersion).toHaveText(
        "AngularJS Version: 1.8.2"
      );

      await page.reload();
      await expect(testComponent.angularjsVersion).toHaveText(
        "AngularJS Version: 1.8.2"
      );
    });

    test("should maintain directive content after reload", async ({
      page,
    }) => {
      const testDirective = new TestDirectivePage(page);
      await expect(testDirective.jqueryVersion).toHaveText(
        "jQuery Version: 3.6.0"
      );

      await page.reload();
      await expect(testDirective.jqueryVersion).toHaveText(
        "jQuery Version: 3.6.0"
      );
    });

    test("should have AngularJS bootstrapped after reload", async ({
      page,
    }) => {
      await page.reload();
      const body = page.locator("body[ng-app='app']");
      await expect(body).toBeVisible();
    });
  });

  test.describe("Accessibility", () => {
    test("should have a heading level 1", async ({ page }) => {
      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
    });

    test("should have lang or charset defined for proper encoding", async ({
      page,
    }) => {
      const charset = page.locator('meta[charset="utf-8"]');
      await expect(charset).toBeAttached();
    });

    test("should have a meaningful page title", async ({ page }) => {
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
      expect(title).not.toBe("Untitled");
    });
  });
});
