import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { DebugElement } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from './../../material.module'
import { Router } from '@angular/router'
import { AuthService } from './../../services/auth.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { throwError, of } from 'rxjs'
import 'rxjs/add/observable/of'
import { delay } from 'rxjs/operators'

import { LoginComponent } from './login.component'
import { LoginPage } from './login.po'
import { By } from '@angular/platform-browser'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let authService: jasmine.SpyObj<AuthService>
  let page: LoginPage
  let mockRouter: jasmine.SpyObj<Router>
  let loginDe: DebugElement
  let loginEl: HTMLElement
  beforeEach(async(() => {

    const routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login'])

    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule, ReactiveFormsModule],
      declarations: [ LoginComponent ],
      providers: [{provide: Router, useValue: routerSpy}, {provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    authService = TestBed.get(AuthService)
    authService = {...authService, redirectUrl: ''} as jasmine.SpyObj<AuthService>
    mockRouter = TestBed.get(Router)
    fixture.detectChanges()
    page = new LoginPage(fixture)
    mockRouter.navigate.and.callFake((value) => {
      console.log(`Router navigate called with value: ${value}`)
    })

    loginDe = fixture.debugElement
    loginEl = loginDe.nativeElement
  })

  it('1. It should create', () => {
    expect(component).toBeTruthy()
  })
  // Tests 2-13 require only class object, no DOM object should be needed
  it('2. Value of hidePassword should be true by default', () => {
    expect(component.hidePassword).toBe(true, 'Hide password is false')
  })

  it('3. Should have no status', () => {
    expect(component.status).toBe(0, 'The component has positive initial status')
  })

  it('4. Should create empty, invalid form with \'required\' validators', () => {
    expect(component.loginForm).toBeDefined('Form is undefined')
    expect(component.loginForm.controls.email.errors.required).toBe(true, 'Email does not have a required validator')
    expect(component.loginForm.controls.password.errors.required).toBe(true, 'Password does not have a required validator')
    expect(component.loginForm.valid).toBe(false, 'Form is valid')
    expect(component.loginForm.controls.email.valid).toBe(false, 'Email control is valid')
    expect(component.loginForm.controls.password.valid).toBe(false, 'Password control is valid')
  })

  it('5. Should mark form as valid then invalid', () => {
    expect(component.loginForm.valid).toBe(false, 'Form should start as invalid')
    component.loginForm.controls.email.setValue('a')
    component.loginForm.controls.password.setValue('pass')
    expect(component.loginForm.valid).toBe(true, 'Form should become valid')
    component.loginForm.controls.email.setValue('')
    component.loginForm.controls.password.setValue('')
    expect(component.loginForm.valid).toBe(false, 'Form should become invalid')
  })

  it('6. Should mark form as submitted no matter of form state', () => {
    // the isSubmitted property is added in onSubmitLogin
    expect(component.loginForm.isSubmitted).toBeFalsy('Initialy form should not have isSubmitted property')
    component.onSubmitLogin(component.loginForm)
    expect(component.loginForm.isSubmitted).toBe(true, 'Form should change isSubmitted to true')
  })

  it('7. Should mark form as submitted no matter of form state', () => {
    component.onSubmitLogin(component.loginForm)
    component.loginForm.controls.password.setValue('')
    expect(component.loginForm.isSubmitted).toBe(false, 'Form should change isSubmitted to false after input touch')
    component.onSubmitLogin(component.loginForm)
    component.loginForm.controls.password.setValue('aa')
    expect(component.loginForm.isSubmitted).toBe(false, 'Form should change isSubmitted to false after input changes')
  })

  it('8. Should change status to invalid and not call service when form is invalid', () => {
    authService.login.and.callThrough()
    component.onSubmitLogin(component.loginForm)
    expect(component.status).toBe(component.STATUS_INVALID_FORM, 'Component status should change to invalid when form is invalid')
    expect(authService.login.calls.count()).toBe(0, 'AuthService should not be called when form is invalid')
  })

  it('9. Should change status to sending request and call service when form is valid', () => {
    authService.login.and.returnValue(of(true).pipe(delay(3000)))
    component.loginForm.controls.email.setValue('a')
    component.loginForm.controls.password.setValue('pass')
    component.onSubmitLogin(component.loginForm)
    expect(component.status).toBe(component.STATUS_SENDING_REQUEST, 'Component status should change to sending request when form is valid')
    expect(authService.login.calls.count()).toBe(1, 'AuthService should be called when form is valid')
    expect(authService.login.calls.argsFor(0)).toEqual(['a', 'pass'], 'Service received the email and password')
  })

  it('10. Should change status to login success on succesful login and redirect to \'home\' if no URL specified', () => {
    authService.login.and.returnValue(of(true))
    component.loginForm.controls.email.setValue('a')
    component.loginForm.controls.password.setValue('pass')
    component.onSubmitLogin(component.loginForm)
    expect(component.status).toBe(component.STATUS_SUCCESS_LOGIN, 'Component status should change to success login')
    expect(authService.login.calls.count()).toBe(1, 'AuthService should be called when form is valid')
    expect(mockRouter.navigate.calls.argsFor(0)[0]).toEqual(['home'], 'Component should redirect to home if no URL was tried.')
  })

  it('11. Should change status to login success on succesful login and redirect to specified URL', () => {
    authService.login.and.returnValue(of(true))
    fixture.debugElement.injector.get(AuthService).redirectUrl = 'testUrl'
    component.loginForm.controls.email.setValue('a')
    component.loginForm.controls.password.setValue('pass')
    component.onSubmitLogin(component.loginForm)
    expect(mockRouter.navigate.calls.argsFor(0)[0]).toEqual(['testUrl'], 'Component should redirect to specified URL.')
  })

  it('12. Should show invalid credentials message after login', () => {
    const msg = 'Test Error Invalid credentials'
    authService.login.and.returnValue(throwError(msg))
    component.loginForm.controls.email.setValue('a')
    component.loginForm.controls.password.setValue('pass')
    component.onSubmitLogin(component.loginForm)
    expect(component.status).toBe(component.STATUS_CUSTOM_MESSAGE, 'Component status should change to success login')
    expect(component.message).toEqual(msg, 'Component message should display the error message')
  })

  it('13. Should show network error message after login', () => {
    const msg = 'Test Network error'
    authService.login.and.returnValue(throwError(msg))
    component.loginForm.controls.email.setValue('a')
    component.loginForm.controls.password.setValue('pass')
    component.onSubmitLogin(component.loginForm)
    expect(component.status).toBe(component.STATUS_CUSTOM_MESSAGE, 'Component status should change to success login')
    expect(component.message).toEqual(msg, 'Component message should display the error message')
  })

  it('14. When page is created displays clean form with no errors and hidden password', () => {
    const formEl: HTMLElement = loginEl.querySelector('form')
    const inputs: NodeListOf<HTMLInputElement> = formEl.querySelectorAll('input')
    fixture.detectChanges()
    expect(formEl.querySelectorAll('input[type=password]').length).toBe(1, 'Password should be hidden by default')
    expect(inputs[0].value).toMatch('', 'Email is empty')
    expect(inputs[1].value).toMatch('', 'Password is empty')
    expect(formEl.querySelectorAll('mat-error').length).toBe(0, 'No errors should be displayed')
  })

  it('15. Should not show error if fields are touched but not dirty', () => {
    const inputs: NodeListOf<HTMLInputElement> = loginEl.querySelectorAll('input')
    const emailInput = inputs[0]
    const passwordInput = inputs[1]
    // simulate user focusing the input box
    // dispatch a DOM event so that Angular learns of input value change.
    emailInput.dispatchEvent(new Event('blur')) // blur - tell angular that the user unfocused the input
    passwordInput.dispatchEvent(new Event('blur'))
    fixture.detectChanges()
    const formEl: HTMLElement = loginEl.querySelector('form')
    expect(formEl.querySelectorAll('mat-error').length).toBe(0, 'Required errors should not be displayed')
  })

  it('16. Should show error when fields are dirty and empty', () => {
    // fake that user touched the inputs and wrote smth but deleted it
    const inputs: NodeListOf<HTMLInputElement> = loginEl.querySelectorAll('input')
    const emailInput = inputs[0]
    const passwordInput = inputs[1]
    // email
    emailInput.value = 'quick BROWN  fOx'
    emailInput.dispatchEvent(new Event('input'))
    emailInput.dispatchEvent(new Event('blur'))
    // password
    passwordInput.value = 'password value'
    passwordInput.dispatchEvent(new Event('input'))
    passwordInput.dispatchEvent(new Event('blur'))
    fixture.detectChanges()
    // delete the input
    // email
    emailInput.value = ''
    emailInput.dispatchEvent(new Event('input'))
    emailInput.dispatchEvent(new Event('blur'))
    // password
    passwordInput.value = ''
    passwordInput.dispatchEvent(new Event('input'))
    passwordInput.dispatchEvent(new Event('blur'))
    fixture.detectChanges()
    const formEl: HTMLElement = loginEl.querySelector('form')
    expect(formEl.querySelectorAll('mat-error').length).toBe(2, 'Required errors should be displayed')
  })

  it('17. Should display error if any validator fails, for pristine and invalid inputs after submit button clicked', () => {
    const inputs: NodeListOf<HTMLInputElement> = loginEl.querySelectorAll('input')
    const emailInput = inputs[0]
    const passwordInput = inputs[1]
    // email
    emailInput.value = 'quick BROWN  fOx'
    emailInput.dispatchEvent(new Event('input'))
    emailInput.dispatchEvent(new Event('blur'))
    const submitBtn: HTMLButtonElement = loginEl.querySelector('button')
    click(submitBtn)
    fixture.detectChanges()
    const passwordErrors: NodeListOf<Element> = loginEl.querySelectorAll('mat-error')
    expect(passwordErrors.length).toBe(1, 'Password input errors should be displayed if form is submitted but input was not touched')
    expect(passwordErrors[0].textContent.toLowerCase()).toContain('password is', 'Password error should be shown')
    expect(component.status).toBe(component.STATUS_INVALID_FORM, 'Component status should change to invalid when form is invalid')
  })

  it('18. Should remove errors when fields have text', () => {
    const formEl: HTMLElement = loginEl.querySelector('form')
    const inputs: NodeListOf<HTMLInputElement> = formEl.querySelectorAll('input')
    const emailInput = inputs[0]
    const passwordInput = inputs[1]

    // simulate user entering a new text into the input box
    emailInput.value = 'quick BROWN  fOx'
    passwordInput.value = 'password value'
    // dispatch a DOM event so that Angular learns of input value change.
    emailInput.dispatchEvent(new Event('input'))
    passwordInput.dispatchEvent(new Event('input'))
    emailInput.dispatchEvent(new Event('blur')) // blur - tell angular that the user unfocused the input
    passwordInput.dispatchEvent(new Event('blur'))
    fixture.detectChanges()
    expect(formEl.querySelectorAll('mat-error').length).toBe(0, 'Required errors should not be displayed')

    // simulate user removing the text from the input box
    emailInput.value = ''
    passwordInput.value = ''
    // dispatch a DOM event so that Angular learns of input value change.
    emailInput.dispatchEvent(new Event('input'))
    passwordInput.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    expect(formEl.querySelectorAll('mat-error').length).toBe(2, 'Required errors should be displayed')
  })

  it('19. Should toggle password field input type', () => {
    const formEl: HTMLElement = loginEl.querySelector('form')
    const icon = loginDe.query(By.css('mat-icon'))
    click(icon)
    fixture.detectChanges()
    expect(component.hidePassword).toBe(false, 'hidePassword should be false after 1 click')
    expect(formEl.querySelectorAll('input[type=password]').length).toBe(0, 'Password should not be hidden')
    expect(formEl.querySelectorAll('input[type=text]').length).toBe(1, 'Password should be shown')
    click(icon)
    fixture.detectChanges()
    expect(component.hidePassword).toBe(true, 'hidePassword should be true after 2 clicks')
    expect(formEl.querySelectorAll('input[type=password]').length).toBe(1, 'Password should be hidden')
    expect(formEl.querySelectorAll('input[type=text]').length).toBe(0, 'Password should not be shown')
  })

  it('20. Should display actions status', () => {

    component.status = component.STATUS_SENDING_REQUEST
    fixture.detectChanges()
    let actionMessageEl: Element = loginEl.querySelector('div.status-feedback')
    expect(actionMessageEl.textContent.trim().toLowerCase())
      .toContain('sending request...', 'Component status should change to sending request when form is valid')

    component.status = component.STATUS_SUCCESS_LOGIN
    fixture.detectChanges()
    actionMessageEl = loginEl.querySelector('div.status-feedback')
    expect(actionMessageEl.textContent.trim().toLowerCase()).toContain('logged in.', 'Component status should change to success login')
  })

  it('21. Should show custom error message when service fails', () => {
    const msg = 'Typical service error'
    component.message = msg
    component.status = component.STATUS_CUSTOM_MESSAGE
    fixture.detectChanges()
    expect(loginEl.querySelector('div.status-feedback').textContent.trim()).toEqual(msg, 'Service error message should be displayed')
  })
})

// From: https://angular.io/guide/testing#click-helper
/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
// left click - 0, middle click - 1, right click - 2
export const MouseButtonClickEvents = {
   left:  { button: 0 },
   right: { button: 2 }
}

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(el: DebugElement | HTMLElement, eventObj: any = MouseButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click()
  } else {
    el.triggerEventHandler('click', eventObj)
  }
}
