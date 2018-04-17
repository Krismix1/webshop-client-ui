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

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.ngRedux.select(state => state.cart)
      .subscribe(cart => this.items = cart.items);
  }

}
