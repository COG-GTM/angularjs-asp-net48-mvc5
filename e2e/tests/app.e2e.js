import { expect, test } from '@playwright/test';
import { IndexPage } from '../pages/index-page';
import { ReactVersionPage } from '../pages/react-version-page';

test.describe('react-asp-net48-mvc5 app', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('Index', async ({ page }) => {
    const indexPage = new IndexPage(page);

    await expect(indexPage.title).toHaveText('React with .NET Framework');
  });

  test('ReactVersion', async ({ page }) => {
    const reactVersionPage = new ReactVersionPage(page);

    await expect(reactVersionPage.reactVersion).toContainText('18.');
  });

  test('ViteVersion', async ({ page }) => {
    const reactVersionPage = new ReactVersionPage(page);

    await expect(reactVersionPage.viteVersion).toContainText('Vite');
  });
});
