import { browser, $$, ElementArrayFinder } from 'protractor'

export class CategoriesPage {
  navigateTo () {
    return browser.get('/home')
  }

  getCategories (): ElementArrayFinder {
    return $$('.category')
  }

  getCategoryByIndex (index: number) {
    return $$('.category').get(index)
  }
}
