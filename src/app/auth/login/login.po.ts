import { ComponentFixture } from '@angular/core/testing'
import { LoginComponent } from './login.component'
import { Router } from '@angular/router'

export class LoginPage {
  // getter properties wait to query the DOM until called.
  get buttons ()     { return this.queryAll<HTMLButtonElement>('button') }
  get saveBtn ()     { return this.buttons[0] }
  get emailInput ()   { return this.queryAll<HTMLInputElement>('input')[0] }
  get passwordInput ()   { return this.queryAll<HTMLInputElement>('input')[1] }
  get form ()        { return this.query<HTMLFormElement>('form') }

  createForm: jasmine.Spy
  navigateSpy: jasmine.Spy
  onSubmitLogin: jasmine.Spy

  fixture: ComponentFixture<LoginComponent>

  constructor (fixture: ComponentFixture<LoginComponent>) {
    this.fixture = fixture
    // get the navigate spy from the injected router spy object
    const routerSpy = fixture.debugElement.injector.get(Router) as any
    this.navigateSpy = routerSpy.navigate

    // spy on component's `gotoList()` method
    const component = fixture.componentInstance
    this.createForm = spyOn(component, 'createForm').and.callThrough()
    this.onSubmitLogin = spyOn(component, 'onSubmitLogin').and.callThrough()
  }

  //// query helpers ////
  private query<T> (selector: string): T {
    return this.fixture.nativeElement.querySelector(selector)
  }

  private queryAll<T> (selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector)
  }
}
