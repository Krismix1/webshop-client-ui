import { Injectable } from '@angular/core';
import { Product } from '../entities/product';

@Injectable()
export class ProductService {

  private products: Product[] = [
    {
      name: "Prod 1",
      price: 150,
      image: "N/A",
      thumbnail: "http://via.placeholder.com/300"
    },
    {
      name: "Prod 2",
      price: 99,
      image: "N/A",
      thumbnail: "https://lexiconcss.wedeploy.io/images/thumbnail_placeholder.gif"
    }
  ];

  constructor() { }

  fetchProducts(): Product[] {
    return this.products;
  }
}
