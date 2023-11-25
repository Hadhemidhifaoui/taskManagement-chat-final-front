import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/shared/models/task.model';
import { User } from 'src/app/shared/models/user.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  loggedInUser!: User ;
  taskId!: string;
  editedTask: Task = new Task(   '',
  '',
  '',
  new Date(),
  [],
  new User('', '', ''),
  '');
  constructor(private userService: UserService, private taskService: TaskService ,private route: ActivatedRoute , private router : Router) {}
  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUser(userId).subscribe(user => {
        this.loggedInUser = user;
        console.log('Logged in user:', this.loggedInUser); // Log the loggedInUser

        // Move the code to fetch task here
        this.route.paramMap.subscribe(params => {
          this.taskId = params.get('id')!;
          this.taskService.getTask(this.taskId).subscribe(task => {
            this.editedTask = task;
          });
        });
      });
    }
  }

  canEditTitle(): boolean {
    const result = this.hasPermission("Modifier le titre d une tâche");
    console.log("canEditTitle:", result);
    return result;
  }


  canEditDescription(): boolean {
    const canEdit = this.hasPermission("Modifier la description d une tâche");
    console.log('Can Edit Description:', canEdit);
    return canEdit;
  }

  canEditDueDate(): boolean {
    const datePermission = "Modifier la date de fin d une tâche";
    return this.hasPermission(datePermission);
  }

  canEditPriority(): boolean {
    const priorityPermission = "Modifier la priorité d une tâche";
    return this.hasPermission(priorityPermission);
  }



  private hasPermission(permission: string): boolean {
    if (!this.loggedInUser) {
      return false;
    }

    let userPermissions: string[] = [];

    if (typeof this.loggedInUser.permissions === 'string') {
      userPermissions = JSON.parse(this.loggedInUser.permissions);
    } else if (Array.isArray(this.loggedInUser.permissions)) {
      userPermissions = this.loggedInUser.permissions;
    }

    const hasPermission = userPermissions.includes(permission);
    console.log(`User has "${permission}" permission: ${hasPermission}`);
    return hasPermission;
  }





editTask() {
  console.log(this.taskId)
  this.taskService.updateTask(this.taskId, this.editedTask).subscribe(updatedTask => {

    console.log('Task updated successfully:', updatedTask);
    this.router.navigate(['/ui/list']);
  }, error => {
    // Handle error, e.g., show an error message
    console.error('Error updating task:', error);
  });
}

}
