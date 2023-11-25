import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-add-administrateur',
  templateUrl: './add-administrateur.component.html',
  styleUrls: ['./add-administrateur.component.css']
})
export class AddAdministrateurComponent {
  user: User = {
    id: '',
    name: '',
    email: '',
    role: Role.ORG_ADMIN,
    password: '',
    creationDate: new Date(),
    position: '',
    active: true,
    validated: true,
    profileImage: undefined
  };
  selectedImage: File | undefined;

  constructor(private userService: UserService, private router: Router,  private sanitizer: DomSanitizer) {}

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
    if (this.user.password) {
      formData.append('password', this.user.password);
    }
    if (this.user.position) {
    formData.append('position', this.user.position);}
    if (this.selectedImage) {
      formData.append('profileImage', this.selectedImage);
    }

    this.userService.createAdminWithImage(formData).subscribe(
      (createdUser) => {
        console.log('Utilisateur ajouté :', createdUser);
        this.user = {
          id: '',
          name: '',
          email: '',
          role: Role.ORG_ADMIN,
          password: '',
          creationDate: new Date(),
          position: '',
          active: true,
          validated: true,
          profileImage: undefined
        };
        this.router.navigate(['/topAdmin/admins']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
      }
    );
  }
}
