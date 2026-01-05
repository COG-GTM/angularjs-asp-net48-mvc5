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

test.describe("Page Load and Navigation", () => {
  test("should load the page successfully", async ({ page }) => {
    const response = await page.goto("");
    expect(response.status()).toBe(200);
  });

  test("should have correct page title", async ({ page }) => {
    await page.goto("");
    await expect(page).toHaveTitle("XLTS for AngularJS with .NET Framework");
  });

  test("should load AngularJS application", async ({ page }) => {
    await page.goto("");
    const ngApp = page.locator("[ng-app]");
    await expect(ngApp).toHaveAttribute("ng-app", "app");
  });

  test("should have body element with ng-app attribute", async ({ page }) => {
    await page.goto("");
    const body = page.locator("body");
    await expect(body).toHaveAttribute("ng-app", "app");
  });

  test("should load without JavaScript errors", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });

  test("should load all required scripts", async ({ page }) => {
    await page.goto("");
    const scripts = await page.locator("script").count();
    expect(scripts).toBeGreaterThan(0);
  });

  test("should load all required stylesheets", async ({ page }) => {
    await page.goto("");
    const styles = await page.locator('link[rel="stylesheet"]').count();
    expect(styles).toBeGreaterThan(0);
  });
});

test.describe("Component Visibility and Structure", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should display the main title", async ({ page }) => {
    const title = page.locator("h1");
    await expect(title).toBeVisible();
  });

  test("should display test-component element", async ({ page }) => {
    const component = page.locator("test-component");
    await expect(component).toBeVisible();
  });

  test("should display test-directive element", async ({ page }) => {
    const directive = page.locator("test-directive");
    await expect(directive).toBeVisible();
  });

  test("should have correct heading level for title", async ({ page }) => {
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
  });

  test("should display AngularJS version in component", async ({ page }) => {
    const versionText = page.getByTestId("angularjs-version");
    await expect(versionText).toContainText("AngularJS Version:");
  });

  test("should display jQuery version in directive", async ({ page }) => {
    const versionText = page.getByTestId("jquery-version");
    await expect(versionText).toContainText("jQuery Version:");
  });

  test("should have test-component class on component element", async ({
    page,
  }) => {
    const component = page.locator(".test-component");
    await expect(component).toBeVisible();
  });

  test("should have test-directive class on directive element", async ({
    page,
  }) => {
    const directive = page.locator(".test-directive");
    await expect(directive).toBeVisible();
  });
});

test.describe("Data Binding and Dynamic Content", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should display valid AngularJS version format", async ({ page }) => {
    const versionText = page.getByTestId("angularjs-version");
    const text = await versionText.textContent();
    expect(text).toMatch(/AngularJS Version: \d+\.\d+\.\d+/);
  });

  test("should display valid jQuery version format", async ({ page }) => {
    const versionText = page.getByTestId("jquery-version");
    const text = await versionText.textContent();
    expect(text).toMatch(/jQuery Version: \d+\.\d+\.\d+/);
  });

  test("should have AngularJS version 1.8.x", async ({ page }) => {
    const versionText = page.getByTestId("angularjs-version");
    const text = await versionText.textContent();
    expect(text).toContain("1.8.");
  });

  test("should have jQuery version 3.x", async ({ page }) => {
    const versionText = page.getByTestId("jquery-version");
    const text = await versionText.textContent();
    expect(text).toContain("3.");
  });
});

test.describe("Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should have a main heading", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).not.toBeEmpty();
  });

  test("should have proper document structure", async ({ page }) => {
    const html = page.locator("html");
    await expect(html).toBeVisible();
  });

  test("should have charset meta tag", async ({ page }) => {
    const charset = page.locator('meta[charset="utf-8"]');
    await expect(charset).toHaveCount(1);
  });

  test("should have viewport meta tag", async ({ page }) => {
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveCount(1);
  });

  test("should have data-testid attributes for testing", async ({ page }) => {
    const titleTestId = page.getByTestId("title");
    const angularVersionTestId = page.getByTestId("angularjs-version");
    const jqueryVersionTestId = page.getByTestId("jquery-version");

    await expect(titleTestId).toBeVisible();
    await expect(angularVersionTestId).toBeVisible();
    await expect(jqueryVersionTestId).toBeVisible();
  });

  test("should have readable text content", async ({ page }) => {
    const body = page.locator("body");
    const text = await body.textContent();
    expect(text.length).toBeGreaterThan(0);
  });
});

test.describe("Responsive Design", () => {
  test("should render correctly on desktop viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("");

    const title = page.locator("h1");
    await expect(title).toBeVisible();

    const component = page.locator("test-component");
    await expect(component).toBeVisible();

    const directive = page.locator("test-directive");
    await expect(directive).toBeVisible();
  });

  test("should render correctly on tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("");

    const title = page.locator("h1");
    await expect(title).toBeVisible();

    const component = page.locator("test-component");
    await expect(component).toBeVisible();

    const directive = page.locator("test-directive");
    await expect(directive).toBeVisible();
  });

  test("should render correctly on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("");

    const title = page.locator("h1");
    await expect(title).toBeVisible();

    const component = page.locator("test-component");
    await expect(component).toBeVisible();

    const directive = page.locator("test-directive");
    await expect(directive).toBeVisible();
  });

  test("should maintain content visibility on small screens", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto("");

    const angularVersion = page.getByTestId("angularjs-version");
    const jqueryVersion = page.getByTestId("jquery-version");

    await expect(angularVersion).toBeVisible();
    await expect(jqueryVersion).toBeVisible();
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

  test("should have AngularJS bootstrapped quickly", async ({ page }) => {
    await page.goto("");
    const startTime = Date.now();

    await page.waitForFunction(() => {
      return (
        window.angular &&
        window.angular.element &&
        window.angular.element(document.body).injector()
      );
    });

    const bootstrapTime = Date.now() - startTime;
    expect(bootstrapTime).toBeLessThan(5000);
  });
});
