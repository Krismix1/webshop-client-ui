import { AppPage } from './app.po';
import { browser, $, $$ } from 'protractor';
import { CategoriesPage } from './categories.po';

describe('webshop-client App', () => {
  let page: AppPage;
  let categoriesPage: CategoriesPage;

  beforeEach(() => {
    page = new AppPage();
    categoriesPage = new CategoriesPage();
  });

  it('1. Should send to home page when no url provided', () => {
    browser.get('');
    expect(browser.getCurrentUrl()).toMatch('/home');
  });

  it('2. Should display categories', () => {
    categoriesPage.navigateTo();
    categoriesPage.getCategories().then(categories => {
      expect(categories.length > 0).toBeTruthy();
    })
  });

  it('3. Should display products when category clicked', () => {
    categoriesPage.navigateTo();
    // browser.sleep(3000);
    categoriesPage.getCategoryByIndex(0).click().then(() => {
      $$('.product-card-wrapper').then(cards => {
        expect(cards.length).toBe(1);
      });
    });
  });

  it('4. Should display page not found on unknown route', () => {
    browser.get('/somewhere').then(() => {
      $$('h1').then(elements => {
        expect(elements.length).toBe(1);
        let element = elements[0];
        expect(element.getText()).toMatch('Could not find page');
      });
    });
  });
});
