import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from 'src/app/shared/models/organisation.model';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.model';
import { OrganizationService } from 'src/app/shared/services/organisation.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-update-organization',
  templateUrl: './update-organisation.component.html',
  styleUrls: ['./update-organisation.component.css']
})
export class UpdateOrganizationComponent implements OnInit {
  organizationId: string = '';
  organization: Organization = new Organization('', '', '', new Date(), new User('', '', ''), [], [], '');

  adminUsers: User[] = [];
  selectedAdminUserId: string = '';

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
   private router : Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.organizationId = params['id'];
      this.loadOrganizationData();
      this.loadAdminUsers();
    });
  }

  loadOrganizationData(): void {
    this.organizationService.getOrganization(this.organizationId)
      .subscribe(
        (org: Organization) => {
          this.organization = org;
        },
        error => {
          console.error('Error loading organization data:', error);
          // Gérez l'erreur, affichez un message d'erreur
        }
      );
  }

  loadAdminUsers(): void {
    this.userService.getUsersByRole(Role.ORG_ADMIN)
      .subscribe(
        (adminUsers: User[]) => {
          this.adminUsers = adminUsers;
        },
        error => {
          console.error('Error loading admin users:', error);
          // Gérez l'erreur, affichez un message d'erreur
        }
      );
  }

  updateOrganization(): void {
    if (!this.selectedAdminUserId) {
      console.error('Please select an admin user.');
      return;
    }

    // Mettez à jour les détails de l'organisation avec les données du formulaire
    this.organizationService.updateOrganization(this.organizationId, this.selectedAdminUserId, this.organization)
      .subscribe(
        (response: Organization) => {
          console.log('Organization updated:', response);
          this.router.navigate(['/topAdmin']);
        },
        error => {
          console.error('Error updating organization:', error);
          // Gérez l'erreur, affichez un message d'erreur
        }
      );
  }

}
