import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role.model';
import { Task } from 'src/app/shared/models/task.model';
import { TaskStatus } from 'src/app/shared/models/taskstatus.model';
import { User } from 'src/app/shared/models/user.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  taskId: string = '' ;
  users: User[] =[];
  updatedTask: Task = new Task(
    '',
    '',
    '',
    new Date(),
    [],
    new User('', '', ''),
    '',

  );

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const taskIdParam = params.get('id');
      if (taskIdParam) {
        this.taskId = taskIdParam;
        this.loadTask();
      } else {
        console.error("Task ID parameter not found.");
      }
    });

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
  loadTask() {
    this.taskService.getTask(this.taskId).subscribe(task => {
      this.updatedTask = task;
    });
  }

  onUpdate() {
    this.taskService.updateTask(this.taskId, this.updatedTask).subscribe(response => {
      this.router.navigate(['/orgadmin/tasks']);
    });
  }
}
