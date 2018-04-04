import { Injectable } from '@angular/core';
import { Category } from '../entities/category';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoryService {

  private _baseUrl = "http://localhost:8080/api/categories"
  constructor(private http: HttpClient) { }

  fetchCategories() {
    return this.http.get<Category[]>(this._baseUrl);
  }
}
