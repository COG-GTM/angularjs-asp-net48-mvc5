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

  async isVisible() {
    return await this.componentElement.isVisible();
  }

  async hasTestComponentClass() {
    const innerDiv = this.page.locator(".test-component");
    return await innerDiv.isVisible();
  }

  async getComputedStyle(property) {
    return await this.angularjsVersion.evaluate((el, prop) => {
      return window.getComputedStyle(el).getPropertyValue(prop);
    }, property);
  }
}
