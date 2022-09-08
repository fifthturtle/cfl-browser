import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CflScheduleComponent } from './cfl-schedule.component';

describe('CflScheduleComponent', () => {
  let component: CflScheduleComponent;
  let fixture: ComponentFixture<CflScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CflScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CflScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
