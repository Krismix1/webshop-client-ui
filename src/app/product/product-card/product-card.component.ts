import { Component, OnInit, Input } from '@angular/core';
import { Product } from './../../entities/product';
import { CartActions } from './../../cart/cart.actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  constructor(private cartActions: CartActions) { }

  ngOnInit() {
  }

  onCartIconClicked() {
    this.cartActions.addProduct(this.product);
  }
}
