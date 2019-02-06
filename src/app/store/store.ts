import { routerReducer } from '@angular-redux/router'
import { combineReducers } from 'redux'
import { categoryReducer } from './../reducers/category.reducer'
import { productReducer } from './../reducers/product.reducer'
import { cartReducer } from './../reducers/cart.reducer'
import { Category } from './../entities/category'
import { Product } from './../entities/product'
import { CartItem } from './../entities/cart-item'

export class CategoryState {
  categories: Category[]
  currentCategory: Category
  displayList: boolean
}

export class ProductState {
  products: Product[]
  visibleProducts: Product[]
}

export class CartState {
  items: CartItem[]
  initialized: boolean
}

export class IAppState {
  category?: CategoryState
  product?: ProductState
  cart?: CartState
  router?: any
}

export const rootReducer = combineReducers<IAppState>({
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  router: routerReducer
})
