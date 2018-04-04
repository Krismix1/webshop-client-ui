import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../store/store';
import { Product } from './../entities/product';

@Injectable()
export class ProductActions {
  constructor(private ngRedux: NgRedux<IAppState>) { }

  static ADD_PRODUCT: string = "ADD_PRODUCT";

  addProduct(product: Product) {
    this.ngRedux.dispatch({
      type: ProductActions.ADD_PRODUCT,
      payload: product
    });
  }
}
