import { browser } from 'protractor'

describe('Should redirect to login page', () => {
  browser.waitForAngularEnabled(true)
  it('1. Protect account page', () => {
    browser.get('/account')
    expect(browser.getCurrentUrl()).toMatch('/login')
  })

})
