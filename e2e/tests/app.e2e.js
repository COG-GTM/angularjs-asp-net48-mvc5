import { expect, test } from '@playwright/test';
import { IndexPage } from '../pages/index-page';
import { TestComponentPage } from '../pages/test-component-page';
import { TestDirectivePage } from '../pages/test-directive-page';

test.describe('angularjs-asp-net48-mvc5 app', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('Index', async ({ page }) => {
    const indexPage = new IndexPage(page);

    await expect(indexPage.title).toHaveText('XLTS for AngularJS with .NET Framework');
  });

  test('TestComponent', async ({ page }) => {
    const testComponentPage = new TestComponentPage(page);

    await expect(testComponentPage.angularjsVersion).toHaveText('AngularJS Version: 1.8.2');
  });

  test('TestDirective', async ({ page }) => {
    const testDirective = new TestDirectivePage(page);

    await expect(testDirective.jqueryVersion).toHaveText('jQuery Version: 3.6.0');
  });
});

test.describe("Page structure and metadata", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should have correct page title in document", async ({ page }) => {
    await expect(page).toHaveTitle(
      "XLTS for AngularJS with .NET Framework"
    );
  });

  test("should have ng-app attribute on body", async ({ page }) => {
    const body = page.locator("body");
    await expect(body).toHaveAttribute("ng-app", "app");
  });

  test("should have proper meta charset tag", async ({ page }) => {
    const meta = page.locator('meta[charset="utf-8"]');
    await expect(meta).toHaveCount(1);
  });

  test("should have viewport meta tag", async ({ page }) => {
    const meta = page.locator('meta[name="viewport"]');
    await expect(meta).toHaveCount(1);
  });

  test("should have X-UA-Compatible meta tag", async ({ page }) => {
    const meta = page.locator('meta[http-equiv="X-UA-Compatible"]');
    await expect(meta).toHaveAttribute("content", "IE=edge");
  });

  test("should load Google Fonts preconnect links", async ({ page }) => {
    const preconnect = page.locator(
      'link[rel="preconnect"][href="https://fonts.googleapis.com"]'
    );
    await expect(preconnect).toHaveCount(1);
  });

  test("should load Roboto font stylesheet", async ({ page }) => {
    const fontLink = page.locator(
      'link[href*="fonts.googleapis.com/css2?family=Roboto"]'
    );
    await expect(fontLink).toHaveCount(1);
  });
});

test.describe("Page layout and element hierarchy", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should have h1 title as first heading", async ({ page }) => {
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveAttribute("data-testid", "title");
  });

  test("should render test-component element", async ({ page }) => {
    const component = page.locator("test-component");
    await expect(component).toHaveCount(1);
  });

  test("should render test-directive element", async ({ page }) => {
    const directive = page.locator("test-directive");
    await expect(directive).toHaveCount(1);
  });

  test("should render title before component and directive", async ({
    page,
  }) => {
    const body = page.locator("body");
    const children = body.locator("> *");
    const count = await children.count();
    expect(count).toBeGreaterThanOrEqual(3);

    const firstChild = children.nth(0);
    await expect(firstChild).toHaveAttribute("data-testid", "title");
  });

  test("should have all three main elements visible", async ({ page }) => {
    await expect(page.locator("h1")).toBeVisible();
    await expect(
      page.locator('[data-testid="angularjs-version"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="jquery-version"]')
    ).toBeVisible();
  });
});

test.describe("TestComponent details", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should display AngularJS version with correct prefix", async ({
    page,
  }) => {
    const versionEl = page.getByTestId("angularjs-version");
    const text = await versionEl.textContent();
    expect(text).toMatch(/^AngularJS Version: \d+\.\d+\.\d+$/);
  });

  test("should have test-component CSS class", async ({ page }) => {
    const versionEl = page.getByTestId("angularjs-version");
    await expect(versionEl).toHaveClass(/test-component/);
  });

  test("should be visible on page load", async ({ page }) => {
    const versionEl = page.getByTestId("angularjs-version");
    await expect(versionEl).toBeVisible();
  });

  test("should have non-empty text content", async ({ page }) => {
    const versionEl = page.getByTestId("angularjs-version");
    const text = await versionEl.textContent();
    expect(text.trim().length).toBeGreaterThan(0);
  });

  test("should have styled text with bold font weight", async ({ page }) => {
    const versionEl = page.getByTestId("angularjs-version");
    await expect(versionEl).toHaveCSS("font-weight", "700");
  });

  test("should have blue color styling", async ({ page }) => {
    const versionEl = page.getByTestId("angularjs-version");
    await expect(versionEl).toHaveCSS("color", "rgb(21, 101, 192)");
  });
});

test.describe("TestDirective details", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should display jQuery version with correct prefix", async ({
    page,
  }) => {
    const versionEl = page.getByTestId("jquery-version");
    const text = await versionEl.textContent();
    expect(text.trim()).toMatch(/^jQuery Version: \d+\.\d+\.\d+$/);
  });

  test("should have test-directive CSS class", async ({ page }) => {
    const versionEl = page.getByTestId("jquery-version");
    await expect(versionEl).toHaveClass(/test-directive/);
  });

  test("should be visible on page load", async ({ page }) => {
    const versionEl = page.getByTestId("jquery-version");
    await expect(versionEl).toBeVisible();
  });

  test("should have non-empty text content", async ({ page }) => {
    const versionEl = page.getByTestId("jquery-version");
    const text = await versionEl.textContent();
    expect(text.trim().length).toBeGreaterThan(0);
  });

  test("should have styled text with bold font weight", async ({ page }) => {
    const versionEl = page.getByTestId("jquery-version");
    await expect(versionEl).toHaveCSS("font-weight", "700");
  });

  test("should have light blue color styling", async ({ page }) => {
    const versionEl = page.getByTestId("jquery-version");
    await expect(versionEl).toHaveCSS("color", "rgb(33, 150, 243)");
  });
});

test.describe("AngularJS integration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should bootstrap AngularJS application", async ({ page }) => {
    const ngApp = await page.evaluate(() => {
      const body = document.querySelector("body");
      return body.getAttribute("ng-app");
    });
    expect(ngApp).toBe("app");
  });

  test("should have AngularJS loaded on the page", async ({ page }) => {
    const angularDefined = await page.evaluate(() => {
      return typeof window.angular !== "undefined";
    });
    expect(angularDefined).toBe(true);
  });

  test("should have jQuery loaded on the page", async ({ page }) => {
    const jQueryDefined = await page.evaluate(() => {
      return typeof window.jQuery !== "undefined";
    });
    expect(jQueryDefined).toBe(true);
  });

  test("should have AngularJS version matching displayed version", async ({
    page,
  }) => {
    const displayedVersion = await page
      .getByTestId("angularjs-version")
      .textContent();
    const actualVersion = await page.evaluate(() => {
      return window.angular.version.full;
    });
    expect(displayedVersion).toContain(actualVersion);
  });

  test("should have jQuery version matching displayed version", async ({
    page,
  }) => {
    const displayedVersion = await page
      .getByTestId("jquery-version")
      .textContent();
    const actualVersion = await page.evaluate(() => {
      return window.jQuery.fn.jquery;
    });
    expect(displayedVersion.trim()).toContain(actualVersion);
  });

  test("should resolve AngularJS bindings (no curly braces visible)", async ({
    page,
  }) => {
    const componentText = await page
      .getByTestId("angularjs-version")
      .textContent();
    expect(componentText).not.toContain("{{");
    expect(componentText).not.toContain("}}");

    const directiveText = await page
      .getByTestId("jquery-version")
      .textContent();
    expect(directiveText).not.toContain("{{");
    expect(directiveText).not.toContain("}}");
  });
});

test.describe("Accessibility and semantics", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should have proper HTML document structure", async ({ page }) => {
    const html = page.locator("html");
    await expect(html).toHaveCount(1);

    const head = page.locator("head");
    await expect(head).toHaveCount(1);

    const body = page.locator("body");
    await expect(body).toHaveCount(1);
  });

  test("should have data-testid attributes for testability", async ({
    page,
  }) => {
    const testIds = page.locator("[data-testid]");
    const count = await testIds.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test("should use semantic heading element for title", async ({ page }) => {
    const heading = page.locator("h1[data-testid='title']");
    await expect(heading).toHaveCount(1);
  });
});

test.describe("Page reload behavior", () => {
  test("should maintain state after page reload", async ({ page }) => {
    await page.goto("");

    const versionBefore = await page
      .getByTestId("angularjs-version")
      .textContent();

    await page.reload();

    const versionAfter = await page
      .getByTestId("angularjs-version")
      .textContent();
    expect(versionBefore).toBe(versionAfter);
  });

  test("should maintain jQuery version after reload", async ({ page }) => {
    await page.goto("");

    const versionBefore = await page
      .getByTestId("jquery-version")
      .textContent();

    await page.reload();

    const versionAfter = await page
      .getByTestId("jquery-version")
      .textContent();
    expect(versionBefore.trim()).toBe(versionAfter.trim());
  });
});

test.describe("Console logging", () => {
  test("should log component initialization message", async ({ page }) => {
    const consoleMessages = [];
    page.on("console", (msg) => {
      if (msg.type() === "info" || msg.type() === "log") {
        consoleMessages.push(msg.text());
      }
    });

    await page.goto("");
    await page.waitForTimeout(500);

    const hasComponentLog = consoleMessages.some((msg) =>
      msg.includes("test-component initialized")
    );
    expect(hasComponentLog).toBe(true);
  });

  test("should log directive initialization message", async ({ page }) => {
    const consoleMessages = [];
    page.on("console", (msg) => {
      if (msg.type() === "info" || msg.type() === "log") {
        consoleMessages.push(msg.text());
      }
    });

    await page.goto("");
    await page.waitForTimeout(500);

    const hasDirectiveLog = consoleMessages.some((msg) =>
      msg.includes("test-directive initialized")
    );
    expect(hasDirectiveLog).toBe(true);
  });

  test("should not have any error console messages", async ({ page }) => {
    const errorMessages = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errorMessages.push(msg.text());
      }
    });

    await page.goto("");
    await page.waitForTimeout(500);

    expect(errorMessages.length).toBe(0);
  });
});
