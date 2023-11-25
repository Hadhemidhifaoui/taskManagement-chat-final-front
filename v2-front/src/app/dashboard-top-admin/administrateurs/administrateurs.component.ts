import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.model';
import { OrganizationService } from 'src/app/shared/services/organisation.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-administrateurs',
  templateUrl: './administrateurs.component.html',
  styleUrls: ['./administrateurs.component.css']
})
export class AdministrateursComponent {
  users: User[] = [];
  showDeleteModal = false;
  userToDeleteId: string = '';
  isModalOpen = false;
  constructor(private userService: UserService, private router : Router , private organizationService: OrganizationService ) {}

  openDeleteModal(userId: string) {
    this.userToDeleteId = userId;
    this.isModalOpen = true;
  }


  closeDeleteModal() {
    this.isModalOpen = false;
    this.userToDeleteId = '';
  }

  confirmModal(): void {
    this.deleteUser();
    this.isModalOpen = false;
  }

  cancelModal(): void {
    this.isModalOpen = false;
  }
  ngOnInit(): void {
    this.loadUsersByRole(Role.ORG_ADMIN);
  }
  deleteUser() {
    if (this.userToDeleteId) {
      this.userService.deleteUser(this.userToDeleteId).subscribe(
        () => {
          location.reload();

          this.closeDeleteModal();
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  fetchOrganizationNames(): void {
    // Iterate through users and fetch organization names by organizationId
    this.users.forEach(user => {
      if (user.organizationId) {
        this.organizationService.getOrganization(user.organizationId).subscribe(
          (organization: any) => {
            user.organization = organization.name;
          },
          error => {
            console.error(`Error fetching organization for user ${user.name}:`, error);
          }
        );
      }
    });
  }

  cancelDelete() {
    this.showDeleteModal = false;
  }


  navigateToUpdatePage(id: string) {
    console.log('Navigating to update page with ID:', id);
    this.router.navigate(['/topAdmin/admins/update', id]);
  }
  loadUsersByRole(role: Role): void {
    this.userService.getUsersByRole(role).subscribe(
      users => {
        this.users = users;
        this.fetchOrganizationNames();
        console.log(users)
        console.log(this.users[0].id)
        console.log(users[0].password)
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }

}
