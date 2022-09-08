import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CflPlayersComponent } from './cfl-players.component';

describe('CflPlayersComponent', () => {
  let component: CflPlayersComponent;
  let fixture: ComponentFixture<CflPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CflPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CflPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
