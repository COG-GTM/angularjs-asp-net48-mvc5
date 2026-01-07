export class IndexPage {
  page;
  title;
  body;
  head;

  constructor(page) {
    this.page = page;
    this.title = page.getByTestId("title");
    this.body = page.locator("body");
    this.head = page.locator("head");
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getMetaViewport() {
    return await this.page
      .locator('meta[name="viewport"]')
      .getAttribute("content");
  }

  async getMetaCharset() {
    return await this.page.locator("meta[charset]").getAttribute("charset");
  }

  async hasAngularApp() {
    return await this.body.getAttribute("ng-app");
  }
}
