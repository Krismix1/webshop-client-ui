import { Component, OnInit } from '@angular/core'
import { NgRedux } from '@angular-redux/store'
import { Router } from '@angular/router'
import { IAppState } from './../store/store'
import { CartActions } from './../cart/cart.actions'
import { AuthService } from './../services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private quantity = 0

  constructor(private router: Router, private ngRedux: NgRedux<IAppState>,
    private cartActions: CartActions, private authService: AuthService) { }

  ngOnInit() {
    this.ngRedux.select(state => state.cart)
      .subscribe(cart => {
        if (cart.initialized) {
          this.cartActions.saveItems(cart.items)
        }
        this.quantity = cart.items.map(item => item.quantity).reduce((a, b) => a + b, 0)
      })
    this.cartActions.getItems()
  }

  logout () {
    this.router.navigate(['login'])
    this.authService.logout()
  }
}
