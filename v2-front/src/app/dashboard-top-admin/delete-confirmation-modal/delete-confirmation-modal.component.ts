
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css']
})
export class DeleteConfirmationModalComponent {
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  closeModal(): void {
    this.cancelled.emit();
  }

  acceptModal(): void {
    this.confirmed.emit();
  }

}
