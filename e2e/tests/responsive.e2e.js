import { expect, test } from "@playwright/test";
import { IndexPage } from "../pages/index-page";
import { TestComponentPage } from "../pages/test-component-page";
import { TestDirectivePage } from "../pages/test-directive-page";

test.describe("Responsive Design Tests", () => {
  test("should render correctly on desktop viewport (1920x1080)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");

    const indexPage = new IndexPage(page);
    await expect(indexPage.title).toBeVisible();

    const testComponentPage = new TestComponentPage(page);
    await expect(testComponentPage.angularjsVersion).toBeVisible();

    const testDirectivePage = new TestDirectivePage(page);
    await expect(testDirectivePage.jqueryVersion).toBeVisible();
  });

  test("should render correctly on laptop viewport (1366x768)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto("/");

    const indexPage = new IndexPage(page);
    await expect(indexPage.title).toBeVisible();

    const testComponentPage = new TestComponentPage(page);
    await expect(testComponentPage.angularjsVersion).toBeVisible();

    const testDirectivePage = new TestDirectivePage(page);
    await expect(testDirectivePage.jqueryVersion).toBeVisible();
  });

  test("should render correctly on tablet viewport (768x1024)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    const indexPage = new IndexPage(page);
    await expect(indexPage.title).toBeVisible();

    const testComponentPage = new TestComponentPage(page);
    await expect(testComponentPage.angularjsVersion).toBeVisible();

    const testDirectivePage = new TestDirectivePage(page);
    await expect(testDirectivePage.jqueryVersion).toBeVisible();
  });

  test("should render correctly on mobile viewport (375x667)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const indexPage = new IndexPage(page);
    await expect(indexPage.title).toBeVisible();

    const testComponentPage = new TestComponentPage(page);
    await expect(testComponentPage.angularjsVersion).toBeVisible();

    const testDirectivePage = new TestDirectivePage(page);
    await expect(testDirectivePage.jqueryVersion).toBeVisible();
  });

  test("should render correctly on small mobile viewport (320x568)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto("/");

    const indexPage = new IndexPage(page);
    await expect(indexPage.title).toBeVisible();

    const testComponentPage = new TestComponentPage(page);
    await expect(testComponentPage.angularjsVersion).toBeVisible();

    const testDirectivePage = new TestDirectivePage(page);
    await expect(testDirectivePage.jqueryVersion).toBeVisible();
  });

  test("should handle viewport resize dynamically", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");

    const indexPage = new IndexPage(page);
    await expect(indexPage.title).toBeVisible();

    await page.setViewportSize({ width: 375, height: 667 });
    await expect(indexPage.title).toBeVisible();

    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(indexPage.title).toBeVisible();
  });

  test("should maintain content visibility in landscape orientation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 667, height: 375 });
    await page.goto("/");

    const indexPage = new IndexPage(page);
    await expect(indexPage.title).toBeVisible();

    const testComponentPage = new TestComponentPage(page);
    await expect(testComponentPage.angularjsVersion).toBeVisible();

    const testDirectivePage = new TestDirectivePage(page);
    await expect(testDirectivePage.jqueryVersion).toBeVisible();
  });
});
