import { Injectable } from '@angular/core'
import { CartActions } from './../cart/cart.actions'
import { CartItem } from './../entities/cart-item'
import { HttpClient } from '@angular/common/http'
import { AuthService } from './auth.service'
import { environment } from './../../environments/environment'
import { of } from 'rxjs'

@Injectable()
export class StorageService {

  static readonly USER_KEY = 'USER_KEY'
  private _baseUrl = `${environment.clientService}/api`
  constructor(private cartActions: CartActions, private http: HttpClient, private authService: AuthService) { }

  getCartItems() {
    if (this.authService.isLoggedIn()) {
      // FIXME: retrieve data based on username
      return of([])
    } else {
      // retrieve data based on token
      let storedItemsKey = localStorage.getItem(StorageService.USER_KEY)
      if (storedItemsKey === null) { // no key saved
        // request a new key
        this.http.get<any>(this._baseUrl + '/users/anonymous/key').subscribe(data => {
          storedItemsKey = data.key
          localStorage.setItem(StorageService.USER_KEY, storedItemsKey)
        })
        // because key was not present
        // then we cannot restore any previous items
        return of([])
      } else {
        // retrieve items based on key
        return this.http.get<CartItem[]>(this._baseUrl + `/cart/${storedItemsKey}/items`)
      }
    }
  }

  saveItems(items: CartItem[]) {
    const storedItemsKey = localStorage.getItem(StorageService.USER_KEY)
    if (storedItemsKey !== null) {
      const mappedItems = items.map(item => {
        return { quantity: item.quantity, product: item.product.id }
      })
      return this.http.put(`${this._baseUrl}/cart/${storedItemsKey}`, { items: mappedItems, registeredAt: new Date().valueOf() })
    } else {
      console.error('No user key stored')
      return of()
    }
  }
}
