export class IndexPage {
  page;
  title;
  body;
  testComponent;
  testDirective;

  constructor(page) {
    this.page = page;
    this.title = page.getByTestId("title");
    this.body = page.locator("body");
    this.testComponent = page.locator("test-component");
    this.testDirective = page.locator("test-directive");
  }
}
