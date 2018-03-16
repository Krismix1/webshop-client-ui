import { Injectable } from '@angular/core';
import { Product } from '../entities/product';

@Injectable()
export class ProductService {

  private products: Product[] = [
    {
      name: "Prod 1",
      price: 150,
      image: "N/A"
    },
    {
      name: "Prod 2",
      price: 99,
      image: "N/A"
    }
  ];

  constructor() { }

  fetchProducts():Product[]{
    return this.products;
  }
}
