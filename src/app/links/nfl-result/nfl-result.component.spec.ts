import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NflResultComponent } from './nfl-result.component';

describe('NflResultComponent', () => {
  let component: NflResultComponent;
  let fixture: ComponentFixture<NflResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NflResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NflResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
