import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CflRosterComponent } from './cfl-roster.component';

describe('CflRosterComponent', () => {
  let component: CflRosterComponent;
  let fixture: ComponentFixture<CflRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CflRosterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CflRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
