export class ItemsPage {
  constructor(page) {
    this.page = page;
    this.addButton = page.getByTestId('add-item-btn');
    this.itemRows = page.getByTestId('item-row');
    this.itemCount = page.getByTestId('item-count');
    this.nameInput = page.getByTestId('item-name-input');
    this.descriptionInput = page.getByTestId('item-description-input');
    this.saveButton = page.getByTestId('save-item-btn');
    this.editButtons = page.getByTestId('edit-item-btn');
    this.deleteButtons = page.getByTestId('delete-item-btn');
  }
}
