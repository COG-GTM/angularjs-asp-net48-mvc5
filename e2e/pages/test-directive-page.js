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

  async isDirectiveVisible() {
    return await this.directiveElement.isVisible();
  }

  async getDirectiveClass() {
    return await this.jqueryVersion.getAttribute("class");
  }
}
