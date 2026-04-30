import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item, CreateItemRequest, ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="item-list-container" data-testid="item-list">
      <div class="header">
        <h2>Items</h2>
        <span class="item-count" data-testid="item-count">{{ items.length }} item{{ items.length !== 1 ? 's' : '' }}</span>
      </div>

      <button
        class="btn btn-primary add-btn"
        data-testid="add-item-btn"
        (click)="showForm = true; editingItem = null; formName = ''; formDescription = ''"
        *ngIf="!showForm">
        + Add Item
      </button>

      <div class="form-card" *ngIf="showForm">
        <h3>{{ editingItem ? 'Edit Item' : 'New Item' }}</h3>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            type="text"
            data-testid="item-name-input"
            [(ngModel)]="formName"
            placeholder="Item name"
            class="form-input" />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input
            id="description"
            type="text"
            data-testid="item-description-input"
            [(ngModel)]="formDescription"
            placeholder="Item description (optional)"
            class="form-input" />
        </div>
        <div class="form-actions">
          <button
            class="btn btn-primary"
            data-testid="save-item-btn"
            (click)="saveItem()"
            [disabled]="!formName.trim()">
            {{ editingItem ? 'Update' : 'Save' }}
          </button>
          <button class="btn btn-secondary" (click)="cancelForm()">Cancel</button>
        </div>
      </div>

      <div class="table-container" *ngIf="items.length > 0">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of items" data-testid="item-row">
              <td class="item-name">{{ item.name }}</td>
              <td class="item-desc">{{ item.description || '—' }}</td>
              <td class="item-date">{{ item.createdAt | date:'short' }}</td>
              <td class="item-actions">
                <button
                  class="btn btn-sm btn-edit"
                  data-testid="edit-item-btn"
                  (click)="editItem(item)">
                  Edit
                </button>
                <button
                  class="btn btn-sm btn-delete"
                  data-testid="delete-item-btn"
                  (click)="deleteItem(item.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="empty-state" *ngIf="items.length === 0 && !showForm">
        <p>No items yet. Click "Add Item" to create one.</p>
      </div>
    </div>
  `,
  styles: [`
    .item-list-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 1.5rem;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }
    .header h2 {
      margin: 0;
      font-size: 1.5rem;
      color: #1a1a2e;
    }
    .item-count {
      background: #e8eaf6;
      color: #3949ab;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .btn {
      border: none;
      border-radius: 0.5rem;
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
    }
    .btn:hover { transform: translateY(-1px); }
    .btn:active { transform: translateY(0); }
    .btn-primary {
      background: #3949ab;
      color: #fff;
    }
    .btn-primary:hover { background: #303f9f; }
    .btn-primary:disabled {
      background: #c5cae9;
      cursor: not-allowed;
      transform: none;
    }
    .btn-secondary {
      background: #e0e0e0;
      color: #424242;
    }
    .btn-secondary:hover { background: #bdbdbd; }
    .btn-sm {
      padding: 0.35rem 0.75rem;
      font-size: 0.8rem;
    }
    .btn-edit {
      background: #e3f2fd;
      color: #1565c0;
    }
    .btn-edit:hover { background: #bbdefb; }
    .btn-delete {
      background: #fce4ec;
      color: #c62828;
    }
    .btn-delete:hover { background: #ffcdd2; }
    .add-btn { margin-bottom: 1.5rem; }
    .form-card {
      background: #f5f5f5;
      border-radius: 0.75rem;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid #e0e0e0;
    }
    .form-card h3 {
      margin: 0 0 1rem;
      font-size: 1.1rem;
      color: #1a1a2e;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.35rem;
      font-size: 0.85rem;
      font-weight: 500;
      color: #616161;
    }
    .form-input {
      width: 100%;
      padding: 0.6rem 0.75rem;
      border: 1px solid #e0e0e0;
      border-radius: 0.5rem;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }
    .form-input:focus {
      border-color: #3949ab;
      box-shadow: 0 0 0 3px rgba(57, 73, 171, 0.1);
    }
    .form-actions {
      display: flex;
      gap: 0.75rem;
    }
    .table-container {
      overflow-x: auto;
      border-radius: 0.75rem;
      border: 1px solid #e0e0e0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th {
      background: #f5f5f5;
      padding: 0.75rem 1rem;
      text-align: left;
      font-size: 0.8rem;
      font-weight: 600;
      color: #616161;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 2px solid #e0e0e0;
    }
    td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #f0f0f0;
      font-size: 0.9rem;
      color: #424242;
    }
    tr:last-child td { border-bottom: none; }
    tr:hover { background: #fafafa; }
    .item-name { font-weight: 500; color: #1a1a2e; }
    .item-desc { color: #757575; }
    .item-date { color: #9e9e9e; font-size: 0.85rem; }
    .item-actions {
      display: flex;
      gap: 0.5rem;
    }
    .empty-state {
      text-align: center;
      padding: 3rem 1rem;
      color: #9e9e9e;
    }
    .empty-state p { font-size: 1rem; }
  `]
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  showForm = false;
  editingItem: Item | null = null;
  formName = '';
  formDescription = '';

  constructor(private itemService: ItemService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getAll().subscribe(items => {
      this.items = items;
      this.cdr.markForCheck();
    });
  }

  saveItem(): void {
    const request: CreateItemRequest = {
      name: this.formName.trim(),
      description: this.formDescription.trim() || undefined
    };

    if (this.editingItem) {
      this.itemService.update(this.editingItem.id, request).subscribe(() => {
        this.loadItems();
        this.cancelForm();
        this.cdr.markForCheck();
      });
    } else {
      this.itemService.create(request).subscribe(() => {
        this.loadItems();
        this.cancelForm();
        this.cdr.markForCheck();
      });
    }
  }

  editItem(item: Item): void {
    this.editingItem = item;
    this.formName = item.name;
    this.formDescription = item.description || '';
    this.showForm = true;
  }

  deleteItem(id: number): void {
    this.itemService.delete(id).subscribe(() => {
      this.loadItems();
      this.cdr.markForCheck();
    });
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingItem = null;
    this.formName = '';
    this.formDescription = '';
  }
}
