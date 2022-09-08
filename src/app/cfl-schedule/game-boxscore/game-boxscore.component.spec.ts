import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoxscoreComponent } from './game-boxscore.component';

describe('GameBoxscoreComponent', () => {
  let component: GameBoxscoreComponent;
  let fixture: ComponentFixture<GameBoxscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameBoxscoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoxscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
