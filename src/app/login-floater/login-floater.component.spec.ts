import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFloaterComponent } from './login-floater.component';

describe('LoginFloaterComponent', () => {
  let component: LoginFloaterComponent;
  let fixture: ComponentFixture<LoginFloaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFloaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFloaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
