export class TestComponentPage {
  page;
  reactVersion;

  constructor(page) {
    this.page = page;
    this.reactVersion = page.getByTestId('react-version');
  }
}
