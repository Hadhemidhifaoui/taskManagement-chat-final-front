import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrganisationComponent } from './add-organisation.component';

describe('AddOrganisationComponent', () => {
  let component: AddOrganisationComponent;
  let fixture: ComponentFixture<AddOrganisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrganisationComponent]
    });
    fixture = TestBed.createComponent(AddOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
