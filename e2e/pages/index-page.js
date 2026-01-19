export class IndexPage {
  page;
  title;
  body;
  head;
  testComponent;
  testDirective;

  constructor(page) {
    this.page = page;
    this.title = page.getByTestId("title");
    this.body = page.locator("body");
    this.head = page.locator("head");
    this.testComponent = page.locator("test-component");
    this.testDirective = page.locator("test-directive");
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

  async hasNgApp() {
    return await this.body.getAttribute("ng-app");
  }
}
