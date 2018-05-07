import { Injectable } from '@angular/core';
import { Category } from '../entities/category';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable()
export class CategoryService {

  private _baseUrl = `${environment.managementService}/api/categories`
  constructor(private http: HttpClient) { }

  fetchCategories() {
    return this.http.get<Category[]>(this._baseUrl);
  }
}
