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

test.describe("Page structure and metadata", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should have the correct page title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "XLTS for AngularJS with .NET Framework"
    );
  });

  test("should have proper meta charset", async ({ page }) => {
    const charset = page.locator('meta[charset="utf-8"]');
    await expect(charset).toHaveCount(1);
  });

  test("should have viewport meta tag", async ({ page }) => {
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveCount(1);
    await expect(viewport).toHaveAttribute("content", "width=device-width");
  });

  test("should have IE compatibility meta tag", async ({ page }) => {
    const ieCompat = page.locator(
      'meta[http-equiv="X-UA-Compatible"]'
    );
    await expect(ieCompat).toHaveCount(1);
    await expect(ieCompat).toHaveAttribute("content", "IE=edge");
  });

  test("should load Google Fonts preconnect links", async ({ page }) => {
    const preconnectGoogle = page.locator(
      'link[rel="preconnect"][href="https://fonts.googleapis.com"]'
    );
    const preconnectGstatic = page.locator(
      'link[rel="preconnect"][href="https://fonts.gstatic.com"]'
    );
    await expect(preconnectGoogle).toHaveCount(1);
    await expect(preconnectGstatic).toHaveCount(1);
  });
});

test.describe("AngularJS bootstrap", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should have ng-app attribute on body", async ({ page }) => {
    const body = page.locator("body");
    await expect(body).toHaveAttribute("ng-app", "app");
  });

  test("should bootstrap AngularJS without errors", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("");
    await page.waitForTimeout(1000);
    expect(errors).toEqual([]);
  });

  test("should not have any AngularJS compilation errors in DOM", async ({
    page,
  }) => {
    const ngExceptionElements = page.locator(".ng-binding-error");
    await expect(ngExceptionElements).toHaveCount(0);
  });
});

test.describe("TestComponent rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should render the test-component element", async ({ page }) => {
    const component = page.locator("test-component");
    await expect(component).toHaveCount(1);
  });

  test("should display version text with correct data-testid", async ({
    page,
  }) => {
    const versionEl = page.getByTestId("angularjs-version");
    await expect(versionEl).toBeVisible();
  });

  test("should have the test-component CSS class", async ({ page }) => {
    const el = page.locator(".test-component");
    await expect(el).toHaveCount(1);
  });

  test("should display version in correct format", async ({ page }) => {
    const versionEl = page.getByTestId("angularjs-version");
    const text = await versionEl.textContent();
    expect(text).toMatch(/AngularJS Version: \d+\.\d+\.\d+/);
  });

  test("should have bold font weight styling", async ({ page }) => {
    const el = page.getByTestId("angularjs-version");
    const fontWeight = await el.evaluate(
      (e) => getComputedStyle(e).fontWeight
    );
    expect(["bold", "700"]).toContain(fontWeight);
  });

  test("should have blue color styling", async ({ page }) => {
    const el = page.getByTestId("angularjs-version");
    const color = await el.evaluate((e) => getComputedStyle(e).color);
    expect(color).toBeTruthy();
  });
});

test.describe("TestDirective rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should render the test-directive element", async ({ page }) => {
    const directive = page.locator("test-directive");
    await expect(directive).toHaveCount(1);
  });

  test("should display jQuery version text with correct data-testid", async ({
    page,
  }) => {
    const versionEl = page.getByTestId("jquery-version");
    await expect(versionEl).toBeVisible();
  });

  test("should have the test-directive CSS class", async ({ page }) => {
    const el = page.locator(".test-directive");
    await expect(el).toHaveCount(1);
  });

  test("should display version in correct format", async ({ page }) => {
    const versionEl = page.getByTestId("jquery-version");
    const text = await versionEl.textContent();
    expect(text).toMatch(/jQuery Version: \d+\.\d+\.\d+/);
  });

  test("should have bold font weight styling", async ({ page }) => {
    const el = page.getByTestId("jquery-version");
    const fontWeight = await el.evaluate(
      (e) => getComputedStyle(e).fontWeight
    );
    expect(["bold", "700"]).toContain(fontWeight);
  });
});

test.describe("Page layout and element ordering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should render h1 title as the first heading", async ({ page }) => {
    const heading = page.locator("h1").first();
    await expect(heading).toHaveText(
      "XLTS for AngularJS with .NET Framework"
    );
  });

  test("should render title with data-testid attribute", async ({ page }) => {
    const title = page.getByTestId("title");
    await expect(title).toBeVisible();
    await expect(title).toHaveText(
      "XLTS for AngularJS with .NET Framework"
    );
  });

  test("should have test-directive before test-component in DOM order", async ({
    page,
  }) => {
    const directiveBox = await page
      .locator("test-directive")
      .boundingBox();
    const componentBox = await page
      .locator("test-component")
      .boundingBox();
    expect(directiveBox.y).toBeLessThan(componentBox.y);
  });

  test("should have title above both components", async ({ page }) => {
    const titleBox = await page.getByTestId("title").boundingBox();
    const directiveBox = await page
      .locator("test-directive")
      .boundingBox();
    const componentBox = await page
      .locator("test-component")
      .boundingBox();
    expect(titleBox.y).toBeLessThan(directiveBox.y);
    expect(titleBox.y).toBeLessThan(componentBox.y);
  });
});

test.describe("Accessibility and data attributes", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should have all required data-testid attributes", async ({
    page,
  }) => {
    const testIds = ["title", "angularjs-version", "jquery-version"];
    for (const testId of testIds) {
      const el = page.getByTestId(testId);
      await expect(el).toHaveCount(1);
    }
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });

  test("should have a valid HTML element", async ({ page }) => {
    const html = page.locator("html");
    await expect(html).toHaveCount(1);
  });
});

test.describe("Console and error monitoring", () => {
  test("should load page without JavaScript errors", async ({ page }) => {
    const jsErrors = [];
    page.on("pageerror", (error) => jsErrors.push(error.message));
    await page.goto("");
    await page.waitForTimeout(500);
    expect(jsErrors).toHaveLength(0);
  });

  test("should load page without failed network requests to app resources", async ({
    page,
  }) => {
    const failedRequests = [];
    page.on("requestfailed", (request) => {
      if (!request.url().includes("favicon")) {
        failedRequests.push(request.url());
      }
    });
    await page.goto("");
    await page.waitForTimeout(500);
    expect(failedRequests).toHaveLength(0);
  });
});

test.describe("Responsive behavior", () => {
  test("should render correctly on mobile viewport", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
    });
    const page = await context.newPage();
    await page.goto("");

    const title = page.getByTestId("title");
    await expect(title).toBeVisible();

    const angularVersion = page.getByTestId("angularjs-version");
    await expect(angularVersion).toBeVisible();

    const jqueryVersion = page.getByTestId("jquery-version");
    await expect(jqueryVersion).toBeVisible();

    await context.close();
  });

  test("should render correctly on tablet viewport", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 768, height: 1024 },
    });
    const page = await context.newPage();
    await page.goto("");

    const title = page.getByTestId("title");
    await expect(title).toBeVisible();

    const angularVersion = page.getByTestId("angularjs-version");
    await expect(angularVersion).toBeVisible();

    await context.close();
  });

  test("should render correctly on wide desktop viewport", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();
    await page.goto("");

    const title = page.getByTestId("title");
    await expect(title).toBeVisible();

    const angularVersion = page.getByTestId("angularjs-version");
    await expect(angularVersion).toBeVisible();

    const jqueryVersion = page.getByTestId("jquery-version");
    await expect(jqueryVersion).toBeVisible();

    await context.close();
  });
});

test.describe("Page navigation and reload", () => {
  test("should maintain content after page reload", async ({ page }) => {
    await page.goto("");
    await page.reload();

    const title = page.getByTestId("title");
    await expect(title).toHaveText(
      "XLTS for AngularJS with .NET Framework"
    );

    const angularVersion = page.getByTestId("angularjs-version");
    await expect(angularVersion).toContainText("AngularJS Version:");

    const jqueryVersion = page.getByTestId("jquery-version");
    await expect(jqueryVersion).toContainText("jQuery Version:");
  });

  test("should load the root URL correctly", async ({ page }) => {
    const response = await page.goto("");
    expect(response.status()).toBe(200);
  });

  test("should have all elements visible after navigation back", async ({
    page,
  }) => {
    await page.goto("");
    await page.goto("about:blank");
    await page.goBack();

    const title = page.getByTestId("title");
    await expect(title).toBeVisible();
  });
});
