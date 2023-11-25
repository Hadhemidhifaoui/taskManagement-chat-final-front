import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-tak-modal',
  templateUrl: './delete-confirmation-tak-modal.component.html',
  styleUrls: ['./delete-confirmation-tak-modal.component.css']
})
export class DeleteConfirmationTakModalComponent {
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  closeModal(): void {
    this.cancelled.emit();
  }

  acceptModal(): void {
    this.confirmed.emit();
  }
}
