import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { categoryReducer } from './../reducers/category.reducer';
import { Category } from './../entities/category';

export class CategoryState {
  categories: Category[];
}

export class IAppState {
  category?: CategoryState;
}

export const rootReducer = combineReducers<IAppState>({
  category: categoryReducer,
  router: routerReducer
});
