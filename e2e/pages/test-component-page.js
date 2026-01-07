export class TestComponentPage {
  page;
  angularjsVersion;
  componentElement;

  constructor(page) {
    this.page = page;
    this.angularjsVersion = page.getByTestId("angularjs-version");
    this.componentElement = page.locator("test-component");
  }

  async getVersionText() {
    return await this.angularjsVersion.textContent();
  }

  async isComponentVisible() {
    return await this.componentElement.isVisible();
  }

  async getComponentClass() {
    return await this.angularjsVersion.getAttribute("class");
  }
}
