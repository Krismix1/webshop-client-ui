import { ProductActions } from './../product/product.actions';
import { CategoryActions } from './../category/category.actions';
import { ProductState } from './../store/store';
import { tassign } from 'tassign';

const INITIAL_STATE: ProductState = { products: [], visibleProducts: undefined }

export function productReducer(state: ProductState = INITIAL_STATE, action: any) {
  switch (action.type) {
    case CategoryActions.SET_PRODUCT_CATEGORY:
      let selectedCategory = action.payload.name;
      // Filter the products by the category
      let visProducts = state.products.filter(product => {
        return product.type.category.name === selectedCategory;
      });
      return tassign(state, { visibleProducts: visProducts });
    case ProductActions.ADD_PRODUCT:
      return tassign(state, { products: [...state.products, action.payload] })
    default:
      return state;
  }
}
