import { expect, test } from '@playwright/test';
import { ItemsPage } from '../pages/items-page';

test.describe('Items CRUD', () => {

  test('should display seeded items', async ({ page }) => {
    await page.goto('/items');
    const itemsPage = new ItemsPage(page);
    await expect(itemsPage.itemRows).toHaveCount(3);
    await expect(itemsPage.itemCount).toContainText('3 items');
  });

  test('should create a new item', async ({ page }) => {
    await page.goto('/items');
    const itemsPage = new ItemsPage(page);

    await itemsPage.addButton.click();
    await itemsPage.nameInput.fill('New Test Item');
    await itemsPage.descriptionInput.fill('Created by E2E test');
    await itemsPage.saveButton.click();

    await expect(page.getByText('New Test Item')).toBeVisible();
    await expect(itemsPage.itemCount).toContainText('4 items');
  });

  test('should edit an item', async ({ page }) => {
    await page.goto('/items');
    const itemsPage = new ItemsPage(page);

    await itemsPage.editButtons.first().click();
    await itemsPage.nameInput.clear();
    await itemsPage.nameInput.fill('Updated Item Name');
    await itemsPage.saveButton.click();

    await expect(page.getByText('Updated Item Name')).toBeVisible();
  });

  test('should delete an item', async ({ page }) => {
    await page.goto('/items');
    const itemsPage = new ItemsPage(page);

    const initialCount = await itemsPage.itemRows.count();
    await itemsPage.deleteButtons.first().click();
    await expect(itemsPage.itemRows).toHaveCount(initialCount - 1);
  });
});
