import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

import { Task } from 'src/app/shared/models/task.model';
import { TaskStatus } from 'src/app/shared/models/taskstatus.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  assignedTasks: Task[] = [];
  loggedInUser!: User; // Ajoutez une variable pour stocker les informations de l'utilisateur connecté
  users: User[] = [];
  selectedStatus: string = '';
  taskId: string = '';
  newStatus: string = '';
  showDeleteModal = false;
  taskToDeleteId: string = '';
  isModalOpen = false;
  constructor(private userService: UserService,private authService : AuthService, private taskService: TaskService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    //const userId = this.authService.getCurrentUserId();
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUser(userId).subscribe(user => {
        this.loggedInUser = user; // Stockez les informations de l'utilisateur connecté
      });

      this.taskService.getAssignedTasks(userId).subscribe(tasks => {
        this.assignedTasks = tasks;
        console.log(tasks);
      });
    }
  }
  hasPermissions() {
    // Check if the logged-in user has at least one permission
    return this.loggedInUser && this.loggedInUser.permissions && this.loggedInUser.permissions.length > 0;
  }
  editTask(taskId: string) {
    // Redirigez vers la page de modification de la tâche avec l'ID de la tâche
    this.router.navigate(['/ui/list/update', taskId]); // Assurez-vous d'avoir défini la route appropriée dans votre RouterModule
  }
  updateTaskStatus(taskId: string, newStatus: string): void {
    this.taskService.updateTaskStatus(taskId, newStatus).subscribe(
      () => {
        console.log('Task status updated successfully');
        this.showSuccessToast(newStatus);
      },
      error => {
        console.error('Failed to update task status:', error);
        this.showErrorToast();
      }
    );
  }

  private showSuccessToast(status: string): void {
    const toastOptions: Partial<IndividualConfig> = {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'increasing',
      toastClass: `toast-status-${status.toLowerCase()}`
    };

    this.toastr.success(`Task status updated to ${status}`, 'Success', toastOptions);
  }

  private showErrorToast(): void {
    const toastOptions: Partial<IndividualConfig> = {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'increasing',
      toastClass: 'toast-error'
    };

    this.toastr.error('Failed to update task status', 'Error', toastOptions);
  }

  openDeleteModal(taskId: string) {
    this.taskToDeleteId = taskId;
    this.isModalOpen = true;
  }

  // Méthode pour fermer le modal de suppression
  closeDeleteModal() {
    this.isModalOpen = false;
    this.taskToDeleteId = '';
  }

  confirmModal(): void {
    this.deleteTask();
    this.isModalOpen = false;
  }

  cancelModal(): void {
    this.isModalOpen = false;
  }

  deleteTask() {
    if (this.taskToDeleteId) {
      this.taskService.deleteTask(this.taskToDeleteId).subscribe(
        () => {
          console.log("yes")
          location.reload();

          this.closeDeleteModal();
        },
        error => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }



  cancelDelete() {
    this.showDeleteModal = false;
  }

}
