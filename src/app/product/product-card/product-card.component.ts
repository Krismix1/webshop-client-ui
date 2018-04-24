import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './../../entities/product';
import { CartActions } from './../../cart/cart.actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  constructor(private cartActions: CartActions, private router: Router) { }

  ngOnInit() {
  }

  onCartIconClicked() {
    this.cartActions.addProduct(this.product);
  }

  productClicked() {
    this.router.navigate([`product/${this.product.id}`])
  }
}
