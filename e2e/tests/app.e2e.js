import { expect, test } from '@playwright/test';
import { IndexPage } from '../pages/index-page';
import { TestComponentPage } from '../pages/test-component-page';

test.describe('react-asp-net48-mvc5 app', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('Index', async ({ page }) => {
    const indexPage = new IndexPage(page);

    await expect(indexPage.title).toHaveText('React with .NET Framework');
  });

  test('TestComponent', async ({ page }) => {
    const testComponentPage = new TestComponentPage(page);

    await expect(testComponentPage.reactVersion).toHaveText('React Version: 18.3.1');
  });
});
