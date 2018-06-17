import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found.component';
import { By } from '@angular/platform-browser';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1. Should create', () => {
    expect(component).toBeDefined();
  });

  it('2. Should say that page is not found', () => {
    const pageComponent: HTMLElement = fixture.nativeElement;
    expect(pageComponent.textContent.toLowerCase()).toContain('could not find page');
  });

  it('3. Should have h1 with "could not find page"', () => {
    const pageComponent: HTMLElement = fixture.nativeElement;
    const h1 = pageComponent.querySelector('h1');
    expect(h1.textContent.toLowerCase()).toContain('could not find page');
    // expect(fixture.componentInstance == fixture.debugElement.componentInstance).toEqual(true, 'lol');
    // expect(fixture.nativeElement == fixture.debugElement.nativeElement).toEqual(true, 'lol');

    // DebugElement - platform independent object, abstraction to work safely across all supported platforms
    const bannerDe: DebugElement = fixture.debugElement;
    const header1De: DebugElement = bannerDe.query(By.css('h1'));
    // The nativeElement property unwraps the DebugElement and returns the platform-specific element object.
    const h1_: HTMLElement = header1De.nativeElement;
    expect(h1_.textContent.toLowerCase()).toContain('could not find page');
    // The DebugElement has other methods and properties that are useful in tests
    // Platforms: Browser, Server side render (render first on the server as part of a strategy to make the application launch faster)
    // The server-side renderer might not support the full HTML element API If it doesn't support querySelector, the previous test could fail.

    // When you're filtering by CSS selector and only testing properties of a browser's native element, the By.css approach may be overkill.
    // It's often easier and more clear to filter with a standard HTMLElement method such as querySelector() or querySelectorAll(),
    // as you'll see in the next set of tests.
    // Docs https://angular.io/guide/testing#nativeelement
  });
});
