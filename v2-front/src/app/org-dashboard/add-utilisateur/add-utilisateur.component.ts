import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.model';
import { OrganizationService } from 'src/app/shared/services/organisation.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.css']
})
export class AddUtilisateurComponent implements OnInit {
  permissions: string[] = [
    'Modifier le titre d une tâche',
    'Modifier la description d une tâche',
    'Modifier la date de fin d une tâche',
    'Modifier la priorité d une tâche'
  ];
  selectedPermissions: string[] = []; // Array to store selected permissions
  user: User = {
    id: '',
    name: '',
    email: '',
    role: Role.USER,
    password: '',
    creationDate: new Date(),
    position: '',
    active: true,
    validated: true,
    profileImage: undefined,
    permissions: [] // Permissions array to be sent to the server
  };
  selectedImage: File | undefined;

  constructor(private userService: UserService, private router: Router, private sanitizer: DomSanitizer, private organizationService: OrganizationService) {}

  ngOnInit() {}

  togglePermission(permission: string) {
    if (this.selectedPermissions.includes(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    } else {
      this.selectedPermissions.push(permission);
    }
  }

  handleImageInput(event: any): void {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profileImage = e.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  getSafeUrl(base64Image: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64Image);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.user.name);
    formData.append('email', this.user.email);
    if (this.user.password)
      formData.append('password', this.user.password);
    if (this.user.position)
      formData.append('position', this.user.position);
    if (this.selectedImage)
      formData.append('profileImage', this.selectedImage);
    formData.append('permissions', this.selectedPermissions.join(','));
    if (this.user.ajouteTask) {
      formData.append('ajouteTask', 'true');
    } else {
      formData.append('ajouteTask', 'false');
    }
    if (this.user.supprimeTask) {
      formData.append('supprimeTask', 'true');
    } else {
      formData.append('supprimeTask', 'false');
    }

    const organizationId = localStorage.getItem('organizationId');
    if (organizationId !== null) {
      formData.append('organizationId', organizationId);
    }

    // Fetch the complete organization from the server
    if (organizationId !== null) {
      this.organizationService.getOrganization(organizationId).subscribe(
        (organization) => {
          formData.append('organization', JSON.stringify(organization));

          // Create the user with the assigned organization
          this.userService.createUserWithImage(formData).subscribe(
            (createdUser) => {
              console.log('Utilisateur ajouté :', createdUser);

              this.user = {
                id: '',
                name: '',
                email: '',
                role: Role.USER,
                password: '',
                creationDate: new Date(),
                position: '',
                active: true,
                validated: true,
                profileImage: undefined,
                permissions: [] // Clear permissions array after successful submission
              };
              this.router.navigate(['/orgadmin']);
            },
            (error) => {
              console.error("Erreur lors de l'ajout de l'utilisateur :", error);
            }
          );
        },
        (error) => {
          console.error("Erreur lors de la récupération de l'organisation :", error);
        }
      );
    }
  }


}
