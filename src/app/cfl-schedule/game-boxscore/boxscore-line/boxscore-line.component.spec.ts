import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxscoreLineComponent } from './boxscore-line.component';

describe('BoxscoreLineComponent', () => {
  let component: BoxscoreLineComponent;
  let fixture: ComponentFixture<BoxscoreLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxscoreLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxscoreLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
