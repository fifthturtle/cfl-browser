import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CflTeamComponent } from './cfl-team.component';

describe('CflTeamComponent', () => {
  let component: CflTeamComponent;
  let fixture: ComponentFixture<CflTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CflTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CflTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
