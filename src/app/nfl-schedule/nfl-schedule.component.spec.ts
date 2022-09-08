import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NflScheduleComponent } from './nfl-schedule.component';

describe('NflScheduleComponent', () => {
  let component: NflScheduleComponent;
  let fixture: ComponentFixture<NflScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NflScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NflScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
