import { Product } from './product'

export class CartItem {
  set product (product: Product) {
    this.product = product
  }

  get product () {
    return this.product
  }

  set quantity (quantity: number) {
    this.quantity = quantity
  }

  get quantity (): number {
    return this.quantity
  }
}
