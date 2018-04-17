import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from './../../entities/cart-item';
import { CartActions } from './../cart.actions';

@Component({
  selector: 'app-cart-dashbord-item',
  templateUrl: './cart-dashbord-item.component.html',
  styleUrls: ['./cart-dashbord-item.component.scss']
})
export class CartDashbordItemComponent implements OnInit {

  @Input()
  private item: CartItem;

  constructor(private cartActions: CartActions) { }

  ngOnInit() {
  }

  addItem() {
    this.cartActions.addProduct(this.item.product);
  }

  removeItem() {
    this.cartActions.subtractProduct(this.item.product);
  }
}
