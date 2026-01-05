export class TestComponentPage {
  page;
  angularjsVersion;
  componentElement;
  componentDiv;

  constructor(page) {
    this.page = page;
    this.angularjsVersion = page.getByTestId("angularjs-version");
    this.componentElement = page.locator("test-component");
    this.componentDiv = page.locator(".test-component");
  }

  async getVersionText() {
    return await this.angularjsVersion.textContent();
  }

  async getVersionNumber() {
    const text = await this.getVersionText();
    const match = text.match(/\d+\.\d+\.\d+/);
    return match ? match[0] : null;
  }

  async isComponentVisible() {
    return await this.componentElement.isVisible();
  }

  async hasRenderedWithoutExpressions() {
    const text = await this.getVersionText();
    return !text.includes("{{") && !text.includes("}}");
  }
}
