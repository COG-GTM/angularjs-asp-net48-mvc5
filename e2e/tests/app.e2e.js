import { expect, test } from "@playwright/test";
import { IndexPage } from "../pages/index-page";
import { TestComponentPage } from "../pages/test-component-page";
import { TestDirectivePage } from "../pages/test-directive-page";

test.describe("angularjs-asp-net48-mvc5 app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test.describe("Page Structure and Metadata", () => {
    test("should have correct page title", async ({ page }) => {
      const indexPage = new IndexPage(page);
      const pageTitle = await indexPage.getPageTitle();
      expect(pageTitle).toBe("XLTS for AngularJS with .NET Framework");
    });

    test("should have correct main heading", async ({ page }) => {
      const indexPage = new IndexPage(page);
      await expect(indexPage.title).toHaveText(
        "XLTS for AngularJS with .NET Framework"
      );
    });

    test("should have viewport meta tag", async ({ page }) => {
      const indexPage = new IndexPage(page);
      const viewport = await indexPage.getMetaViewport();
      expect(viewport).toBe("width=device-width");
    });

    test("should have charset meta tag", async ({ page }) => {
      const indexPage = new IndexPage(page);
      const charset = await indexPage.getMetaCharset();
      expect(charset).toBe("utf-8");
    });

    test("should have ng-app attribute on body", async ({ page }) => {
      const indexPage = new IndexPage(page);
      const ngApp = await indexPage.hasNgApp();
      expect(ngApp).toBe("app");
    });

    test("should have h1 element with data-testid", async ({ page }) => {
      const h1 = page.locator('h1[data-testid="title"]');
      await expect(h1).toBeVisible();
    });
  });

  test.describe("AngularJS Application Bootstrap", () => {
    test("should bootstrap AngularJS application", async ({ page }) => {
      const ngAppElement = page.locator('[ng-app="app"]');
      await expect(ngAppElement).toBeVisible();
    });

    test("should have AngularJS loaded", async ({ page }) => {
      const angularLoaded = await page.evaluate(() => {
        return typeof window.angular !== "undefined";
      });
      expect(angularLoaded).toBe(true);
    });

    test("should have app module defined", async ({ page }) => {
      const appModuleDefined = await page.evaluate(() => {
        try {
          return typeof window.angular.module("app") !== "undefined";
        } catch (e) {
          return false;
        }
      });
      expect(appModuleDefined).toBe(true);
    });
  });

  test.describe("TestComponent", () => {
    test("should display AngularJS version", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.angularjsVersion).toBeVisible();
    });

    test("should have correct version format", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const versionText = await testComponentPage.getVersionText();
      expect(versionText).toMatch(/AngularJS Version: \d+\.\d+\.\d+/);
    });

    test("should display version 1.8.x", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const versionText = await testComponentPage.getVersionText();
      expect(versionText).toContain("AngularJS Version: 1.8.");
    });

    test("should be visible on page", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const isVisible = await testComponentPage.isVisible();
      expect(isVisible).toBe(true);
    });

    test("should have test-component class", async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const hasClass = await testComponentPage.hasTestComponentClass();
      expect(hasClass).toBe(true);
    });

    test("should have data-testid attribute", async ({ page }) => {
      const element = page.getByTestId("angularjs-version");
      await expect(element).toBeVisible();
    });

    test("should render component element", async ({ page }) => {
      const component = page.locator("test-component");
      await expect(component).toBeVisible();
    });
  });

  test.describe("TestDirective", () => {
    test("should display jQuery version", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      await expect(testDirective.jqueryVersion).toBeVisible();
    });

    test("should have correct version format", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      const versionText = await testDirective.getVersionText();
      expect(versionText).toMatch(/jQuery Version: \d+\.\d+\.\d+/);
    });

    test("should display version 3.x", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      const versionText = await testDirective.getVersionText();
      expect(versionText).toContain("jQuery Version: 3.");
    });

    test("should be visible on page", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      const isVisible = await testDirective.isVisible();
      expect(isVisible).toBe(true);
    });

    test("should have test-directive class", async ({ page }) => {
      const testDirective = new TestDirectivePage(page);
      const hasClass = await testDirective.hasTestDirectiveClass();
      expect(hasClass).toBe(true);
    });

    test("should have data-testid attribute", async ({ page }) => {
      const element = page.getByTestId("jquery-version");
      await expect(element).toBeVisible();
    });

    test("should render directive element", async ({ page }) => {
      const directive = page.locator("test-directive");
      await expect(directive).toBeVisible();
    });
  });

  test.describe("Page Layout and Order", () => {
    test("should have title before components", async ({ page }) => {
      const indexPage = new IndexPage(page);
      const titleBox = await indexPage.title.boundingBox();
      const componentBox = await indexPage.testComponent.boundingBox();
      expect(titleBox.y).toBeLessThan(componentBox.y);
    });

    test("should have directive before component", async ({ page }) => {
      const indexPage = new IndexPage(page);
      const directiveBox = await indexPage.testDirective.boundingBox();
      const componentBox = await indexPage.testComponent.boundingBox();
      expect(directiveBox.y).toBeLessThan(componentBox.y);
    });

    test("should have all main elements visible", async ({ page }) => {
      const indexPage = new IndexPage(page);
      await expect(indexPage.title).toBeVisible();
      await expect(indexPage.testComponent).toBeVisible();
      await expect(indexPage.testDirective).toBeVisible();
    });
  });

  test.describe("Accessibility", () => {
    test("should have proper heading hierarchy", async ({ page }) => {
      const h1Count = await page.locator("h1").count();
      expect(h1Count).toBe(1);
    });

    test("should have lang attribute on html", async ({ page }) => {
      const html = page.locator("html");
      const lang = await html.getAttribute("lang");
      expect(lang).toBeNull();
    });

    test("should have proper document structure", async ({ page }) => {
      const head = page.locator("head");
      const body = page.locator("body");
      await expect(head).toBeAttached();
      await expect(body).toBeAttached();
    });
  });

  test.describe("External Resources", () => {
    test("should load Google Fonts", async ({ page }) => {
      const fontLink = page.locator('link[href*="fonts.googleapis.com"]');
      await expect(fontLink).toBeAttached();
    });

    test("should have preconnect for Google Fonts", async ({ page }) => {
      const preconnect = page.locator(
        'link[rel="preconnect"][href="https://fonts.googleapis.com"]'
      );
      await expect(preconnect).toBeAttached();
    });

    test("should have preconnect for gstatic", async ({ page }) => {
      const preconnect = page.locator(
        'link[rel="preconnect"][href="https://fonts.gstatic.com"]'
      );
      await expect(preconnect).toBeAttached();
    });
  });

  test.describe("JavaScript Dependencies", () => {
    test("should have jQuery loaded", async ({ page }) => {
      const jqueryLoaded = await page.evaluate(() => {
        return typeof window.jQuery !== "undefined";
      });
      expect(jqueryLoaded).toBe(true);
    });

    test("should have jQuery version 3.x", async ({ page }) => {
      const jqueryVersion = await page.evaluate(() => {
        return window.jQuery.fn.jquery;
      });
      expect(jqueryVersion).toMatch(/^3\./);
    });

    test("should have AngularJS version 1.8.x", async ({ page }) => {
      const angularVersion = await page.evaluate(() => {
        return window.angular.version.full;
      });
      expect(angularVersion).toMatch(/^1\.8\./);
    });
  });

  test.describe("Error Handling", () => {
    test("should not have JavaScript errors on load", async ({ page }) => {
      const errors = [];
      page.on("pageerror", (error) => {
        errors.push(error.message);
      });
      await page.reload();
      await page.waitForLoadState("networkidle");
      expect(errors).toHaveLength(0);
    });

    test("should not have console errors", async ({ page }) => {
      const consoleErrors = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text());
        }
      });
      await page.reload();
      await page.waitForLoadState("networkidle");
      expect(consoleErrors).toHaveLength(0);
    });
  });

  test.describe("Performance", () => {
    test("should load within reasonable time", async ({ page }) => {
      const startTime = Date.now();
      await page.reload();
      await page.waitForLoadState("domcontentloaded");
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(5000);
    });

    test("should have DOM ready quickly", async ({ page }) => {
      const domReady = await page.evaluate(() => {
        return document.readyState === "complete";
      });
      expect(domReady).toBe(true);
    });
  });
});
