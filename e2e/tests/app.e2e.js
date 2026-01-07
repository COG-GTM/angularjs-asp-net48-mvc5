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

test.describe("Page Load and Performance", () => {
  test("should load the page within acceptable time", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("");
    await page.waitForLoadState("domcontentloaded");
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(10000);
  });

  test("should have correct page title", async ({ page }) => {
    await page.goto("");
    await expect(page).toHaveTitle("XLTS for AngularJS with .NET Framework");
  });

  test("should load all required resources", async ({ page }) => {
    await page.goto("");
    await page.waitForLoadState("networkidle");

    const angularLoaded = await page.evaluate(() => {
      return typeof angular !== "undefined";
    });
    expect(angularLoaded).toBe(true);

    const jqueryLoaded = await page.evaluate(() => {
      return typeof jQuery !== "undefined" || typeof $ !== "undefined";
    });
    expect(jqueryLoaded).toBe(true);
  });
});

test.describe("Component Visibility and Rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should display the main title", async ({ page }) => {
    const title = page.getByTestId("title");
    await expect(title).toBeVisible();
  });

  test("should display the AngularJS version component", async ({ page }) => {
    const angularjsVersion = page.getByTestId("angularjs-version");
    await expect(angularjsVersion).toBeVisible();
  });

  test("should display the jQuery version directive", async ({ page }) => {
    const jqueryVersion = page.getByTestId("jquery-version");
    await expect(jqueryVersion).toBeVisible();
  });

  test("should render all components in correct order", async ({ page }) => {
    const body = page.locator("body");
    const html = await body.innerHTML();

    const titleIndex = html.indexOf('data-testid="title"');
    const jqueryIndex = html.indexOf('data-testid="jquery-version"');
    const angularIndex = html.indexOf('data-testid="angularjs-version"');

    expect(titleIndex).toBeLessThan(jqueryIndex);
    expect(jqueryIndex).toBeLessThan(angularIndex);
  });
});

test.describe("Component Styling", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should apply test-component class to AngularJS version element", async ({
    page,
  }) => {
    const angularjsVersion = page.getByTestId("angularjs-version");
    await expect(angularjsVersion).toHaveClass(/test-component/);
  });

  test("should apply test-directive class to jQuery version element", async ({
    page,
  }) => {
    const jqueryVersion = page.getByTestId("jquery-version");
    await expect(jqueryVersion).toHaveClass(/test-directive/);
  });

  test("should have h1 element for title", async ({ page }) => {
    const title = page.locator("h1[data-testid='title']");
    await expect(title).toBeVisible();
  });
});

test.describe("AngularJS Application Bootstrap", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should have ng-app attribute on body", async ({ page }) => {
    const body = page.locator("body");
    await expect(body).toHaveAttribute("ng-app", "app");
  });

  test("should initialize AngularJS application", async ({ page }) => {
    const appInitialized = await page.evaluate(() => {
      const element = document.querySelector("[ng-app]");
      return element !== null;
    });
    expect(appInitialized).toBe(true);
  });

  test("should have AngularJS module defined", async ({ page }) => {
    const moduleExists = await page.evaluate(() => {
      try {
        return angular.module("app") !== undefined;
      } catch (e) {
        return false;
      }
    });
    expect(moduleExists).toBe(true);
  });
});

test.describe("Version Display Accuracy", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should display AngularJS version in correct format", async ({
    page,
  }) => {
    const angularjsVersion = page.getByTestId("angularjs-version");
    const text = await angularjsVersion.textContent();
    expect(text).toMatch(/AngularJS Version: \d+\.\d+\.\d+/);
  });

  test("should display jQuery version in correct format", async ({ page }) => {
    const jqueryVersion = page.getByTestId("jquery-version");
    const text = await jqueryVersion.textContent();
    expect(text).toMatch(/jQuery Version: \d+\.\d+\.\d+/);
  });

  test("should display actual AngularJS version from library", async ({
    page,
  }) => {
    const displayedVersion = await page
      .getByTestId("angularjs-version")
      .textContent();
    const actualVersion = await page.evaluate(() => angular.version.full);
    expect(displayedVersion).toContain(actualVersion);
  });

  test("should display actual jQuery version from library", async ({
    page,
  }) => {
    const displayedVersion = await page
      .getByTestId("jquery-version")
      .textContent();
    const actualVersion = await page.evaluate(() => $.fn.jquery);
    expect(displayedVersion).toContain(actualVersion);
  });
});

test.describe("DOM Structure", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should have proper HTML structure", async ({ page }) => {
    const html = page.locator("html");
    await expect(html).toBeVisible();

    const head = page.locator("head");
    await expect(head).toBeAttached();

    const body = page.locator("body");
    await expect(body).toBeVisible();
  });

  test("should have meta viewport tag", async ({ page }) => {
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toBeAttached();
  });

  test("should have charset meta tag", async ({ page }) => {
    const charset = page.locator('meta[charset="utf-8"]');
    await expect(charset).toBeAttached();
  });

  test("should have test-directive custom element", async ({ page }) => {
    const testDirective = page.locator("test-directive");
    await expect(testDirective).toBeAttached();
  });

  test("should have test-component custom element", async ({ page }) => {
    const testComponent = page.locator("test-component");
    await expect(testComponent).toBeAttached();
  });
});

test.describe("Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should have a main heading", async ({ page }) => {
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    const count = await h1.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("should have meaningful title text", async ({ page }) => {
    const title = page.getByTestId("title");
    const text = await title.textContent();
    expect(text.length).toBeGreaterThan(0);
  });

  test("should have lang attribute on html element", async ({ page }) => {
    const html = page.locator("html");
    const lang = await html.getAttribute("lang");
    expect(lang === null || lang === "en" || lang === "").toBe(true);
  });
});

test.describe("Error Handling", () => {
  test("should not have JavaScript errors on page load", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => {
      errors.push(error.message);
    });

    await page.goto("");
    await page.waitForLoadState("networkidle");

    expect(errors).toHaveLength(0);
  });

  test("should not have console errors on page load", async ({ page }) => {
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
});

test.describe("Component Interaction", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should allow clicking on title", async ({ page }) => {
    const title = page.getByTestId("title");
    await title.click();
    await expect(title).toBeVisible();
  });

  test("should allow clicking on AngularJS version element", async ({
    page,
  }) => {
    const angularjsVersion = page.getByTestId("angularjs-version");
    await angularjsVersion.click();
    await expect(angularjsVersion).toBeVisible();
  });

  test("should allow clicking on jQuery version element", async ({ page }) => {
    const jqueryVersion = page.getByTestId("jquery-version");
    await jqueryVersion.click();
    await expect(jqueryVersion).toBeVisible();
  });

  test("should maintain state after user interaction", async ({ page }) => {
    const angularjsVersion = page.getByTestId("angularjs-version");
    const initialText = await angularjsVersion.textContent();

    await angularjsVersion.click();

    const afterClickText = await angularjsVersion.textContent();
    expect(afterClickText).toBe(initialText);
  });
});

test.describe("Page Refresh Behavior", () => {
  test("should maintain content after page refresh", async ({ page }) => {
    await page.goto("");

    const initialTitle = await page.getByTestId("title").textContent();
    const initialAngularVersion = await page
      .getByTestId("angularjs-version")
      .textContent();
    const initialJqueryVersion = await page
      .getByTestId("jquery-version")
      .textContent();

    await page.reload();

    await expect(page.getByTestId("title")).toHaveText(initialTitle);
    await expect(page.getByTestId("angularjs-version")).toHaveText(
      initialAngularVersion
    );
    await expect(page.getByTestId("jquery-version")).toHaveText(
      initialJqueryVersion
    );
  });

  test("should reinitialize AngularJS after refresh", async ({ page }) => {
    await page.goto("");
    await page.reload();

    const moduleExists = await page.evaluate(() => {
      try {
        return angular.module("app") !== undefined;
      } catch (e) {
        return false;
      }
    });
    expect(moduleExists).toBe(true);
  });
});

test.describe("External Resources", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should load Google Fonts", async ({ page }) => {
    const fontLink = page.locator('link[href*="fonts.googleapis.com"]');
    await expect(fontLink).toBeAttached();
  });

  test("should have preconnect for Google Fonts", async ({ page }) => {
    const preconnect = page.locator(
      'link[rel="preconnect"][href*="fonts.googleapis.com"]'
    );
    await expect(preconnect).toBeAttached();
  });

  test("should have preconnect for gstatic", async ({ page }) => {
    const preconnect = page.locator(
      'link[rel="preconnect"][href*="fonts.gstatic.com"]'
    );
    await expect(preconnect).toBeAttached();
  });
});
