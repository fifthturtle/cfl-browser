import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NflOpponentComponent } from './nfl-opponent.component';

describe('NflOpponentComponent', () => {
  let component: NflOpponentComponent;
  let fixture: ComponentFixture<NflOpponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NflOpponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NflOpponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
