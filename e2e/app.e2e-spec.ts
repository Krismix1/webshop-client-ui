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

  it('1. Should send to home page when no url provided', ()=>{
    browser.get('');
    expect(browser.getCurrentUrl()).toMatch('/home');
  });

  it("2. Should require auth", () => {
    browser.get("/account");
    expect(browser.getCurrentUrl()).toMatch("/login");
  });

  it('3. Should display categories', ()=>{
    categoriesPage.navigateTo();
    categoriesPage.getCategories().then(categories => {
      expect(categories.length > 0).toBeTruthy();
    })
  });

  it('4. Should display products when category clicked', () => {
    categoriesPage.navigateTo();
    // browser.sleep(3000);
    categoriesPage.getCategoryByIndex(0).click().then(() => {
      $$('.product-card-wrapper').then(cards => {
        expect(cards.length).toBe(1);
      });
    });
  });
});
