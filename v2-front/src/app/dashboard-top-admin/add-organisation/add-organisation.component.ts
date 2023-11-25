import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Organization } from 'src/app/shared/models/organisation.model';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.model';
import { OrganizationService } from 'src/app/shared/services/organisation.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.css']
})
export class AddOrganisationComponent {
  newOrganization: Organization = new Organization('','','', new Date(),new User('','',''),[],[],'');
  adminUsers: any[] = [];
  selectedAdminUserId: string = '';

  constructor(private organizationService: OrganizationService,  private userService: UserService , private router : Router) {}

  ngOnInit(): void {

    this.loadAdminUsers();

  }
  loadAdminUsers(): void {
    this.userService.getUsersByRole(Role.ORG_ADMIN)
      .subscribe(
        (adminUsers: any) => {
          this.adminUsers = adminUsers;
        },
        error => {
          console.error('Error loading admin users:', error);
        }
      );
  }
  addOrganization(): void {
    if (!this.selectedAdminUserId) {
      console.error('Please select an admin user.');
      return;
    }

    this.organizationService.createOrganization(this.newOrganization, this.selectedAdminUserId).subscribe(
      (response) => {
        console.log('Organization created:', response);
        this.router.navigate(['/topAdmin']);
      },
      (error) => {
        console.error('Error creating organization:', error);
        // Display an error message to the user
      }
    );
  }
}
