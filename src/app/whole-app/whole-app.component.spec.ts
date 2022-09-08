import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholeAppComponent } from './whole-app.component';

describe('WholeAppComponent', () => {
  let component: WholeAppComponent;
  let fixture: ComponentFixture<WholeAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WholeAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WholeAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
