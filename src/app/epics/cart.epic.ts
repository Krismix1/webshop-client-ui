import { Injectable } from '@angular/core'
import { CartActions } from './../cart/cart.actions'
// epic
import { ActionsObservable } from 'redux-observable'
import { of } from 'rxjs'
import { StorageService } from './../services/storage.service'
import { mergeMap, map, catchError } from 'rxjs/operators'

@Injectable()
export class CartEpic {

  constructor(private storageService: StorageService) { }

  getItems = (action: ActionsObservable<any>) => {
    return action.ofType(CartActions.GET_ITEMS) // Listen for this action
      .pipe(
        mergeMap(() => { // When this action is activated, call ws through service class
          return this.storageService.getCartItems()
            .pipe(
              map(results => ({ // when web service responds with success, call this action with payload that came back from webservice
                type: CartActions.RECEIVED_ITEMS,
                payload: { results: results, initialized: true }
              })),
              catchError(error => of({
                // when web service responds with failure, call this action with payload that came back from webservice
                type: CartActions.FAILED_RECEIVING_ITEMS,
                payload: { error: error, initialized: true }
              }))
            )
        })
    )
  }

  saveItems = (action: ActionsObservable<any>) => {
    return action.ofType(CartActions.SAVE_CART_ITEMS)
      .pipe(
        mergeMap(({ payload }) => {
          return this.storageService.saveItems(payload)
            .pipe(
              map(result => ({
                type: CartActions.SUCCESS_SAVE_CART_ITEMS,
                payload: result || ''
              })),
              catchError(error => of({
                  type: CartActions.FAILED_SAVE_CART_ITEMS,
                  payload: error
              }))
            )
        })
      )
  }

}
