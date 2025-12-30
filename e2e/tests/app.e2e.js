import { expect, test } from "@playwright/test";
import { IndexPage } from "../pages/index-page";
import { TestComponentPage } from "../pages/test-component-page";
import { TestDirectivePage } from "../pages/test-directive-page";

test.describe("angularjs-asp-net48-mvc5 app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("Index", async ({ page }) => {
    const indexPage = new IndexPage(page);

    await expect(indexPage.title).toHaveText(
      "XLTS for AngularJS with .NET Framework"
    );
  });

  test("TestComponent", async ({ page }) => {
    const testComponentPage = new TestComponentPage(page);

    await expect(testComponentPage.angularjsVersion).toHaveText(
      "AngularJS Version: 1.8.2"
    );
  });

  test("TestDirective", async ({ page }) => {
    const testDirective = new TestDirectivePage(page);

    await expect(testDirective.jqueryVersion).toHaveText(
      "jQuery Version: 3.6.0"
    );
  });
});

test.describe("Page Load and Rendering", () => {
  test("should load the page successfully", async ({ page }) => {
    const response = await page.goto("");
    expect(response.status()).toBe(200);
  });

  test("should have correct page title in browser tab", async ({ page }) => {
    await page.goto("");
    await expect(page).toHaveTitle("XLTS for AngularJS with .NET Framework");
  });

  test("should render all main elements", async ({ page }) => {
    await page.goto("");
    const indexPage = new IndexPage(page);
    const testComponentPage = new TestComponentPage(page);
    const testDirective = new TestDirectivePage(page);

    await expect(indexPage.title).toBeVisible();
    await expect(testComponentPage.angularjsVersion).toBeVisible();
    await expect(testDirective.jqueryVersion).toBeVisible();
  });

  test("should have AngularJS app initialized", async ({ page }) => {
    await page.goto("");
    const ngApp = page.locator("[ng-app]");
    await expect(ngApp).toHaveAttribute("ng-app", "app");
  });

  test("should load external fonts", async ({ page }) => {
    await page.goto("");
    const fontLink = page.locator(
      'link[href*="fonts.googleapis.com/css2?family=Roboto"]'
    );
    await expect(fontLink).toBeAttached();
  });
});

test.describe("Component Visibility and Styling", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("title should be an h1 element", async ({ page }) => {
    const title = page.locator("h1[data-testid='title']");
    await expect(title).toBeVisible();
  });

  test("test-component should have correct styling class", async ({ page }) => {
    const component = page.locator(".test-component");
    await expect(component).toBeVisible();
  });

  test("test-directive should have correct styling class", async ({ page }) => {
    const directive = page.locator(".test-directive");
    await expect(directive).toBeVisible();
  });

  test("components should be rendered in correct order", async ({ page }) => {
    const body = page.locator("body");
    const html = await body.innerHTML();

    const titleIndex = html.indexOf('data-testid="title"');
    const directiveIndex = html.indexOf('data-testid="jquery-version"');
    const componentIndex = html.indexOf('data-testid="angularjs-version"');

    expect(titleIndex).toBeLessThan(directiveIndex);
    expect(directiveIndex).toBeLessThan(componentIndex);
  });

  test("test-component should display version number format", async ({
    page,
  }) => {
    const testComponentPage = new TestComponentPage(page);
    const text = await testComponentPage.angularjsVersion.textContent();
    expect(text).toMatch(/AngularJS Version: \d+\.\d+\.\d+/);
  });

  test("test-directive should display version number format", async ({
    page,
  }) => {
    const testDirective = new TestDirectivePage(page);
    const text = await testDirective.jqueryVersion.textContent();
    expect(text).toMatch(/jQuery Version: \d+\.\d+\.\d+/);
  });
});

test.describe("Responsive Design", () => {
  test("should render correctly on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("");

    const indexPage = new IndexPage(page);
    const testComponentPage = new TestComponentPage(page);
    const testDirective = new TestDirectivePage(page);

    await expect(indexPage.title).toBeVisible();
    await expect(testComponentPage.angularjsVersion).toBeVisible();
    await expect(testDirective.jqueryVersion).toBeVisible();
  });

  test("should render correctly on tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("");

    const indexPage = new IndexPage(page);
    const testComponentPage = new TestComponentPage(page);
    const testDirective = new TestDirectivePage(page);

    await expect(indexPage.title).toBeVisible();
    await expect(testComponentPage.angularjsVersion).toBeVisible();
    await expect(testDirective.jqueryVersion).toBeVisible();
  });

  test("should render correctly on desktop viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("");

    const indexPage = new IndexPage(page);
    const testComponentPage = new TestComponentPage(page);
    const testDirective = new TestDirectivePage(page);

    await expect(indexPage.title).toBeVisible();
    await expect(testComponentPage.angularjsVersion).toBeVisible();
    await expect(testDirective.jqueryVersion).toBeVisible();
  });

  test("elements should remain visible after viewport resize", async ({
    page,
  }) => {
    await page.goto("");
    await page.setViewportSize({ width: 1920, height: 1080 });

    const indexPage = new IndexPage(page);
    await expect(indexPage.title).toBeVisible();

    await page.setViewportSize({ width: 375, height: 667 });
    await expect(indexPage.title).toBeVisible();

    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(indexPage.title).toBeVisible();
  });
});

test.describe("Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("page should have proper document structure", async ({ page }) => {
    const html = page.locator("html");
    const head = page.locator("head");
    const body = page.locator("body");

    await expect(html).toBeAttached();
    await expect(head).toBeAttached();
    await expect(body).toBeAttached();
  });

  test("page should have charset meta tag", async ({ page }) => {
    const charset = page.locator('meta[charset="utf-8"]');
    await expect(charset).toBeAttached();
  });

  test("page should have viewport meta tag", async ({ page }) => {
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toBeAttached();
  });

  test("title element should be present and non-empty", async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test("h1 should be the first heading on the page", async ({ page }) => {
    const firstHeading = page.locator("h1, h2, h3, h4, h5, h6").first();
    const tagName = await firstHeading.evaluate((el) =>
      el.tagName.toLowerCase()
    );
    expect(tagName).toBe("h1");
  });

  test("all interactive elements should be focusable", async ({ page }) => {
    const focusableElements = page.locator(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const count = await focusableElements.count();

    for (let i = 0; i < count; i++) {
      const element = focusableElements.nth(i);
      await expect(element).toBeEnabled();
    }
  });

  test("data-testid attributes should be present for testing", async ({
    page,
  }) => {
    const testIds = page.locator("[data-testid]");
    const count = await testIds.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});

test.describe("Performance", () => {
  test("page should load within acceptable time", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("");
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(10000);
  });

  test("DOM should be ready quickly", async ({ page }) => {
    await page.goto("");

    const domContentLoaded = await page.evaluate(() => {
      return (
        performance.timing.domContentLoadedEventEnd -
        performance.timing.navigationStart
      );
    });

    expect(domContentLoaded).toBeLessThan(5000);
  });

  test("page should have minimal DOM elements", async ({ page }) => {
    await page.goto("");

    const elementCount = await page.evaluate(() => {
      return document.querySelectorAll("*").length;
    });

    expect(elementCount).toBeLessThan(100);
  });
});

test.describe("AngularJS Integration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("AngularJS should be loaded", async ({ page }) => {
    const angularLoaded = await page.evaluate(() => {
      return typeof window.angular !== "undefined";
    });
    expect(angularLoaded).toBe(true);
  });

  test("AngularJS version should be available", async ({ page }) => {
    const version = await page.evaluate(() => {
      return window.angular.version.full;
    });
    expect(version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  test("app module should be bootstrapped", async ({ page }) => {
    const appBootstrapped = await page.evaluate(() => {
      try {
        const element = document.querySelector("[ng-app]");
        return element !== null && element.getAttribute("ng-app") === "app";
      } catch (e) {
        return false;
      }
    });
    expect(appBootstrapped).toBe(true);
  });

  test("custom components should be rendered", async ({ page }) => {
    const testComponent = page.locator("test-component");
    const testDirective = page.locator("test-directive");

    await expect(testComponent).toBeAttached();
    await expect(testDirective).toBeAttached();
  });
});

test.describe("jQuery Integration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("jQuery should be loaded", async ({ page }) => {
    const jQueryLoaded = await page.evaluate(() => {
      return typeof window.jQuery !== "undefined";
    });
    expect(jQueryLoaded).toBe(true);
  });

  test("jQuery version should be available", async ({ page }) => {
    const version = await page.evaluate(() => {
      return window.jQuery.fn.jquery;
    });
    expect(version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  test("$ alias should be available", async ({ page }) => {
    const dollarAvailable = await page.evaluate(() => {
      return typeof window.$ !== "undefined" && window.$ === window.jQuery;
    });
    expect(dollarAvailable).toBe(true);
  });
});

test.describe("Error Handling", () => {
  test("page should not have JavaScript errors", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => {
      errors.push(error.message);
    });

    await page.goto("");
    await page.waitForLoadState("networkidle");

    expect(errors).toHaveLength(0);
  });

  test("page should not have console errors", async ({ page }) => {
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("");
    await page.waitForLoadState("networkidle");

    expect(consoleErrors).toHaveLength(0);
  });

  test("page should handle network errors gracefully", async ({ page }) => {
    await page.route("**/*.css", (route) => route.abort());

    const response = await page.goto("");
    expect(response.status()).toBe(200);

    const indexPage = new IndexPage(page);
    await expect(indexPage.title).toBeVisible();
  });
});

test.describe("Visual Regression", () => {
  test("page layout should be consistent", async ({ page }) => {
    await page.goto("");

    const title = page.locator('[data-testid="title"]');
    const angularVersion = page.locator('[data-testid="angularjs-version"]');
    const jqueryVersion = page.locator('[data-testid="jquery-version"]');

    const titleBox = await title.boundingBox();
    const angularBox = await angularVersion.boundingBox();
    const jqueryBox = await jqueryVersion.boundingBox();

    expect(titleBox.y).toBeLessThan(jqueryBox.y);
    expect(jqueryBox.y).toBeLessThan(angularBox.y);
  });

  test("elements should have non-zero dimensions", async ({ page }) => {
    await page.goto("");

    const elements = [
      '[data-testid="title"]',
      '[data-testid="angularjs-version"]',
      '[data-testid="jquery-version"]',
    ];

    for (const selector of elements) {
      const element = page.locator(selector);
      const box = await element.boundingBox();
      expect(box.width).toBeGreaterThan(0);
      expect(box.height).toBeGreaterThan(0);
    }
  });
});

test.describe("Navigation and URL", () => {
  test("should navigate to root URL", async ({ page }) => {
    await page.goto("");
    expect(page.url()).toContain("localhost");
  });

  test("should handle page refresh", async ({ page }) => {
    await page.goto("");
    const indexPage = new IndexPage(page);
    await expect(indexPage.title).toBeVisible();

    await page.reload();
    await expect(indexPage.title).toBeVisible();
  });

  test("should maintain state after soft navigation", async ({ page }) => {
    await page.goto("");
    const testComponentPage = new TestComponentPage(page);

    const versionBefore = await testComponentPage.angularjsVersion.textContent();

    await page.goto("");

    const versionAfter = await testComponentPage.angularjsVersion.textContent();
    expect(versionBefore).toBe(versionAfter);
  });
});
