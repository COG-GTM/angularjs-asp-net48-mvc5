import { expect, test } from "@playwright/test";
import { IndexPage } from "../pages/index-page";
import { TestComponentPage } from "../pages/test-component-page";
import { TestDirectivePage } from "../pages/test-directive-page";

test.describe("angularjs-asp-net48-mvc5 app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test.describe("Index Page", () => {
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

    test("should have the ng-app attribute on body", async ({ page }) => {
      const body = page.locator("body");
      await expect(body).toHaveAttribute("ng-app", "app");
    });

    test("should load the page successfully with status 200", async ({
      page,
    }) => {
      const response = await page.goto("");
      expect(response.status()).toBe(200);
    });

    test("should contain the title as an h1 element", async ({ page }) => {
      const h1 = page.locator("h1");
      await expect(h1).toBeVisible();
      await expect(h1).toHaveAttribute("data-testid", "title");
    });

    test("should load stylesheets", async ({ page }) => {
      const links = page.locator('link[rel="stylesheet"]');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);
    });

    test("should contain both AngularJS components on the page", async ({
      page,
    }) => {
      const testComponent = page.locator("test-component");
      const testDirective = page.locator("test-directive");
      await expect(testComponent).toBeAttached();
      await expect(testDirective).toBeAttached();
    });
  });

  test.describe("TestComponent", () => {
    test("should display the AngularJS version", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.angularjsVersion).toHaveText(
        "AngularJS Version: 1.8.2"
      );
    });

    test("should be visible on the page", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.angularjsVersion).toBeVisible();
    });

    test("should have the correct data-testid attribute", async ({ page }) => {
      const versionEl = page.getByTestId("angularjs-version");
      await expect(versionEl).toBeAttached();
    });

    test("should display version in semver format", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const text = await testComponentPage.angularjsVersion.textContent();
      expect(text).toMatch(/AngularJS Version: \d+\.\d+\.\d+/);
    });

    test("should have the test-component CSS class", async ({ page }) => {
      const versionEl = page.getByTestId("angularjs-version");
      await expect(versionEl).toHaveClass(/test-component/);
    });

    test("should render inside the test-component element", async ({
      page,
    }) => {
      const component = page.locator("test-component");
      const inner = component.locator('[data-testid="angularjs-version"]');
      await expect(inner).toBeAttached();
    });

    test("should have styled text content", async ({ page }) => {
      const versionEl = page.getByTestId("angularjs-version");
      const fontWeight = await versionEl.evaluate(
        (el) => getComputedStyle(el).fontWeight
      );
      expect(fontWeight).toBe("700");
    });
  });

  test.describe("TestDirective", () => {
    test("should display the jQuery version", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      await expect(testDirective.jqueryVersion).toHaveText(
        "jQuery Version: 3.6.0"
      );
    });

    test("should be visible on the page", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      await expect(testDirective.jqueryVersion).toBeVisible();
    });

    test("should have the correct data-testid attribute", async ({ page }) => {
      const versionEl = page.getByTestId("jquery-version");
      await expect(versionEl).toBeAttached();
    });

    test("should display version in semver format", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      const text = await testDirective.jqueryVersion.textContent();
      expect(text).toMatch(/jQuery Version: \d+\.\d+\.\d+/);
    });

    test("should have the test-directive CSS class", async ({ page }) => {
      const versionEl = page.getByTestId("jquery-version");
      await expect(versionEl).toHaveClass(/test-directive/);
    });

    test("should render inside the test-directive element", async ({
      page,
    }) => {
      const directive = page.locator("test-directive");
      const inner = directive.locator('[data-testid="jquery-version"]');
      await expect(inner).toBeAttached();
    });

    test("should load template via templateUrl", async ({ page }) => {
      const directiveEl = page.locator("test-directive");
      const childDiv = directiveEl.locator("div.test-directive");
      await expect(childDiv).toBeAttached();
    });

    test("should have styled text content", async ({ page }) => {
      const versionEl = page.getByTestId("jquery-version");
      const fontWeight = await versionEl.evaluate(
        (el) => getComputedStyle(el).fontWeight
      );
      expect(fontWeight).toBe("700");
    });
  });

  test.describe("Page Layout and Structure", () => {
    test("should render title before components", async ({ page }) => {
      const elements = page.locator("body > *");
      const first = elements.nth(0);
      await expect(first).toHaveAttribute("data-testid", "title");
    });

    test("should render test-directive before test-component", async ({
      page,
    }) => {
      const bodyHtml = await page.locator("body").innerHTML();
      const directivePos = bodyHtml.indexOf("<test-directive");
      const componentPos = bodyHtml.indexOf("<test-component");
      expect(directivePos).toBeLessThan(componentPos);
    });

    test("should use the Roboto font family", async ({ page }) => {
      const body = page.locator("body");
      const fontFamily = await body.evaluate(
        (el) => getComputedStyle(el).fontFamily
      );
      expect(fontFamily).toContain("Roboto");
    });

    test("should have padding on the body", async ({ page }) => {
      const body = page.locator("body");
      const padding = await body.evaluate(
        (el) => getComputedStyle(el).padding
      );
      expect(padding).toBe("20px");
    });

    test("should have proper meta viewport tag", async ({ page }) => {
      const viewport = page.locator('meta[name="viewport"]');
      await expect(viewport).toHaveAttribute("content", "width=device-width");
    });

    test("should have proper charset meta tag", async ({ page }) => {
      const charset = page.locator('meta[charset="utf-8"]');
      await expect(charset).toBeAttached();
    });
  });

  test.describe("AngularJS Bootstrap", () => {
    test("should bootstrap AngularJS application", async ({ page }) => {
      const isBootstrapped = await page.evaluate(() => {
        const el = document.querySelector("[ng-app]");
        return !!el && !!angular.element(el).injector();
      });
      expect(isBootstrapped).toBe(true);
    });

    test("should have the app module loaded", async ({ page }) => {
      const moduleName = await page.evaluate(() => {
        return document.querySelector("[ng-app]").getAttribute("ng-app");
      });
      expect(moduleName).toBe("app");
    });

    test("should have angular defined globally", async ({ page }) => {
      const hasAngular = await page.evaluate(() => {
        return typeof angular !== "undefined";
      });
      expect(hasAngular).toBe(true);
    });

    test("should have jQuery loaded before AngularJS", async ({ page }) => {
      const hasjQuery = await page.evaluate(() => {
        return typeof jQuery !== "undefined" && typeof $ !== "undefined";
      });
      expect(hasjQuery).toBe(true);
    });

    test("should use jQuery as angular.element", async ({ page }) => {
      const usesJquery = await page.evaluate(() => {
        return angular.element === jQuery;
      });
      expect(usesJquery).toBe(true);
    });
  });
});
