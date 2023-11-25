import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationTakModalComponent } from './delete-confirmation-tak-modal.component';

describe('DeleteConfirmationTakModalComponent', () => {
  let component: DeleteConfirmationTakModalComponent;
  let fixture: ComponentFixture<DeleteConfirmationTakModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmationTakModalComponent]
    });
    fixture = TestBed.createComponent(DeleteConfirmationTakModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
