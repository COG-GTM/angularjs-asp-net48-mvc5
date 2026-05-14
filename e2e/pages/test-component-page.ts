import { type Page, type Locator } from '@playwright/test';

export class TestComponentPage {
  readonly page: Page;
  readonly angularVersion: Locator;

  constructor(page: Page) {
    this.page = page;
    this.angularVersion = page.getByTestId('angular-version');
  }
}
