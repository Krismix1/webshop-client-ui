const deepFreeze = require('deep-freeze');

import { categoryReducer } from './category.reducer';
import * as types from './../category/category.actions';

describe('category reducers', () => {

  it('should return the initial state', () => {
    expect(categoryReducer(undefined, {})).toEqual({ categories: [] });
  });

  it('Should add category', () => {
    let stateBefore = { categories: [] };
    let category = {
      name: "unit_test_category"
    };
    let stateAfter = [category];
    deepFreeze(stateBefore);
    expect(categoryReducer(stateBefore, {
      type: types.CategoryActions.ADD_CATEGORY,
      payload: category
    })).toEqual(stateAfter);
  });
});
