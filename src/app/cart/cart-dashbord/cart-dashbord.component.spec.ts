import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDashbordComponent } from './cart-dashbord.component';

describe('CartDashbordComponent', () => {
  let component: CartDashbordComponent;
  let fixture: ComponentFixture<CartDashbordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartDashbordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
