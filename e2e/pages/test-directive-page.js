export class TestDirectivePage {
  page;
  jqueryVersion;
  container;

  constructor(page) {
    this.page = page;
    this.jqueryVersion = page.getByTestId("jquery-version");
    this.container = page.locator(".test-directive");
  }
}
