import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CflTeamLinkComponent } from './cfl-team-link.component';

describe('CflTeamLinkComponent', () => {
  let component: CflTeamLinkComponent;
  let fixture: ComponentFixture<CflTeamLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CflTeamLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CflTeamLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
