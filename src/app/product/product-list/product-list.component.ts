import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../../store/store';
import { Product } from './../../entities/product';
import { ProductActions } from './../product.actions';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(private ngRedux: NgRedux<IAppState>, private productActions: ProductActions,
    private productService: ProductService) { }

  ngOnInit() {
    this.ngRedux.select(state => state.product)
      .subscribe(categoryState => this.products = categoryState.visibleProducts);
    this.productService.fetchProducts()
      .subscribe(products => this.productActions.setProducts(products));
  }
}
