const deepFreeze = require('deep-freeze');

import { categoryReducer } from './category.reducer';
import * as types from './../category/category.actions';

describe('category reducers', () => {

  it('should return the initial state', () => {
    expect(categoryReducer(undefined, {})).toEqual({
      categories: [],
      currentCategory: undefined,
      displayList: true
    });
  });

  it('Should add category', () => {
    let stateBefore = {
      categories: [],
      currentCategory: undefined,
      displayList: true
    };
    let category = {
      name: "unit_test_category"
    };
    let stateAfter = {
      categories: [category],
      currentCategory: undefined,
      displayList: true
    };
    deepFreeze(stateBefore);
    expect(categoryReducer(stateBefore, {
      type: types.CategoryActions.ADD_CATEGORY,
      payload: category
    })).toEqual(stateAfter);
  });

  it('Should add 2 categories in row', () => {
    let stateBefore = {
      categories: [],
      currentCategory: undefined,
      displayList: true
    };
    let cat1 = { name: "unit_test_category_1" };
    let cat2 = { name: "unit_test_category_2" };
    deepFreeze(stateBefore);

    let stateAfter = categoryReducer(stateBefore, {
      type: types.CategoryActions.ADD_CATEGORY,
      payload: cat1
    });

    expect(stateAfter).toEqual({
      categories: [cat1],
      currentCategory: undefined,
      displayList: true
    });

    stateBefore = stateAfter;
    deepFreeze(stateBefore);

    expect(categoryReducer(stateBefore, {
      type: types.CategoryActions.ADD_CATEGORY,
      payload: cat2
    })).toEqual({
      categories: [cat1, cat2],
      currentCategory: undefined,
      displayList: true
    });
  });
});
