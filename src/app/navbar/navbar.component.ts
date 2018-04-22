import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../store/store';
import { CartActions } from './../cart/cart.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private quantity: number = 0;

  constructor(private ngRedux: NgRedux<IAppState>, private cartActions: CartActions) { }

  ngOnInit() {
    this.ngRedux.select(state => state.cart)
      .subscribe(cart => {
        this.cartActions.saveItems(cart.items);
        this.quantity = cart.items.map(item => item.quantity).reduce((a, b) => a + b, 0)
      });

  }

}
