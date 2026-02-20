export class TestComponentPage {
  page;
  angularjsVersion;
  container;

  constructor(page) {
    this.page = page;
    this.angularjsVersion = page.getByTestId("angularjs-version");
    this.container = page.locator(".test-component");
  }
}
