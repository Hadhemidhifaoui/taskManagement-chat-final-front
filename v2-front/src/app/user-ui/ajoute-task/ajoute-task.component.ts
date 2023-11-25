import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/shared/models/task.model';
import { TaskStatus } from 'src/app/shared/models/taskstatus.model';
import { User } from 'src/app/shared/models/user.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-ajoute-task',
  templateUrl: './ajoute-task.component.html',
  styleUrls: ['./ajoute-task.component.css']
})
export class AjouteTaskComponent {
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

  }


  onSubmit() {
    const userId = localStorage.getItem('userId')!;
    this.newTask.status =TaskStatus.TO_DO;
    this.newTask.creationDateTime = new Date();
    this.newTask.assignees = [userId];

    this.taskService.createTask(this.newTask).subscribe(response => {
      this.router.navigate(['/ui']);
    });
  }
}
