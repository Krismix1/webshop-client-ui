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
    let stateAfter = { categories: [category] };
    deepFreeze(stateBefore);
    expect(categoryReducer(stateBefore, {
      type: types.CategoryActions.ADD_CATEGORY,
      payload: category
    })).toEqual(stateAfter);
  });

  it('Should add 2 categories in row', () => {
    let stateBefore = { categories: [] };
    let cat1 = { name: "unit_test_category_1" };
    let cat2 = { name: "unit_test_category_2" };
    deepFreeze(stateBefore);

    let stateAfter = categoryReducer(stateBefore, {
      type: types.CategoryActions.ADD_CATEGORY,
      payload: cat1
    });

    expect(stateAfter).toEqual({
      categories: [cat1]
    });

    stateBefore = stateAfter;
    deepFreeze(stateBefore);

    expect(categoryReducer(stateBefore, {
      type: types.CategoryActions.ADD_CATEGORY,
      payload: cat2
    })).toEqual({
      categories: [cat1, cat2]
    });
  });
});
