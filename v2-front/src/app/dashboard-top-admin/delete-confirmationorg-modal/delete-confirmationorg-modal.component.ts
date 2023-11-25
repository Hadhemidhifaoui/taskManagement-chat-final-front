import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmationorg-modal',
  templateUrl: './delete-confirmationorg-modal.component.html',
  styleUrls: ['./delete-confirmationorg-modal.component.css']
})
export class DeleteConfirmationorgModalComponent {
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  closeModal(): void {
    this.cancelled.emit();
  }

  acceptModal(): void {
    this.confirmed.emit();
  }

}
