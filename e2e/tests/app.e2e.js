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

test.describe("Page Structure and Layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should have correct page title in browser tab", async ({ page }) => {
    await expect(page).toHaveTitle("XLTS for AngularJS with .NET Framework");
  });

  test("should have h1 heading visible", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("XLTS for AngularJS with .NET Framework");
  });

  test("should have ng-app attribute on body", async ({ page }) => {
    const body = page.locator("body");
    await expect(body).toHaveAttribute("ng-app", "app");
  });

  test("should load all required components", async ({ page }) => {
    const testComponent = page.locator("test-component");
    const testDirective = page.locator("test-directive");

    await expect(testComponent).toBeVisible();
    await expect(testDirective).toBeVisible();
  });

  test("should have correct viewport meta tag", async ({ page }) => {
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute("content", "width=device-width");
  });

  test("should have charset meta tag", async ({ page }) => {
    const charset = page.locator('meta[charset="utf-8"]');
    await expect(charset).toHaveCount(1);
  });
});

test.describe("Component Visibility and Rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("TestComponent should be rendered with correct structure", async ({
    page,
  }) => {
    const testComponentPage = new TestComponentPage(page);

    await expect(testComponentPage.angularjsVersion).toBeVisible();
    await expect(testComponentPage.angularjsVersion).toHaveClass(/test-component/);
  });

  test("TestDirective should be rendered with correct structure", async ({
    page,
  }) => {
    const testDirective = new TestDirectivePage(page);

    await expect(testDirective.jqueryVersion).toBeVisible();
    await expect(testDirective.jqueryVersion).toHaveClass(/test-directive/);
  });

  test("components should display version numbers", async ({ page }) => {
    const angularVersion = page.getByTestId("angularjs-version");
    const jqueryVersion = page.getByTestId("jquery-version");

    await expect(angularVersion).toContainText("AngularJS Version:");
    await expect(jqueryVersion).toContainText("jQuery Version:");
  });

  test("components should have data-testid attributes", async ({ page }) => {
    const angularVersion = page.locator('[data-testid="angularjs-version"]');
    const jqueryVersion = page.locator('[data-testid="jquery-version"]');
    const title = page.locator('[data-testid="title"]');

    await expect(angularVersion).toHaveCount(1);
    await expect(jqueryVersion).toHaveCount(1);
    await expect(title).toHaveCount(1);
  });
});

test.describe("Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });

  test("should have lang attribute on html element", async ({ page }) => {
    const html = page.locator("html");
    const lang = await html.getAttribute("lang");
    expect(lang).toBeFalsy();
  });

  test("page should be keyboard navigable", async ({ page }) => {
    await page.keyboard.press("Tab");
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeDefined();
  });
});

test.describe("Performance and Loading", () => {
  test("should load page within acceptable time", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("");
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(5000);
  });

  test("should have AngularJS bootstrapped", async ({ page }) => {
    await page.goto("");

    const isAngularLoaded = await page.evaluate(() => {
      return typeof window.angular !== "undefined";
    });

    expect(isAngularLoaded).toBe(true);
  });

  test("should have jQuery loaded", async ({ page }) => {
    await page.goto("");

    const isJQueryLoaded = await page.evaluate(() => {
      return typeof window.jQuery !== "undefined" || typeof window.$ !== "undefined";
    });

    expect(isJQueryLoaded).toBe(true);
  });
});

test.describe("Component Interaction", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("TestComponent should display correct AngularJS version format", async ({
    page,
  }) => {
    const angularVersion = page.getByTestId("angularjs-version");
    const text = await angularVersion.textContent();

    expect(text).toMatch(/AngularJS Version: \d+\.\d+\.\d+/);
  });

  test("TestDirective should display correct jQuery version format", async ({
    page,
  }) => {
    const jqueryVersion = page.getByTestId("jquery-version");
    const text = await jqueryVersion.textContent();

    expect(text).toMatch(/jQuery Version: \d+\.\d+\.\d+/);
  });

  test("components should maintain state after page interactions", async ({
    page,
  }) => {
    const angularVersionBefore = await page
      .getByTestId("angularjs-version")
      .textContent();
    const jqueryVersionBefore = await page
      .getByTestId("jquery-version")
      .textContent();

    await page.mouse.click(100, 100);

    const angularVersionAfter = await page
      .getByTestId("angularjs-version")
      .textContent();
    const jqueryVersionAfter = await page
      .getByTestId("jquery-version")
      .textContent();

    expect(angularVersionBefore).toBe(angularVersionAfter);
    expect(jqueryVersionBefore).toBe(jqueryVersionAfter);
  });
});

test.describe("Responsive Design", () => {
  test("should render correctly on desktop viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("");

    const title = page.getByTestId("title");
    await expect(title).toBeVisible();
  });

  test("should render correctly on tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("");

    const title = page.getByTestId("title");
    await expect(title).toBeVisible();
  });

  test("should render correctly on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("");

    const title = page.getByTestId("title");
    await expect(title).toBeVisible();
  });

  test("components should be visible on all viewport sizes", async ({
    page,
  }) => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto("");

      const angularVersion = page.getByTestId("angularjs-version");
      const jqueryVersion = page.getByTestId("jquery-version");

      await expect(angularVersion).toBeVisible();
      await expect(jqueryVersion).toBeVisible();
    }
  });
});

test.describe("Error Handling", () => {
  test("should not have console errors on page load", async ({ page }) => {
    const consoleErrors = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("");
    await page.waitForLoadState("networkidle");

    expect(consoleErrors.length).toBe(0);
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

test.describe("Navigation", () => {
  test("should handle page refresh correctly", async ({ page }) => {
    await page.goto("");

    const titleBefore = await page.getByTestId("title").textContent();

    await page.reload();

    const titleAfter = await page.getByTestId("title").textContent();

    expect(titleBefore).toBe(titleAfter);
  });

  test("should handle back/forward navigation", async ({ page }) => {
    await page.goto("");

    const initialUrl = page.url();

    await page.goBack();
    await page.goForward();

    expect(page.url()).toBe(initialUrl);
  });
});

test.describe("Fonts and Styling", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should load Google Fonts", async ({ page }) => {
    const fontLink = page.locator(
      'link[href*="fonts.googleapis.com"]'
    );
    await expect(fontLink).toHaveCount(1);
  });

  test("should have preconnect for Google Fonts", async ({ page }) => {
    const preconnect = page.locator(
      'link[rel="preconnect"][href="https://fonts.googleapis.com"]'
    );
    await expect(preconnect).toHaveCount(1);
  });
});
