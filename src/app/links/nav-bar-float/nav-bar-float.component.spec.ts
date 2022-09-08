import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarFloatComponent } from './nav-bar-float.component';

describe('NavBarFloatComponent', () => {
  let component: NavBarFloatComponent;
  let fixture: ComponentFixture<NavBarFloatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarFloatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarFloatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
