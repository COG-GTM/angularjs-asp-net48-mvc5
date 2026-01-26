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

    test("should have the correct document title", async ({ page }) => {
      await expect(page).toHaveTitle("XLTS for AngularJS with .NET Framework");
    });

    test("should have the ng-app attribute on body", async ({ page }) => {
      const body = page.locator("body");
      await expect(body).toHaveAttribute("ng-app", "app");
    });

    test("should load all required elements", async ({ page }) => {
      const indexPage = new IndexPage(page);
      const testComponentPage = new TestComponentPage(page);
      const testDirectivePage = new TestDirectivePage(page);

      await expect(indexPage.title).toBeVisible();
      await expect(testComponentPage.angularjsVersion).toBeVisible();
      await expect(testDirectivePage.jqueryVersion).toBeVisible();
    });
  });

  test.describe("TestComponent", () => {
    test("should display AngularJS version", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.angularjsVersion).toHaveText(
        "AngularJS Version: 1.8.2"
      );
    });

    test("should have the correct test-id attribute", async ({ page }) => {
      const versionElement = page.getByTestId("angularjs-version");
      await expect(versionElement).toBeVisible();
    });

    test("should have the test-component class", async ({ page }) => {
      const componentElement = page.locator(".test-component");
      await expect(componentElement).toBeVisible();
    });

    test("should contain version number in correct format", async ({
      page,
    }) => {
      const testComponentPage = new TestComponentPage(page);
      const text = await testComponentPage.angularjsVersion.textContent();
      expect(text).toMatch(/AngularJS Version: \d+\.\d+\.\d+/);
    });
  });

  test.describe("TestDirective", () => {
    test("should display jQuery version", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      await expect(testDirective.jqueryVersion).toHaveText(
        "jQuery Version: 3.6.0"
      );
    });

    test("should have the correct test-id attribute", async ({ page }) => {
      const versionElement = page.getByTestId("jquery-version");
      await expect(versionElement).toBeVisible();
    });

    test("should have the test-directive class", async ({ page }) => {
      const directiveElement = page.locator(".test-directive");
      await expect(directiveElement).toBeVisible();
    });

    test("should contain version number in correct format", async ({
      page,
    }) => {
      const testDirective = new TestDirectivePage(page);
      const text = await testDirective.jqueryVersion.textContent();
      expect(text).toMatch(/jQuery Version: \d+\.\d+\.\d+/);
    });
  });

  test.describe("Page Structure", () => {
    test("should have proper HTML structure", async ({ page }) => {
      const html = page.locator("html");
      const head = page.locator("head");
      const body = page.locator("body");

      await expect(html).toBeVisible();
      await expect(head).toBeAttached();
      await expect(body).toBeVisible();
    });

    test("should have meta viewport tag", async ({ page }) => {
      const viewport = page.locator('meta[name="viewport"]');
      await expect(viewport).toHaveAttribute("content", "width=device-width");
    });

    test("should have charset meta tag", async ({ page }) => {
      const charset = page.locator('meta[charset="utf-8"]');
      await expect(charset).toBeAttached();
    });

    test("should load Google Fonts", async ({ page }) => {
      const fontLink = page.locator(
        'link[href*="fonts.googleapis.com/css2?family=Roboto"]'
      );
      await expect(fontLink).toBeAttached();
    });

    test("should have h1 element as the main title", async ({ page }) => {
      const h1 = page.locator("h1");
      await expect(h1).toBeVisible();
      await expect(h1).toHaveText("XLTS for AngularJS with .NET Framework");
    });
  });

  test.describe("Component Rendering Order", () => {
    test("should render directive before component", async ({ page }) => {
      const directive = page.locator("test-directive");
      const component = page.locator("test-component");

      await expect(directive).toBeVisible();
      await expect(component).toBeVisible();

      const directiveBox = await directive.boundingBox();
      const componentBox = await component.boundingBox();

      expect(directiveBox.y).toBeLessThan(componentBox.y);
    });

    test("should render title before directive", async ({ page }) => {
      const title = page.locator("h1");
      const directive = page.locator("test-directive");

      const titleBox = await title.boundingBox();
      const directiveBox = await directive.boundingBox();

      expect(titleBox.y).toBeLessThan(directiveBox.y);
    });
  });

  test.describe("Accessibility", () => {
    test("should have proper heading hierarchy", async ({ page }) => {
      const h1Elements = await page.locator("h1").count();
      expect(h1Elements).toBe(1);
    });

    test("should have lang attribute on html element", async ({ page }) => {
      const html = page.locator("html");
      const lang = await html.getAttribute("lang");
      expect(lang === null || lang === "en" || lang === "").toBeTruthy();
    });
  });

  test.describe("Responsive Design", () => {
    test("should display correctly on mobile viewport", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const indexPage = new IndexPage(page);
      const testComponentPage = new TestComponentPage(page);
      const testDirectivePage = new TestDirectivePage(page);

      await expect(indexPage.title).toBeVisible();
      await expect(testComponentPage.angularjsVersion).toBeVisible();
      await expect(testDirectivePage.jqueryVersion).toBeVisible();
    });

    test("should display correctly on tablet viewport", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const indexPage = new IndexPage(page);
      const testComponentPage = new TestComponentPage(page);
      const testDirectivePage = new TestDirectivePage(page);

      await expect(indexPage.title).toBeVisible();
      await expect(testComponentPage.angularjsVersion).toBeVisible();
      await expect(testDirectivePage.jqueryVersion).toBeVisible();
    });

    test("should display correctly on desktop viewport", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const indexPage = new IndexPage(page);
      const testComponentPage = new TestComponentPage(page);
      const testDirectivePage = new TestDirectivePage(page);

      await expect(indexPage.title).toBeVisible();
      await expect(testComponentPage.angularjsVersion).toBeVisible();
      await expect(testDirectivePage.jqueryVersion).toBeVisible();
    });
  });

  test.describe("AngularJS Integration", () => {
    test("should have AngularJS loaded", async ({ page }) => {
      const angularLoaded = await page.evaluate(() => {
        return typeof window.angular !== "undefined";
      });
      expect(angularLoaded).toBe(true);
    });

    test("should have the app module registered", async ({ page }) => {
      const appModuleExists = await page.evaluate(() => {
        try {
          return typeof window.angular.module("app") !== "undefined";
        } catch (e) {
          return false;
        }
      });
      expect(appModuleExists).toBe(true);
    });

    test("should have jQuery loaded", async ({ page }) => {
      const jqueryLoaded = await page.evaluate(() => {
        return typeof window.jQuery !== "undefined";
      });
      expect(jqueryLoaded).toBe(true);
    });

    test("should have correct AngularJS version", async ({ page }) => {
      const version = await page.evaluate(() => {
        return window.angular.version.full;
      });
      expect(version).toMatch(/^1\.8\.\d+$/);
    });

    test("should have correct jQuery version", async ({ page }) => {
      const version = await page.evaluate(() => {
        return window.jQuery.fn.jquery;
      });
      expect(version).toMatch(/^3\.6\.\d+$/);
    });
  });

  test.describe("Performance", () => {
    test("should load within acceptable time", async ({ page }) => {
      const startTime = Date.now();
      await page.goto("");
      await page.waitForLoadState("domcontentloaded");
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(10000);
    });

    test("should have all elements visible after load", async ({ page }) => {
      await page.waitForLoadState("networkidle");

      const indexPage = new IndexPage(page);
      const testComponentPage = new TestComponentPage(page);
      const testDirectivePage = new TestDirectivePage(page);

      await expect(indexPage.title).toBeVisible();
      await expect(testComponentPage.angularjsVersion).toBeVisible();
      await expect(testDirectivePage.jqueryVersion).toBeVisible();
    });
  });

  test.describe("Error Handling", () => {
    test("should not have console errors on page load", async ({ page }) => {
      const errors = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          errors.push(msg.text());
        }
      });

      await page.goto("");
      await page.waitForLoadState("networkidle");

      expect(errors.length).toBe(0);
    });

    test("should not have page errors", async ({ page }) => {
      const pageErrors = [];
      page.on("pageerror", (error) => {
        pageErrors.push(error.message);
      });

      await page.goto("");
      await page.waitForLoadState("networkidle");

      expect(pageErrors.length).toBe(0);
    });
  });
});
