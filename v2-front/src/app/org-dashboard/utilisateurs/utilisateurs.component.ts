import { Component, Pipe } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { Organization } from 'src/app/shared/models/organisation.model';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.model';
import { OrganizationService } from 'src/app/shared/services/organisation.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent {
  users: User[] = [];
  organizations: Organization[] = [];
  organizationId?: string;
  showDeleteModal = false;
  userToDeleteId: string = '';
  isModalOpen = false;
  constructor(private userService: UserService, private router : Router, private sanitizer: DomSanitizer, private organizationService: OrganizationService) {}
  openDeleteModal(userId: string) {
    this.userToDeleteId = userId;
    this.isModalOpen = true;
  }



  // Méthode pour fermer le modal de suppression
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
    this.loadUsersByRoleAndOrganizationId(Role.USER);

  }
  deleteUser() {
    if (this.userToDeleteId) {
      this.userService.deleteUser(this.userToDeleteId).subscribe(
        () => {
          console.log("yes")
          location.reload();

          this.closeDeleteModal();
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }



  cancelDelete() {
    this.showDeleteModal = false;
  }


  navigateToUpdatePage(id: string) {
    console.log('Navigating to update page with ID:', id);
    this.router.navigate(['/orgadmin/utilisateur/update', id]);
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

}
