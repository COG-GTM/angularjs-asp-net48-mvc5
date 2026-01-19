export class TestDirectivePage {
  page;
  jqueryVersion;
  directiveElement;

  constructor(page) {
    this.page = page;
    this.jqueryVersion = page.getByTestId("jquery-version");
    this.directiveElement = page.locator("test-directive");
  }

  async getVersionText() {
    return await this.jqueryVersion.textContent();
  }

  async isVisible() {
    return await this.directiveElement.isVisible();
  }

  async hasTestDirectiveClass() {
    const innerDiv = this.page.locator(".test-directive");
    return await innerDiv.isVisible();
  }

  async getComputedStyle(property) {
    return await this.jqueryVersion.evaluate((el, prop) => {
      return window.getComputedStyle(el).getPropertyValue(prop);
    }, property);
  }
}
