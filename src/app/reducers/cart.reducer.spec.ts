const deepFreeze = require('deep-freeze')

import { cartReducer } from './cart.reducer'
import * as types from './../cart/cart.actions'
import { Product } from './../entities/product'
import { CartItem } from './../entities/cart-item'
import { CartState } from '../store/store'

describe('cart reducers', () => {

  const products: Product[] = [{
    name: 'test_name',
    price: 999,
    imageUri: 'test_image',
    shortDescription: 'some very short testing description',
    type: null,
    id: 0
  },
  {
    name: 'test_name_2',
    price: 222,
    imageUri: 'test_image_2',
    shortDescription: 'testing description 2',
    type: null,
    id: 0
  }]

  it('1. should return initial state', () => {
    expect(cartReducer(undefined, {})).toEqual({ items: [], initialized: false })
  })

  it('2. should add new item', () => {
    const stateBefore = []
    const product: Product = products[0]
    const cartItem: CartItem = { product, quantity: 1 }
    deepFreeze(stateBefore)

    const stateAfter = cartReducer(undefined, {
      type: types.CartActions.PUT_PRODUCT,
      payload: product
    })
    expect(stateAfter).toEqual({ items: [cartItem], initialized: false })
  })

  it('3. should add 2 different items', () => {
    let stateBefore: CartState = { items: [], initialized: false }
    const product: Product = products[0]
    const cartItem: CartItem = { product, quantity: 1 }
    deepFreeze(stateBefore)

    let stateAfter = cartReducer(undefined, {
      type: types.CartActions.PUT_PRODUCT,
      payload: product
    })
    expect(stateAfter).toEqual({ items: [cartItem], initialized: false })

    // add the second item
    stateBefore = stateAfter
    const product2: Product = products[1]
    const cartItem2 = { product: product2, quantity: 1 }

    deepFreeze(stateBefore)
    stateAfter = cartReducer(stateBefore, {
      type: types.CartActions.PUT_PRODUCT,
      payload: product2
    })

    expect(stateAfter).toEqual({ items: [cartItem, cartItem2], initialized: false })
  })

  it('4. should add 2 similar items', () => {
    let stateBefore: CartState = { items: [], initialized: false }
    const product: Product = products[0]
    const cartItem: CartItem = { product, quantity: 1 }
    deepFreeze(stateBefore)

    let stateAfter = cartReducer(undefined, {
      type: types.CartActions.PUT_PRODUCT,
      payload: product
    })
    expect(stateAfter).toEqual({ items: [cartItem], initialized: false })

    // add the second item
    stateBefore = stateAfter
    const product2: Product = {
      name: 'test_name',
      price: 999,
      imageUri: 'test_image',
      shortDescription: 'some very short testing description',
      id: 0,
      type: null
    }

    deepFreeze(stateBefore)
    stateAfter = cartReducer(stateBefore, {
      type: types.CartActions.PUT_PRODUCT,
      payload: product2
    })

    // expect the quantity to be incremented
    expect(stateAfter).toEqual({ items: [{ product: products[0], quantity: 2 }], initialized: false })
  })

  it('5. should add 2 similar and 1 different item', () => {
    let stateBefore: CartState = { items: [], initialized: false }
    const product: Product = products[0]
    const cartItem: CartItem = { product, quantity: 1 }
    deepFreeze(stateBefore)

    let stateAfter = cartReducer(undefined, {
      type: types.CartActions.PUT_PRODUCT,
      payload: product
    })
    expect(stateAfter).toEqual({ items: [cartItem], initialized: false })

    // add a different item
    stateBefore = stateAfter

    deepFreeze(stateBefore)
    stateAfter = cartReducer(stateBefore, {
      type: types.CartActions.PUT_PRODUCT,
      payload: products[1]
    })
    expect(stateAfter).toEqual({ items: [cartItem, { product: products[1], quantity: 1 }], initialized: false })

    // add the second similar item
    stateBefore = stateAfter
    const product2: Product = {
      name: 'test_name',
      price: 999,
      imageUri: 'test_image',
      type: null,
      shortDescription: 'some very short testing description',
      id: 0
    }

    deepFreeze(stateBefore)
    stateAfter = cartReducer(stateBefore, {
      type: types.CartActions.PUT_PRODUCT,
      payload: product2
    })

    // expect the quantity to be incremented
    expect(stateAfter)
      .toEqual({
        items: [
          { product: products[0], quantity: 2 },
          { product: products[1], quantity: 1 }
        ],
        initialized: false
      })
  })
})
