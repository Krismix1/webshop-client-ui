import { Injectable } from '@angular/core'
import { NgRedux } from '@angular-redux/store'
import { IAppState } from '../store/store'
import { Category } from './../entities/category'

@Injectable()
export class CategoryActions {

  constructor (private ngRedux: NgRedux<IAppState>) { }

  static ADD_CATEGORY = 'ADD_CATEGORY'
  static SET_CATEGORIES = 'SET_CATEGORIES'
  static SET_PRODUCT_CATEGORY = 'SET_PRODUCT_CATEGORY'
  static TOGGLE_CATEGORY_LIST = 'TOGGLE_CATEGORY_LIST'

  addCategory (category: Category): void {
    this.ngRedux.dispatch({
      type: CategoryActions.ADD_CATEGORY,
      payload: category
    })
  }

  setCategories (categories: Category[]): void {
    this.ngRedux.dispatch({
      type: CategoryActions.SET_CATEGORIES,
      payload: categories
    })
  }

  setProductCategory (category: Category): void {
    this.ngRedux.dispatch({
      type: CategoryActions.SET_PRODUCT_CATEGORY,
      payload: category
    })
  }

  toggleCategoryList (): void {
    this.ngRedux.dispatch({
      type: CategoryActions.TOGGLE_CATEGORY_LIST
    })
  }
}
