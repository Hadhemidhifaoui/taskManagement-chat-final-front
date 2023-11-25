import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPermissionsComponent } from './details-permissions.component';

describe('DetailsPermissionsComponent', () => {
  let component: DetailsPermissionsComponent;
  let fixture: ComponentFixture<DetailsPermissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsPermissionsComponent]
    });
    fixture = TestBed.createComponent(DetailsPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
