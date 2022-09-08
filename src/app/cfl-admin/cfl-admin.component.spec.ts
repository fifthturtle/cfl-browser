import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CflAdminComponent } from './cfl-admin.component';

describe('CflAdminComponent', () => {
  let component: CflAdminComponent;
  let fixture: ComponentFixture<CflAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CflAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CflAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
