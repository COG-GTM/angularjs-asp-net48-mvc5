import type { Page, Locator } from '@playwright/test';

export class TestDirectivePage {
  readonly page: Page;
  readonly angularVersion: Locator;

  constructor(page: Page) {
    this.page = page;
    this.angularVersion = page.getByTestId('angular-version-directive');
  }
}
