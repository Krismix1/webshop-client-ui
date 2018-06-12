import { Injectable } from '@angular/core';
import { CartActions } from './../cart/cart.actions';
import { CartItem } from './../entities/cart-item';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { AuthService } from './auth.service';

import 'rxjs/add/observable/from';
import { Observable } from 'rxjs/Rx';
import { environment } from './../../environments/environment';

@Injectable()
export class StorageService {

  private _baseUrl: string = `${environment.clientService}/api`
  static readonly USER_KEY = 'userKey';
  constructor(private cartActions: CartActions, private http: HttpClient, private authService: AuthService) { }

  getCartItems() {
    if (this.authService.isLoggedIn()) {
      // FIXME: retrieve data based on username
      return Observable.from([]);
    } else {
      // retrieve data based on token
      let storedItemsKey = localStorage.getItem(StorageService.USER_KEY);
      if (storedItemsKey === null) { // no key saved
        // request a new key
        this.http.get<any>(this._baseUrl + "/users/anonymous/key").subscribe(data => {
          storedItemsKey = data.key;
          localStorage.setItem(StorageService.USER_KEY, storedItemsKey);
        });
        // because key was not present
        // then we cannot restore any previous items
        return Observable.from([]);
      } else {
        // retrieve items based on key
        return Observable.from(this.http.get<CartItem[]>(this._baseUrl + `/cart/${storedItemsKey}/items`));
      }
    }
  }

  saveItems(items: CartItem[]) {
    let storedItemsKey = localStorage.getItem(StorageService.USER_KEY);
    if (storedItemsKey !== null) {
      let mappedItems = items.map(item => {
        return { quantity: item.quantity, product: item.product.id }
      })
      return this.http.put(`${this._baseUrl}/cart/${storedItemsKey}`, { items: mappedItems, registeredAt: new Date().valueOf() });
    } else {
      console.error('No user key stored');
      return Observable.of();
    }
  }
}
