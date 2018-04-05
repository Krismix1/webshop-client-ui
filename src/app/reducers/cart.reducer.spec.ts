const deepFreeze = require('deep-freeze');

import { cartReducer } from './cart.reducer';
import * as types from './../cart/cart.actions';
import { Product } from './../entities/product';
import { CartItem } from './../entities/cart-item';

describe('cart reducers', () => {

  let products: Product[] = [{
    name: "test_name",
    price: 999,
    image: "test_image",
    thumbnail: "test_thumbnail",
    category: null,
    shortDescription: "some very short testing description"
  },
  {
    name: "test_name_2",
    price: 222,
    image: "test_image_2",
    thumbnail: "test_thumbnail_2",
    category: null,
    shortDescription: "testing description 2"
  }];

  it('1. should return initial state', () => {
    expect(cartReducer(undefined, {})).toEqual({ items: [] });
  });

  it('2. should add new item', () => {
    let stateBefore = [];
    let product: Product = products[0];
    let cartItem: CartItem = { product: product, quantity: 1 };
    deepFreeze(stateBefore);

    let stateAfter = cartReducer(undefined, {
      type: types.CartActions.PUT_PRODUCT,
      payload: product
    });
    expect(stateAfter).toEqual({ items: [cartItem] });
  });

  it('3. should add 2 different items', () => {
    let stateBefore = [];
    let product: Product = products[0];
    let cartItem: CartItem = { product: product, quantity: 1 };
    deepFreeze(stateBefore);

    let stateAfter = cartReducer(undefined, {
      type: types.CartActions.PUT_PRODUCT,
      payload: product
    });
    expect(stateAfter).toEqual({ items: [cartItem] });

    // add the second item
    stateBefore = stateAfter;
    let product2: Product = products[1];
    let cartItem2 = { product: product2, quantity: 1 };

    deepFreeze(stateBefore);
    stateAfter = cartReducer(stateBefore, {
      type: types.CartActions.PUT_PRODUCT,
      payload: product2
    });

    expect(stateAfter).toEqual({ items: [cartItem, cartItem2] });
  });

  it('4. should add 2 similar items', () => {
    let stateBefore = [];
    let product: Product = products[0];
    let cartItem: CartItem = { product: product, quantity: 1 };
    deepFreeze(stateBefore);

    let stateAfter = cartReducer(undefined, {
      type: types.CartActions.PUT_PRODUCT,
      payload: product
    });
    expect(stateAfter).toEqual({ items: [cartItem] });

    // add the second item
    stateBefore = stateAfter;
    let product2: Product = {
      name: "test_name",
      price: 999,
      image: "test_image",
      thumbnail: "test_thumbnail",
      category: null,
      shortDescription: "some very short testing description"
    };

    deepFreeze(stateBefore);
    stateAfter = cartReducer(stateBefore, {
      type: types.CartActions.PUT_PRODUCT,
      payload: product2
    });

    // expect the quantity to be incremented
    expect(stateAfter).toEqual({ items: [{ product: products[0], quantity: 2 }] });
  });

  it('5. should add 2 similar and 1 different item', () => {
    let stateBefore = [];
    let product: Product = products[0];
    let cartItem: CartItem = { product: product, quantity: 1 };
    deepFreeze(stateBefore);

    let stateAfter = cartReducer(undefined, {
      type: types.CartActions.PUT_PRODUCT,
      payload: product
    });
    expect(stateAfter).toEqual({ items: [cartItem] });

    // add a different item
    stateBefore = stateAfter;

    deepFreeze(stateBefore);
    stateAfter = cartReducer(stateBefore, {
      type: types.CartActions.PUT_PRODUCT,
      payload: products[1]
    });
    expect(stateAfter).toEqual({ items: [cartItem, { product: products[1], quantity: 1 }] });

    // add the second similar item
    stateBefore = stateAfter;
    let product2: Product = {
      name: "test_name",
      price: 999,
      image: "test_image",
      thumbnail: "test_thumbnail",
      category: null,
      shortDescription: "some very short testing description"
    };

    deepFreeze(stateBefore);
    stateAfter = cartReducer(stateBefore, {
      type: types.CartActions.PUT_PRODUCT,
      payload: product2
    });

    // expect the quantity to be incremented
    expect(stateAfter).toEqual({ items: [{ product: products[0], quantity: 2 }, { product: products[1], quantity: 1 }] });
  });
});
