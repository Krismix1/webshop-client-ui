import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../store/store';
import { Product } from './../entities/product';

@Injectable()
export class CartActions {
  static PUT_PRODUCT: string = "PUT_PRODUCT";

  constructor(private ngRedux: NgRedux<IAppState>) { }

  addProduct(product: Product) {
    this.ngRedux.dispatch({
      type: CartActions.PUT_PRODUCT,
      payload: product
    });
  }
}
