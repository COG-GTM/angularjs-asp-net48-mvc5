import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateItemRequest {
  name: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class ItemService {
  private apiUrl = '/api/items';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  create(request: CreateItemRequest): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, request);
  }

  update(id: number, request: CreateItemRequest): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
