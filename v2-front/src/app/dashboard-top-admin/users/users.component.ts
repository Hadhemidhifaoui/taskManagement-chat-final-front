import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsersByRole(Role.USER);
  }

  loadUsersByRole(role: Role): void {
    this.userService.getUsersByRole(role).subscribe(
      users => {
        this.users = users;
        console.log(users)
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }
}
