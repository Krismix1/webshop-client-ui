import { Injectable } from '@angular/core';
import { Product } from '../entities/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

  private _baseUrl: string = "http://localhost:8080/api/products"
  constructor(private httpClient: HttpClient) { }

  fetchProducts() {
    return this.httpClient.get<Product[]>(this._baseUrl);
  }

  getOne(id: number) {
    return this.httpClient.get<Product>(`${this._baseUrl}/${id}`)
  }
}
