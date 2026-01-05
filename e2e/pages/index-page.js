export class IndexPage {
  page;
  title;
  body;
  heading;

  constructor(page) {
    this.page = page;
    this.title = page.getByTestId("title");
    this.body = page.locator("body");
    this.heading = page.locator("h1");
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getNgAppValue() {
    return await this.body.getAttribute("ng-app");
  }

  async isAngularBootstrapped() {
    const ngApp = await this.getNgAppValue();
    return ngApp === "app";
  }
}
