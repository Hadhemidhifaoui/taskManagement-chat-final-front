import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organization } from 'src/app/shared/models/organisation.model';
import { OrganizationService } from 'src/app/shared/services/organisation.service';


@Component({
  selector: 'app-organizations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.css'],
})
export class OrganisationsComponent implements OnInit {
  organizations: Organization[] = [];
  showDeleteModal = false;
  orgToDeleteId: string = '';
  isModalOpen = false;
  constructor(private organizationService: OrganizationService, private router : Router) {}
  navigateToUpdatePage(orgId: string) {
    console.log("hi")
    this.router.navigate(['/topAdmin/organizations/update', orgId]);
  }
  openDeleteModal(userId: string) {
    this.orgToDeleteId = userId;
    this.isModalOpen = true;
  }


  closeDeleteModal() {
    this.isModalOpen = false;
    this.orgToDeleteId = '';
  }

  confirmModal(): void {
    this.deleteOrg();
    this.isModalOpen = false;
  }

  cancelModal(): void {
    this.isModalOpen = false;
  }
  deleteOrg() {
    if (this.orgToDeleteId) {
      this.organizationService.deleteOrganization(this.orgToDeleteId).subscribe(
        () => {
          location.reload();

          this.closeDeleteModal();
        },
        error => {
          console.error('Error deleting organization:', error);
        }
      );
    }
  }



  cancelDelete() {
    this.showDeleteModal = false;
  }
  ngOnInit(): void {
    this.organizationService.getAllOrganizations().subscribe(
      (data) => {
        this.organizations = data;
        console.log(data[0].id)
      },
      (error) => {
        console.error('Error fetching organizations:', error);
      }
    );
  }
}
