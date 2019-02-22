const deepFreeze = require('deep-freeze')

import { categoryReducer } from './category.reducer'
import * as types from './../category/category.actions'

describe('category reducers', () => {

  it('1. Should return the initial state', () => {
    expect(categoryReducer(undefined, {})).toEqual({
      categories: [],
      currentCategory: null,
      displayList: true
    })
  })

  it('2. Should add category', () => {
    const stateBefore = {
      categories: [],
      currentCategory: null,
      displayList: true
    }
    const category = {
      name: 'unit_test_category'
    }
    const stateAfter = {
      categories: [category],
      currentCategory: null,
      displayList: true
    }
    deepFreeze(stateBefore)
    expect(categoryReducer(stateBefore, {
      type: types.CategoryActions.ADD_CATEGORY,
      payload: category
    })).toEqual(stateAfter)
  })

  it('3. Should add 2 categories in row', () => {
    let stateBefore = {
      categories: [],
      currentCategory: null,
      displayList: true
    }
    const cat1 = { name: 'unit_test_category_1' }
    const cat2 = { name: 'unit_test_category_2' }
    deepFreeze(stateBefore)

    const stateAfter = categoryReducer(stateBefore, {
      type: types.CategoryActions.ADD_CATEGORY,
      payload: cat1
    })

    expect(stateAfter).toEqual({
      categories: [cat1],
      currentCategory: null,
      displayList: true
    })

    stateBefore = stateAfter
    deepFreeze(stateBefore)

    expect(categoryReducer(stateBefore, {
      type: types.CategoryActions.ADD_CATEGORY,
      payload: cat2
    })).toEqual({
      categories: [cat1, cat2],
      currentCategory: null,
      displayList: true
    })
  })
})
