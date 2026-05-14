import { type Page, type Locator } from '@playwright/test';

export class IndexPage {
  readonly page: Page;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
  }
}
