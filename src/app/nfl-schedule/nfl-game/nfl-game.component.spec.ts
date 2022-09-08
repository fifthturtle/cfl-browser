import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NflGameComponent } from './nfl-game.component';

describe('NflGameComponent', () => {
  let component: NflGameComponent;
  let fixture: ComponentFixture<NflGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NflGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NflGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
