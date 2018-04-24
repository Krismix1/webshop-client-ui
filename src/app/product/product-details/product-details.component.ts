import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../../entities/product';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  readonly productSample: Product = {
    id: null,
    name: '',
    type: null,
    price: 0,
    shortDescription: '',
    imageUri: ''
  }
  product: Product = this.productSample;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    // This way, each time the params in the URL change,
    // getBaby() will be executed
    // this is necessary because ngOnInit() is called only when the previous URL is not the same as the URL of component
    // solution from https://stackoverflow.com/a/38836773
    this.activatedRoute.params.subscribe(param => {
      this.getProduct();
    });
  }

  getProduct(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.productService.getOne(id)
      .subscribe(product => this.product = product);
  }

}
