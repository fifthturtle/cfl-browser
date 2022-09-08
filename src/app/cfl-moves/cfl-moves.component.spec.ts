import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CflMovesComponent } from './cfl-moves.component';

describe('CflMovesComponent', () => {
  let component: CflMovesComponent;
  let fixture: ComponentFixture<CflMovesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CflMovesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CflMovesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
