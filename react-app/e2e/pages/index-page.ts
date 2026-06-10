import type { Page, Locator } from '@playwright/test';

export class IndexPage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    // The welcome heading rendered by WelcomePage ("Hello, angular-app").
    this.heading = page.getByRole('heading', { level: 1 });
  }
}
