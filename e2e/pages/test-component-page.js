export class TestComponentPage {
  page;
  angularjsVersion;
  componentContainer;

  constructor(page) {
    this.page = page;
    this.angularjsVersion = page.getByTestId("angularjs-version");
    this.componentContainer = page.locator(".test-component");
  }
}
