export class TestComponentPage {
  page;
  angularjsVersion;
  componentElement;

  constructor(page) {
    this.page = page;
    this.angularjsVersion = page.getByTestId('angularjs-version');
    this.componentElement = page.locator('test-component');
  }

  async isVisible() {
    return await this.angularjsVersion.isVisible();
  }

  async getVersionText() {
    return await this.angularjsVersion.textContent();
  }

  async hasTestComponentClass() {
    return await this.angularjsVersion.evaluate((el) => el.classList.contains('test-component'));
  }

  async getComputedStyles() {
    return await this.angularjsVersion.evaluate((el) => {
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
    const match = text.match(/AngularJS Version: ([\d.]+)/);
    return match ? match[1] : null;
  }
}
