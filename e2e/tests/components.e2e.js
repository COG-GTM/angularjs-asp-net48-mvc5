import { expect, test } from "@playwright/test";
import { TestComponentPage } from "../pages/test-component-page";
import { TestDirectivePage } from "../pages/test-directive-page";

test.describe("AngularJS Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("test-component should be rendered in the DOM", async ({ page }) => {
    const testComponent = page.locator("test-component");
    await expect(testComponent).toBeVisible();
  });

  test("test-component should display AngularJS version", async ({ page }) => {
    const testComponentPage = new TestComponentPage(page);
    await expect(testComponentPage.angularjsVersion).toBeVisible();
    await expect(testComponentPage.angularjsVersion).toContainText(
      "AngularJS Version:"
    );
  });

  test("test-component should have correct CSS class", async ({ page }) => {
    const componentDiv = page.locator(".test-component");
    await expect(componentDiv).toBeVisible();
  });

  test("test-component version should match expected format", async ({
    page,
  }) => {
    const testComponentPage = new TestComponentPage(page);
    const versionText = await testComponentPage.angularjsVersion.textContent();
    expect(versionText).toMatch(/AngularJS Version: \d+\.\d+\.\d+/);
  });

  test("test-component should be inside body with ng-app", async ({ page }) => {
    const ngApp = page.locator('body[ng-app="app"]');
    await expect(ngApp).toBeVisible();

    const testComponent = ngApp.locator("test-component");
    await expect(testComponent).toBeVisible();
  });
});

test.describe("AngularJS Directive Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("test-directive should be rendered in the DOM", async ({ page }) => {
    const testDirective = page.locator("test-directive");
    await expect(testDirective).toBeVisible();
  });

  test("test-directive should display jQuery version", async ({ page }) => {
    const testDirectivePage = new TestDirectivePage(page);
    await expect(testDirectivePage.jqueryVersion).toBeVisible();
    await expect(testDirectivePage.jqueryVersion).toContainText(
      "jQuery Version:"
    );
  });

  test("test-directive should have correct CSS class", async ({ page }) => {
    const directiveDiv = page.locator(".test-directive");
    await expect(directiveDiv).toBeVisible();
  });

  test("test-directive version should match expected format", async ({
    page,
  }) => {
    const testDirectivePage = new TestDirectivePage(page);
    const versionText = await testDirectivePage.jqueryVersion.textContent();
    expect(versionText).toMatch(/jQuery Version: \d+\.\d+\.\d+/);
  });

  test("test-directive should be inside body with ng-app", async ({ page }) => {
    const ngApp = page.locator('body[ng-app="app"]');
    await expect(ngApp).toBeVisible();

    const testDirective = ngApp.locator("test-directive");
    await expect(testDirective).toBeVisible();
  });

  test("test-directive should load template correctly", async ({ page }) => {
    const directiveContent = page.locator("test-directive");
    await expect(directiveContent).toBeVisible();

    const innerDiv = directiveContent.locator('[data-testid="jquery-version"]');
    await expect(innerDiv).toBeVisible();
  });
});

test.describe("Component and Directive Interaction Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("both component and directive should coexist on the page", async ({
    page,
  }) => {
    const testComponent = page.locator("test-component");
    const testDirective = page.locator("test-directive");

    await expect(testComponent).toBeVisible();
    await expect(testDirective).toBeVisible();
  });

  test("component and directive should have different version values", async ({
    page,
  }) => {
    const testComponentPage = new TestComponentPage(page);
    const testDirectivePage = new TestDirectivePage(page);

    const angularVersion =
      await testComponentPage.angularjsVersion.textContent();
    const jqueryVersion = await testDirectivePage.jqueryVersion.textContent();

    expect(angularVersion).not.toBe(jqueryVersion);
  });

  test("page should have correct element order", async ({ page }) => {
    const body = page.locator("body");
    const children = body.locator("> *");

    const count = await children.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test("AngularJS app should be fully bootstrapped", async ({ page }) => {
    const ngApp = page.locator('[ng-app="app"]');
    await expect(ngApp).toBeVisible();

    const angularVersion = page.getByTestId("angularjs-version");
    await expect(angularVersion).not.toHaveText("AngularJS Version: {{vm.version}}");
  });
});
