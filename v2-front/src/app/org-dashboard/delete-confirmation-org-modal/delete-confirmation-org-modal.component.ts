import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-org-modal',
  templateUrl: './delete-confirmation-org-modal.component.html',
  styleUrls: ['./delete-confirmation-org-modal.component.css']
})
export class DeleteConfirmationOrgModalComponent {
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  closeModal(): void {
    this.cancelled.emit();
  }

  acceptModal(): void {
    this.confirmed.emit();
  }

}
