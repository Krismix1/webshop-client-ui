import { Injectable } from '@angular/core'
import { NgRedux } from '@angular-redux/store'
import { IAppState } from './../store/store'
import { Product } from './../entities/product'
import { CartItem } from './../entities/cart-item'

@Injectable()
export class CartActions {
  static PUT_PRODUCT = 'PUT_PRODUCT'
  static SUBTRACT_PRODUCT = 'SUBTRACT_PRODUCT'
  static GET_ITEMS = 'GET_ITEMS'
  static RECEIVED_ITEMS = 'RECEIVED_ITEMS'
  static FAILED_RECEIVING_ITEMS = 'FAILED_RECEIVING_ITEMS'
  static SAVE_CART_ITEMS = 'SAVE_CART_ITEMS'
  static SUCCESS_SAVE_CART_ITEMS = 'SUCCESS_SAVE_CART_ITEMS'
  static FAILED_SAVE_CART_ITEMS = 'FAILED_SAVE_CART_ITEMS'

  constructor (private ngRedux: NgRedux<IAppState>) { }

  addProduct (product: Product) {
    this.ngRedux.dispatch({
      type: CartActions.PUT_PRODUCT,
      payload: product
    })
  }

  subtractProduct (product: Product) {
    this.ngRedux.dispatch({
      type: CartActions.SUBTRACT_PRODUCT,
      payload: product.id
    })
  }

  getItems () {
    this.ngRedux.dispatch({
      type: CartActions.GET_ITEMS
    })
  }

  saveItems (items: CartItem[]) {
    this.ngRedux.dispatch({
      type: CartActions.SAVE_CART_ITEMS,
      payload: items
    })
  }
}
