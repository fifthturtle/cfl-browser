import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CflPlayerComponent } from './cfl-player.component';

describe('CflPlayerComponent', () => {
  let component: CflPlayerComponent;
  let fixture: ComponentFixture<CflPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CflPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CflPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
