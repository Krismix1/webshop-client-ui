import { Injectable } from '@angular/core'

import { CartActions } from './../cart/cart.actions'
// epic
import { ActionsObservable } from 'redux-observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Observable'

import { StorageService } from './../services/storage.service'

@Injectable()
export class CartEpic {

  constructor(private storageService: StorageService) { }

  getItems = (action$: ActionsObservable<any>) => {
    return action$.ofType(CartActions.GET_ITEMS) // Listen for this action
      .mergeMap(({ payload }) => { // When this action is activated, call ws through service class
        return this.storageService.getCartItems()
          .map(results => ({ // when web service responds with success, call this action with payload that came back from webservice
            type: CartActions.RECEIVED_ITEMS,
            payload: { results: results, initialized: true }
          }))
          .catch(error => Observable.of({
            // when web service responds with failure, call this action with payload that came back from webservice
            type: CartActions.FAILED_RECEIVING_ITEMS,
            payload: { error: error, initialized: true }
          }))
      })
  }

  saveItems = (action$: ActionsObservable<any>) => {
    return action$.ofType(CartActions.SAVE_CART_ITEMS)
      .mergeMap(({ payload }) => {
        return this.storageService.saveItems(payload)
          .map(result => ({
            type: CartActions.SUCCESS_SAVE_CART_ITEMS,
            payload: result || ''
          }))
          .catch(error => {
            return Observable.of({
              type: CartActions.FAILED_SAVE_CART_ITEMS,
              payload: error
            })
          })
      })
  }
}
