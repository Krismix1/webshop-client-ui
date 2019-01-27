import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { Product } from './../../entities/product'
import { CartActions } from './../../cart/cart.actions'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Output() descriptionClicked = new EventEmitter()

  @Input() product: Product
  constructor(private cartActions: CartActions, private router: Router) { }

  ngOnInit() {
  }

  onCartIconClicked() {
    this.cartActions.addProduct(this.product)
  }

  productClicked() {
    this.router.navigate(['product', this.product.id])
  }

  onDescriptionClicked() {
    console.log(`Dispatching action with payload ${this.product.shortDescription}`)
    this.descriptionClicked.emit(this.product.shortDescription)
  }

  receiveEvent(data) {
    console.log(`Loooooooooool`)
  }
}
