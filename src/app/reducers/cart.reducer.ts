import { CartState } from './../store/store';
import { CartActions } from './../cart/cart.actions';
import { CartItem } from './../entities/cart-item';
import { tassign } from 'tassign';

const INITIAL_STATE: CartState = { items: [] };

export function cartReducer(state: CartState = INITIAL_STATE, action: any) {
  switch (action.type) {
    case CartActions.PUT_PRODUCT:
      // search the current state of the cart
      // if the item already exists, then add 1 to the quantity
      // else, add a new item with a quantity of 1
      let itemIndex = state.items.map(item => item.product.name).indexOf(action.payload.name);
      if (itemIndex >= 0) {
        let foundItem: CartItem = state.items[itemIndex];
        let quantity = foundItem.quantity;
        let newItem: CartItem = tassign(foundItem, { quantity: quantity + 1 });
        return tassign(state, { items: [...state.items.slice(0, itemIndex), newItem, ...state.items.slice(itemIndex + 1)] });
      } else {
        let newItem: CartItem = tassign({ product: action.payload, quantity: 1 });
        return tassign(state, { items: [...state.items, newItem] });
      }
    case CartActions.SUBTRACT_PRODUCT:
      // find the item by product id
      itemIndex = state.items.map(item => item.product.id).indexOf(action.payload);
      if (itemIndex >= 0) {
        // item found
        let foundItem: CartItem = state.items[itemIndex];
        let quantity = foundItem.quantity;
        if (quantity == 1) {
          // remove the item from cart
          return tassign(state, { items: [...state.items.slice(0, itemIndex), ...state.items.slice(itemIndex + 1)] });
        } else {
          // subtract from quantity
          let newItem: CartItem = tassign(foundItem, { quantity: quantity - 1 });
          return tassign(state, { items: [...state.items.slice(0, itemIndex), newItem, ...state.items.slice(itemIndex + 1)] });
        }
      } else {
        // item not found
        return state;
      }
    default:
      return state;
  }
}
