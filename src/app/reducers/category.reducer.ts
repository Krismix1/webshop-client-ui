import { CategoryActions } from './../category/category.actions';
import { CategoryState } from './../store/store';
import { tassign } from 'tassign';

const INITIAL_STATE: CategoryState = { categories: [], currentCategory: undefined }

export function categoryReducer(state: CategoryState = INITIAL_STATE, action: any) {
  switch (action.type) {
    case CategoryActions.ADD_CATEGORY:
      return tassign(state, { categories: [...state.categories, action.payload] });
    case CategoryActions.SET_PRODUCT_CATEGORY:
      return tassign(state, { currentCategory: action.payload });
    default:
      return state;
  }
}
