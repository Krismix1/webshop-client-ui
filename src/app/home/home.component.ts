import { Component, OnInit } from '@angular/core';
import { CartActions } from './../cart/cart.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private cartActions: CartActions) { }

  ngOnInit() {
    this.cartActions.getItems();
  }

}
