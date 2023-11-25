import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationOrgModalComponent } from './delete-confirmation-org-modal.component';

describe('DeleteConfirmationOrgModalComponent', () => {
  let component: DeleteConfirmationOrgModalComponent;
  let fixture: ComponentFixture<DeleteConfirmationOrgModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmationOrgModalComponent]
    });
    fixture = TestBed.createComponent(DeleteConfirmationOrgModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
