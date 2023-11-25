import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrganisationComponent } from './update-organisation.component';

describe('UpdateOrganisationComponent', () => {
  let component: UpdateOrganisationComponent;
  let fixture: ComponentFixture<UpdateOrganisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateOrganisationComponent]
    });
    fixture = TestBed.createComponent(UpdateOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
