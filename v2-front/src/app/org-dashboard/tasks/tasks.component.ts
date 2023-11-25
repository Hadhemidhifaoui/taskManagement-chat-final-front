import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role.model';
import { Task } from 'src/app/shared/models/task.model';
import { TaskStatusColors } from 'src/app/shared/models/taskcolors.model';
import { TaskStatus } from 'src/app/shared/models/taskstatus.model';
import { User } from 'src/app/shared/models/user.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task[] = [];
  users : User [] = [];
  showDeleteModal = false;
  taskToDeleteId: string = '';
  isModalOpen = false;

  constructor(private userService: UserService,private taskService: TaskService, private router : Router) {}

  ngOnInit(): void {
    this.loadUsersByRoleAndOrganizationId(Role.USER);
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
      console.log(tasks)
    });
  }
  getTaskStatusClass(status: TaskStatus): string {
    return TaskStatusColors[status];
  }
  getStatusTranslation(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.TO_DO:
        return 'À faire';
      case TaskStatus.IN_PROGRESS:
        return 'En cours';
      case TaskStatus.DONE:
        return 'Terminé';
      case TaskStatus.BLOCKED:
        return 'Bloqué';
      default:
        return status; // Retourne la valeur d'origine si aucune correspondance n'est trouvée
    }
  }

  loadUsersByRoleAndOrganizationId(role: Role): void {
    const organizationId = localStorage.getItem('organizationId');
    //const organizationId = '64dc831902369a61e40fb11d'
    if (organizationId) {
      this.userService.getUsersByRoleAndOrganization(role, organizationId).subscribe(
        users => {
          this.users = users;
          console.log(users);
        },
        error => {
          console.error('Error loading users:', error);
        }
      );
    }
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

  getUserNameById(userId: string): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  }
  getUserEmailById(userId: string): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.email : 'Unknown Email';
  }

  getPhoto(userId: string): string {
    const user = this.users.find(u => u.id === userId);
    return user && user.profileImage ? user.profileImage : '';
  }





  navigateToUpdatePage(id: string) {
    console.log('Navigating to update page with ID:', id);
    this.router.navigate(['/orgadmin/tasks/update', id]);
  }

}
