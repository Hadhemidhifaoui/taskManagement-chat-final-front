import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationorgModalComponent } from './delete-confirmationorg-modal.component';

describe('DeleteConfirmationorgModalComponent', () => {
  let component: DeleteConfirmationorgModalComponent;
  let fixture: ComponentFixture<DeleteConfirmationorgModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmationorgModalComponent]
    });
    fixture = TestBed.createComponent(DeleteConfirmationorgModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
