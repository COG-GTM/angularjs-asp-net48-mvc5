export class TestDirectivePage {
  page;
  jqueryVersion;
  directiveElement;

  constructor(page) {
    this.page = page;
    this.jqueryVersion = page.getByTestId('jquery-version');
    this.directiveElement = page.locator('test-directive');
  }

  async isVisible() {
    return await this.jqueryVersion.isVisible();
  }

  async getVersionText() {
    return await this.jqueryVersion.textContent();
  }

  async hasTestDirectiveClass() {
    return await this.jqueryVersion.evaluate((el) => el.classList.contains('test-directive'));
  }

  async getComputedStyles() {
    return await this.jqueryVersion.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        color: styles.color,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
      };
    });
  }

  async extractVersion() {
    const text = await this.getVersionText();
    const match = text.match(/jQuery Version: ([\d.]+)/);
    return match ? match[1] : null;
  }
}
