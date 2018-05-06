import { browser, by, element, $$, ElementArrayFinder } from 'protractor';
import { Category } from '../src/app/entities/category';

export class CategoriesPage {
  navigateTo() {
    return browser.get('/home');
  }

  getCategories(): ElementArrayFinder {
    return $$('.category');
  }

  getCategoryByIndex(index: number) {
    return $$('.category').get(index)
  }
}
