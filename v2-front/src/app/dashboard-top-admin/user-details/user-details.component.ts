import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organization } from 'src/app/shared/models/organisation.model';
import { OrganizationService } from 'src/app/shared/services/organisation.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: string = '';
  userDetails!: User; // Utilisateur complet
  organizations: Organization[] = []; // Remplacez Organization par le nom de votre type d'organisation
  selectedOrganizationId: number | null = null;
  selectedOrganizationControl: FormControl = new FormControl();

  constructor(private route: ActivatedRoute, private userService: UserService, private organizationService : OrganizationService ,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.userService.getUser(this.userId).subscribe(user => {
        this.userDetails = user;
      });
    });
    this.selectedOrganizationControl.setValue(null); // Initialiser la sélection à null
  this.fetchOrganizations();
  }
  fetchOrganizations(): void {

    this.organizationService.getAllOrganizations().subscribe(
      (organizations) => {
        this.organizations = organizations;
      },
      (error: any) => { // Spécifier le type du paramètre 'error'
        console.error('Erreur lors de la récupération des organisations:', error);
      }
    );
  }
  updateStatusAndOrganization(): void {
    if (this.selectedOrganizationControl.value !== null) {
      const updatedUser = {
        ...this.userDetails,
        organizationId: this.selectedOrganizationControl.value,
        validated: !this.userDetails.validated
      };

      this.userService
        .updateUserStatusAndAssignOrganization(this.userDetails.id, updatedUser)
        .subscribe(
          updatedUser => {
            this.userDetails = updatedUser;
            if (updatedUser.validated) {
              this.showToastSuccess('User updated successfully and organization assigned.');
            } else {
              this.showToastSuccess('User updated successfully and organization removed.');
              this.selectedOrganizationControl.setValue(null); // Reset organization selection
            }
          },
          error => {
            console.error('Error updating user:', error);
          }
        );
    }
  }

  private showToastSuccess(message: string): void {
    // Utiliser votre service de notifications pour afficher le toast de succès
    // Par exemple, vous pouvez utiliser ngx-toastr
    this.toastr.success(message, 'Success');
  }






}
