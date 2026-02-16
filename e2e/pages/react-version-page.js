export class ReactVersionPage {
  page;
  reactVersion;
  viteVersion;

  constructor(page) {
    this.page = page;
    this.reactVersion = page.getByTestId('react-version');
    this.viteVersion = page.getByTestId('vite-version');
  }
}
