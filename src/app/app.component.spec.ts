import { TestBed, async, ComponentFixture } from '@angular/core/testing'
// import { RouterTestingModule } from '@angular/router/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { AppComponent } from './app.component'
import { RouterLinkDirectiveStub } from './../testing/router-link-directive-stub'

// info at https://angular.io/guide/testing#nested-component-tests
describe('AppComponent', () => {
  // let component: AppComponent; // for Component DOM Testing
  let fixture: ComponentFixture<AppComponent>
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub,
        MockNavComponent,
        SearchStubComponent,
        RouterOutletStubComponent
      ]
      // ,schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents().then(() => {
      // creates an instance of the AppComponent, adds a corresponding element to the test-runner DOM, and returns a ComponentFixture.
      fixture = TestBed.createComponent(AppComponent)
    })
  }))

  it('1. should create the app', () => {
    const app = fixture.debugElement.componentInstance
    expect(app).toBeDefined()
  })

  it(`2. should have as title 'Online Shop'`, () => {
    const app = fixture.debugElement.componentInstance
    expect(app.title).toEqual('Online Shop')
  })
  //
  // it('3. Should render the title', () => {
  //   const appElement: HTMLElement = fixture.nativeElement;
  //   expect(appElement.textContent).toContain('Online Shop');
  // });
})

@Component({ selector: 'app-navbar', template: '' })
class MockNavComponent { }

@Component({ selector: 'app-search', template: '' })
class SearchStubComponent { }

// tslint:disable-next-line:component-selector
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }
