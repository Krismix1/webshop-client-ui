import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material.module';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { delay } from 'rxjs/operators';
import { _throw } from "rxjs/observable/throw";

import { LoginComponent } from './login.component';
import { LoginPage } from './login.po';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let page: LoginPage;
  let mockRouter: jasmine.SpyObj<Router>;
  beforeEach(async(() => {

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule, ReactiveFormsModule],
      declarations: [ LoginComponent ],
      providers: [{provide: Router, useValue: routerSpy}, {provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();
  }));

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
  });

  it('1. It should create', () => {
    expect(component).toBeTruthy();
  });
  // Tests 2-10 require only class object, no DOM object should be needed
  it('2. Value of hidePassword should be true by default', () => {
    expect(component.hidePassword).toBe(true, 'Hide password is false');
  });

  it('3. Should have no status', () => {
    expect(component.status).toBe(0, 'The component has positive initial status');
  });

  it('4. Should create empty, invalid form with validators', () => {
    expect(component.loginForm).toBeDefined('Form is undefined');
    expect(component.loginForm.controls.email.errors.required).toBe(true, 'Email does not have a required validator');
    expect(component.loginForm.controls.password.errors.required).toBe(true, 'Password does not have a required validator');
    expect(component.loginForm.valid).toBe(false, 'Form is valid');
    expect(component.loginForm.controls.email.valid).toBe(false, 'Email control is valid');
    expect(component.loginForm.controls.password.valid).toBe(false, 'Password control is valid');
  });

  it('5. Should change status to invalid and not call service when form is invalid', () => {
    authService.login.and.callThrough()
    component.onSubmitLogin(component.loginForm)
    expect(component.status).toBe(component.STATUS_INVALID_FORM, 'Component status should change to invalid when form is invalid')
    expect(authService.login.calls.count()).toBe(0, 'AuthService should not be called when form is invalid')
  });

  it('6. Should change status to sending request and call service when form is valid', () => {
    authService.login.and.returnValue(Observable.of(true).delay(3000))
    component.loginForm.controls.email.setValue('a')
    component.loginForm.controls.password.setValue('pass')
    component.onSubmitLogin(component.loginForm)
    expect(component.status).toBe(component.STATUS_SENDING_REQUEST, 'Component status should change to sending request when form is valid')
    expect(authService.login.calls.count()).toBe(1, 'AuthService should be called when form is valid')
    expect(authService.login.calls.argsFor(0)).toEqual(['a', 'pass'], 'Service received the email and password')
  });

  it('7. Should change status to login success on succesful login and redirect to \'home\' if no URL specified', () => {
    authService.login.and.returnValue(Observable.of(true))
    component.loginForm.controls.email.setValue('a')
    component.loginForm.controls.password.setValue('pass')
    component.onSubmitLogin(component.loginForm)
    expect(component.status).toBe(component.STATUS_SUCCESS_LOGIN, 'Component status should change to success login')
    expect(authService.login.calls.count()).toBe(1, 'AuthService should be called when form is valid')
    expect(mockRouter.navigate.calls.argsFor(0)[0]).toEqual(['home'], 'Component should redirect to home if no URL was tried.')
  });

  it('8. Should change status to login success on succesful login and redirect to specified URL', () => {
    authService.login.and.returnValue(Observable.of(true))
    fixture.debugElement.injector.get(AuthService).redirectUrl = 'testUrl'
    component.loginForm.controls.email.setValue('a')
    component.loginForm.controls.password.setValue('pass')
    component.onSubmitLogin(component.loginForm)
    expect(mockRouter.navigate.calls.argsFor(0)[0]).toEqual(['testUrl'], 'Component should redirect to specified URL.')
  });

  it('9. Should change status to invalid credentials after login', () => {
    const msg: String = 'Invalid credentials'
    authService.login.and.returnValue(_throw(msg))
    component.loginForm.controls.email.setValue('a')
    component.loginForm.controls.password.setValue('pass')
    component.onSubmitLogin(component.loginForm)
    expect(component.status).toBe(component.STATUS_CUSTOM_MESSAGE, 'Component status should change to success login')
    expect(component.message).toBe('Invalid credentials', 'Component message should display the error message')
  });

  it('10. Should change status to network error after login', () => {
    fail('Not implemented')
  });
});
