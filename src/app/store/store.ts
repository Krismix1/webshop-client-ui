import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { categoryReducer } from './../reducers/category.reducer';
import { productReducer } from './../reducers/product.reducer';
import { Category } from './../entities/category';
import { Product } from './../entities/product';

export class CategoryState {
  categories: Category[];
  currentCategory: Category;
}

export class ProductState {
  products: Product[];
  visibleProducts: Product[];
}

export class IAppState {
  category?: CategoryState;
  product?: ProductState;
}

export const rootReducer = combineReducers<IAppState>({
  category: categoryReducer,
  product: productReducer,
  router: routerReducer
});
