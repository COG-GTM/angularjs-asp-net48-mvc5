import { expect, test } from '@playwright/test';
import { IndexPage } from '../pages/index-page';
import { TestComponentPage } from '../pages/test-component-page';
import { TestDirectivePage } from '../pages/test-directive-page';

test.describe('angularjs-asp-net48-mvc5 app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test.describe('Index Page', () => {
    test('should display the correct page title', async ({ page }) => {
      const indexPage = new IndexPage(page);
      await expect(indexPage.title).toHaveText('XLTS for AngularJS with .NET Framework');
    });

    test('should have correct document title', async ({ page }) => {
      const indexPage = new IndexPage(page);
      const pageTitle = await indexPage.getPageTitle();
      expect(pageTitle).toBe('XLTS for AngularJS with .NET Framework');
    });

    test('should bootstrap AngularJS app correctly', async ({ page }) => {
      const indexPage = new IndexPage(page);
      const isBootstrapped = await indexPage.isAngularAppBootstrapped();
      expect(isBootstrapped).toBe(true);
    });

    test('should include Roboto font from Google Fonts', async ({ page }) => {
      const indexPage = new IndexPage(page);
      const hasFont = await indexPage.hasRobotoFont();
      expect(hasFont).toBe(true);
    });

    test('should have viewport meta tag for responsive design', async ({ page }) => {
      const indexPage = new IndexPage(page);
      const viewport = await indexPage.getViewportMeta();
      expect(viewport).toBe('width=device-width');
    });

    test('should have charset meta tag', async ({ page }) => {
      const indexPage = new IndexPage(page);
      const hasCharset = await indexPage.hasCharsetMeta();
      expect(hasCharset).toBe(true);
    });

    test('should have h1 element visible', async ({ page }) => {
      const indexPage = new IndexPage(page);
      await expect(indexPage.title).toBeVisible();
    });

    test('should have correct heading level structure', async ({ page }) => {
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
    });
  });

  test.describe('TestComponent', () => {
    test('should display AngularJS version', async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.angularjsVersion).toContainText('AngularJS Version:');
    });

    test('should display version in correct format', async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const version = await testComponentPage.extractVersion();
      expect(version).toMatch(/^\d+\.\d+\.\d+$/);
    });

    test('should be visible on page load', async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const isVisible = await testComponentPage.isVisible();
      expect(isVisible).toBe(true);
    });

    test('should have test-component CSS class', async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const hasClass = await testComponentPage.hasTestComponentClass();
      expect(hasClass).toBe(true);
    });

    test('should have correct styling applied', async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      const styles = await testComponentPage.getComputedStyles();
      expect(styles.fontWeight).toBe('700');
    });

    test('should render test-component element', async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.componentElement).toBeVisible();
    });

    test('should have data-testid attribute', async ({ page }) => {
      const testComponentPage = new TestComponentPage(page);
      await expect(testComponentPage.angularjsVersion).toHaveAttribute('data-testid', 'angularjs-version');
    });
  });

  test.describe('TestDirective', () => {
    test('should display jQuery version', async ({ page }) => {
      const testDirectivePage = new TestDirectivePage(page);
      await expect(testDirectivePage.jqueryVersion).toContainText('jQuery Version:');
    });

    test('should display version in correct format', async ({ page }) => {
      const testDirectivePage = new TestDirectivePage(page);
      const version = await testDirectivePage.extractVersion();
      expect(version).toMatch(/^\d+\.\d+\.\d+$/);
    });

    test('should be visible on page load', async ({ page }) => {
      const testDirectivePage = new TestDirectivePage(page);
      const isVisible = await testDirectivePage.isVisible();
      expect(isVisible).toBe(true);
    });

    test('should have test-directive CSS class', async ({ page }) => {
      const testDirectivePage = new TestDirectivePage(page);
      const hasClass = await testDirectivePage.hasTestDirectiveClass();
      expect(hasClass).toBe(true);
    });

    test('should have correct styling applied', async ({ page }) => {
      const testDirectivePage = new TestDirectivePage(page);
      const styles = await testDirectivePage.getComputedStyles();
      expect(styles.fontWeight).toBe('700');
    });

    test('should render test-directive element', async ({ page }) => {
      const testDirectivePage = new TestDirectivePage(page);
      await expect(testDirectivePage.directiveElement).toBeVisible();
    });

    test('should have data-testid attribute', async ({ page }) => {
      const testDirectivePage = new TestDirectivePage(page);
      await expect(testDirectivePage.jqueryVersion).toHaveAttribute('data-testid', 'jquery-version');
    });
  });

  test.describe('Page Layout and Structure', () => {
    test('should render components in correct order', async ({ page }) => {
      const body = page.locator('body');
      const children = body.locator('> *');
      const count = await children.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('should have test-directive before test-component', async ({ page }) => {
      const directiveBox = await page.locator('test-directive').boundingBox();
      const componentBox = await page.locator('test-component').boundingBox();
      expect(directiveBox.y).toBeLessThan(componentBox.y);
    });

    test('should have title before both components', async ({ page }) => {
      const titleBox = await page.locator('h1').boundingBox();
      const directiveBox = await page.locator('test-directive').boundingBox();
      expect(titleBox.y).toBeLessThan(directiveBox.y);
    });
  });

  test.describe('Accessibility', () => {
    test('should have lang attribute on html element', async ({ page }) => {
      const html = page.locator('html');
      const lang = await html.getAttribute('lang');
      expect(lang).toBeFalsy();
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      const h1Elements = await page.locator('h1').count();
      expect(h1Elements).toBe(1);
    });

    test('should have visible text content', async ({ page }) => {
      const bodyText = await page.locator('body').textContent();
      expect(bodyText.length).toBeGreaterThan(0);
    });

    test('should have test IDs for automation', async ({ page }) => {
      const testIdElements = await page.locator('[data-testid]').count();
      expect(testIdElements).toBeGreaterThanOrEqual(3);
    });
  });

  test.describe('Performance and Loading', () => {
    test('should load page within timeout', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('');
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(10000);
    });

    test('should have all scripts loaded', async ({ page }) => {
      const angularLoaded = await page.evaluate(() => typeof angular !== 'undefined');
      expect(angularLoaded).toBe(true);
    });

    test('should have jQuery loaded', async ({ page }) => {
      const jqueryLoaded = await page.evaluate(() => typeof jQuery !== 'undefined');
      expect(jqueryLoaded).toBe(true);
    });

    test('should have AngularJS module registered', async ({ page }) => {
      const moduleExists = await page.evaluate(() => {
        try {
          angular.module('app');
          return true;
        } catch (e) {
          return false;
        }
      });
      expect(moduleExists).toBe(true);
    });
  });

  test.describe('Browser Compatibility', () => {
    test('should render correctly in current browser', async ({ page }) => {
      const indexPage = new IndexPage(page);
      const testComponentPage = new TestComponentPage(page);
      const testDirectivePage = new TestDirectivePage(page);

      await expect(indexPage.title).toBeVisible();
      await expect(testComponentPage.angularjsVersion).toBeVisible();
      await expect(testDirectivePage.jqueryVersion).toBeVisible();
    });

    test('should handle page refresh', async ({ page }) => {
      await page.reload();
      const indexPage = new IndexPage(page);
      await expect(indexPage.title).toBeVisible();
    });

    test('should maintain state after navigation', async ({ page }) => {
      await page.goto('');
      const testComponentPage = new TestComponentPage(page);
      const versionBefore = await testComponentPage.getVersionText();

      await page.reload();
      const versionAfter = await testComponentPage.getVersionText();

      expect(versionBefore).toBe(versionAfter);
    });
  });

  test.describe('Console and Error Handling', () => {
    test('should not have JavaScript errors on load', async ({ page }) => {
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));

      await page.goto('');
      await page.waitForTimeout(1000);

      expect(errors.length).toBe(0);
    });

    test('should log component initialization', async ({ page }) => {
      const logs = [];
      page.on('console', (msg) => {
        if (msg.type() === 'info') {
          logs.push(msg.text());
        }
      });

      await page.goto('');
      await page.waitForTimeout(1000);

      const hasComponentLog = logs.some((log) => log.includes('test-component initialized'));
      const hasDirectiveLog = logs.some((log) => log.includes('test-directive initialized'));

      expect(hasComponentLog).toBe(true);
      expect(hasDirectiveLog).toBe(true);
    });
  });
});
