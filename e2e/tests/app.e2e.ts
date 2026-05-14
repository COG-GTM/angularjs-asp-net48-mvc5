import { expect, test } from '@playwright/test';
import { IndexPage } from '../pages/index-page';
import { TestComponentPage } from '../pages/test-component-page';
import { TestDirectivePage } from '../pages/test-directive-page';

test.describe('angular-asp-net48-mvc5 app', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('Index', async ({ page }) => {
    const indexPage = new IndexPage(page);

    await expect(indexPage.title).toHaveText('Angular + ASP.NET MVC 5');
  });

  test('TestComponent', async ({ page }) => {
    const testComponentPage = new TestComponentPage(page);

    await expect(testComponentPage.angularVersion).toContainText('Angular Version:');
  });

  test('TestDirective', async ({ page }) => {
    const testDirective = new TestDirectivePage(page);

    await expect(testDirective.angularVersion).toContainText('Angular Version:');
  });
});
