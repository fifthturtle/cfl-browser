import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NflTeamLinkComponent } from './nfl-team-link.component';

describe('NflTeamLinkComponent', () => {
  let component: NflTeamLinkComponent;
  let fixture: ComponentFixture<NflTeamLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NflTeamLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NflTeamLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
