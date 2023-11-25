import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent {
  users: any[] = [];
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    // Récupérez la liste des utilisateurs depuis le service
    this.userService.getUsersByRole(Role.USER).subscribe(users => {
      this.users = users;
    });
  }
  navigateToChat(recipientId: number) {
    this.router.navigate(['/ui/chat', recipientId]);
  }
}
