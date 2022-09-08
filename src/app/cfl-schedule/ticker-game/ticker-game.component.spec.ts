import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerGameComponent } from './ticker-game.component';

describe('TickerGameComponent', () => {
  let component: TickerGameComponent;
  let fixture: ComponentFixture<TickerGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickerGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
