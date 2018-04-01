import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';
import { Category } from './../entities/category';

@Injectable()
export class CategoryActions {

  constructor(private ngRedux: NgRedux<IAppState>) { }

  static ADD_CATEGORY: string = 'ADD_CATEGORY';
  static SET_PRODUCT_CATEGORY: string = 'SET_PRODUCT_CATEGORY';

  addCategory(category: Category): void {
    this.ngRedux.dispatch({
      type: CategoryActions.ADD_CATEGORY,
      payload: category
    });
  }

  setProductCategory(category: Category): void {
    this.ngRedux.dispatch({
      type: CategoryActions.SET_PRODUCT_CATEGORY,
      payload: category
    });
  }
}
