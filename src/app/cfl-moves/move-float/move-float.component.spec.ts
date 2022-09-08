import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveFloatComponent } from './move-float.component';

describe('MoveFloatComponent', () => {
  let component: MoveFloatComponent;
  let fixture: ComponentFixture<MoveFloatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveFloatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveFloatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
