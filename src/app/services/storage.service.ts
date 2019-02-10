import { Injectable } from '@angular/core'
import { CartItem } from './../entities/cart-item'
import { HttpClient } from '@angular/common/http'
import { AuthService } from './auth.service'
import { environment } from './../../environments/environment'
import { of } from 'rxjs'

@Injectable()
export class StorageService {

  static readonly USER_KEY = 'USER_KEY'
  private _baseUrl = `${environment.clientService}/api`
  constructor(private http: HttpClient, private authService: AuthService) { }

  getCartItems() {
    if (this.authService.isLoggedIn()) {
      // FIXME: retrieve data based on username
      return of([])
    } else {
      // retrieve data based on token
      const storedItemsKey = localStorage.getItem(StorageService.USER_KEY)
      if (!storedItemsKey) { // no key saved
        // request a new key
        // TODO: Don't use a GET request, because the handler creates new data
        // But get requests should be repeatable
        this.http.get<any>(this._baseUrl + '/users/anonymous/key').subscribe(data => {
          localStorage.setItem(StorageService.USER_KEY, data.key)
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
    if (!storedItemsKey) {
      const mappedItems = items.map(item => ({ quantity: item.quantity, product: item.product.id }))
      return this.http.put(`${this._baseUrl}/cart/${storedItemsKey}`, { items: mappedItems })
    } else {
      console.error('No key present. Can\'t save items')
      return of()
    }
  }
}
