import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-details-permissions',
  templateUrl: './details-permissions.component.html',
  styleUrls: ['./details-permissions.component.css']
})
export class DetailsPermissionsComponent implements OnInit{
  selectedUser: User | undefined;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      this.userService.getUser(userId).subscribe((user) => {
        this.selectedUser = user;
      });
    });
  }
}
