export class TestDirectivePage {
  page;
  jqueryVersion;
  directiveElement;
  directiveDiv;

  constructor(page) {
    this.page = page;
    this.jqueryVersion = page.getByTestId("jquery-version");
    this.directiveElement = page.locator("test-directive");
    this.directiveDiv = page.locator(".test-directive");
  }

  async getVersionText() {
    return await this.jqueryVersion.textContent();
  }

  async getVersionNumber() {
    const text = await this.getVersionText();
    const match = text.match(/\d+\.\d+\.\d+/);
    return match ? match[0] : null;
  }

  async isDirectiveVisible() {
    return await this.directiveElement.isVisible();
  }

  async hasRenderedWithoutExpressions() {
    const text = await this.getVersionText();
    return !text.includes("{{") && !text.includes("}}");
  }
}
