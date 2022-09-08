import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CflDraftComponent } from './cfl-draft.component';

describe('CflDraftComponent', () => {
  let component: CflDraftComponent;
  let fixture: ComponentFixture<CflDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CflDraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CflDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
