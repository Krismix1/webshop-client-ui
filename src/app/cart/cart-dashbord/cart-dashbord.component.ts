import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../../store/store';
import { CartItem } from './../../entities/cart-item';

@Component({
  selector: 'app-cart-dashbord',
  templateUrl: './cart-dashbord.component.html',
  styleUrls: ['./cart-dashbord.component.scss']
})
export class CartDashbordComponent implements OnInit {

  private items: CartItem[] = [];
  private totalPrice: number = 0;
  private totalQuantity: number = 0;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.ngRedux.select(state => state.cart)
      .subscribe(cart => {
        this.items = cart.items;
        this.totalPrice = this.items.map(item => item.product.price * item.quantity)
          .reduce((a, b) => a + b, 0);
        this.totalQuantity = this.items.map(item => item.quantity)
          .reduce((a, b) => a + b, 0);
      });
  }

}
