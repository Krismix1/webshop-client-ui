import { Injectable } from '@angular/core'
import { Product } from '../entities/product'
import { HttpClient } from '@angular/common/http'
import { environment } from './../../environments/environment'


@Injectable()
export class ProductService {

  private readonly BASE_URL = `${environment.managementService}/api/products`
  constructor (private httpClient: HttpClient) { }

  fetchProducts () {
    return this.httpClient.get<Product[]>(this.BASE_URL)
  }

  getOne (id: number) {
    return this.httpClient.get<Product>(`${this.BASE_URL}/${id}`)
  }
}
