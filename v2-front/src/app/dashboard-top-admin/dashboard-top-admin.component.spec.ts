import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopAdminComponent } from './dashboard-top-admin.component';

describe('DashboardTopAdminComponent', () => {
  let component: DashboardTopAdminComponent;
  let fixture: ComponentFixture<DashboardTopAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardTopAdminComponent]
    });
    fixture = TestBed.createComponent(DashboardTopAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
