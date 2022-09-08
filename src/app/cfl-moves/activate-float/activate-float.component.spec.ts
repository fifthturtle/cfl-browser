import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateFloatComponent } from './activate-float.component';

describe('ActivateFloatComponent', () => {
  let component: ActivateFloatComponent;
  let fixture: ComponentFixture<ActivateFloatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateFloatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateFloatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
