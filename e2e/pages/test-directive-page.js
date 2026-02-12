export class TestDirectivePage {
  page;
  jqueryVersion;
  directiveContainer;

  constructor(page) {
    this.page = page;
    this.jqueryVersion = page.getByTestId("jquery-version");
    this.directiveContainer = page.locator(".test-directive");
  }
}
