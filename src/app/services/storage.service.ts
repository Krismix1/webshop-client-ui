import { Injectable } from '@angular/core';
import { CartActions } from './../cart/cart.actions';
import { CartItem } from './../entities/cart-item';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { AuthService } from './auth.service';


@Injectable()
export class StorageService {

  private _baseUrl: string = "http://localhost:8081/api"

  constructor(private cartActions: CartActions, private http: HttpClient, private authService: AuthService) { }

  loadCartItems() {
    let storedItems = sessionStorage.getItem('cartItems');
    if (storedItems === null) {
      if (this.authService.isLoggedIn()) {
        // retrieve data based on username
      } else {
        // retrieve data based on token
        let storedItemsKey = localStorage.getItem('key');
        if (storedItemsKey === null) { // no key saved
          // request a new key
          this.http.get<any>(this._baseUrl + "/users/anonymous/key").subscribe(data => {
            storedItemsKey = data.key;
            console.log(storedItemsKey);
            localStorage.setItem('key', storedItemsKey);
          });
        } else {
          // retrieve items based on key
          this.http.get<CartItem[]>(this._baseUrl + `/cart/${storedItemsKey}/items`)
            .subscribe(items => {
              items.forEach(item => {
                const product = item.product;
                for (let i = 0; i < item.quantity; i++) {
                  this.cartActions.addProduct(product);
                }
              });
            });
        }
      }
    } else {
      JSON.parse(storedItems || '[]').forEach(item => {
        this.cartActions.addProduct(item.product);
      });
    }
  }
}
