import { routerReducer } from '@angular-redux/router'
import { combineReducers } from 'redux'
import { categoryReducer } from './../reducers/category.reducer'
import { productReducer } from './../reducers/product.reducer'
import { cartReducer } from './../reducers/cart.reducer'
import { userReducer } from './../reducers/user.reducer'
import { Category } from './../entities/category'
import { Product } from './../entities/product'
import { CartItem } from './../entities/cart-item'

export class CategoryState {
  categories: Category[]
  currentCategory: Category | null
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

export class UserState {
  account: Account | null
}

export class IAppState {
  category: CategoryState
  product: ProductState
  cart: CartState
  user: UserState
  router: any
}

export const rootReducer = combineReducers<IAppState>({
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
  router: routerReducer
})
