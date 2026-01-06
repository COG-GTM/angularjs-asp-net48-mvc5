export class IndexPage {
  page;
  title;
  body;
  head;

  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.body = page.locator('body');
    this.head = page.locator('head');
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async isAngularAppBootstrapped() {
    return await this.body.getAttribute('ng-app') === 'app';
  }

  async hasRobotoFont() {
    const fontLink = this.head.locator('link[href*="fonts.googleapis.com"]');
    return await fontLink.count() > 0;
  }

  async getViewportMeta() {
    const viewport = this.head.locator('meta[name="viewport"]');
    return await viewport.getAttribute('content');
  }

  async hasCharsetMeta() {
    const charset = this.head.locator('meta[charset]');
    return await charset.count() > 0;
  }
}
