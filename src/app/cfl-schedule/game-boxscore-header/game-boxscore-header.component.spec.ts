import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoxscoreHeaderComponent } from './game-boxscore-header.component';

describe('GameBoxscoreHeaderComponent', () => {
  let component: GameBoxscoreHeaderComponent;
  let fixture: ComponentFixture<GameBoxscoreHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameBoxscoreHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoxscoreHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
