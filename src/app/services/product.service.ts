import { Injectable } from '@angular/core';
import { Product } from '../entities/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';


@Injectable()
export class ProductService {

  private _baseUrl: string = `${environment.managementService}/api/products`;
  constructor(private httpClient: HttpClient) { }

  fetchProducts() {
    return this.httpClient.get<Product[]>(this._baseUrl);
  }

  getOne(id: number) {
    return this.httpClient.get<Product>(`${this._baseUrl}/${id}`)
  }
}
