import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role.model';
import { Task } from 'src/app/shared/models/task.model';
import { TaskStatus } from 'src/app/shared/models/taskstatus.model';
import { User } from 'src/app/shared/models/user.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  users: User[] = [];
  selectedAssigneeId: string = ''; // Propriété pour stocker l'ID de l'utilisateur assigné

  newTask = new Task(
    '',
    '',
    '',
    new Date(),
    [],
    new User('', '', ''),
    ''
  );

  constructor(private userService: UserService, private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsersByRoleAndOrganizationId(Role.USER);
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

  onSubmit() {
    this.newTask.status =TaskStatus.TO_DO;
    this.newTask.creationDateTime = new Date();
    this.newTask.assignees = [this.selectedAssigneeId];

    this.taskService.createTask(this.newTask).subscribe(response => {
      this.router.navigate(['/orgadmin/tasks']);
    });
  }
}
