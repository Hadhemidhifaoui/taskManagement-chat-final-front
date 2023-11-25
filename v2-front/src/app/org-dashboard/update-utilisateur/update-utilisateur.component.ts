import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-update-utilisateur',
  templateUrl: './update-utilisateur.component.html',
  styleUrls: ['./update-utilisateur.component.css']
})
export class UpdateUtilisateurComponent implements OnInit {
  permissions: string[] = [
    'Modifier le titre d une tâche',
    'Modifier la description d une tâche',
    'Modifier la date de fin d une tâche',
    'Modifier la priorité d une tâche'
  ];
  selectedPermissions: string[] = [];
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
    permissions: []
  };
  selectedImage: File | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUser(userId).subscribe(
      (user) => {
        this.user = user;
        this.selectedPermissions = user.permissions || []; // Initialize with empty array if permissions are undefined
        this.user.ajouteTask = user.ajouteTask;
        console.log(this.user.ajouteTask)
        this.user.supprimeTask = user.supprimeTask;
        console.log(this.user.supprimeTask)
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      }
    );
  }

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
    const userId = this.route.snapshot.params['id'];
    const formData = new FormData();
    formData.append('name', this.user.name);
    formData.append('email', this.user.email);
    if (this.user.password) {
      formData.append('password', this.user.password);
    }
    if (this.user.position) {
      formData.append('position', this.user.position);
    }
    if (this.selectedImage) {
      formData.append('profileImage', this.selectedImage);
    }
    formData.append('permissions', this.selectedPermissions.join(','));
    if (this.user.ajouteTask)
    formData.append('ajouteTask', this.user.ajouteTask.toString());
    if (this.user.supprimeTask)
  formData.append('supprimeTask', this.user.supprimeTask.toString());
    this.userService.updateUserWithImageAndPermissions(userId, formData).subscribe(
      updatedUser => {
        console.log('User updated:', updatedUser);
        this.user.profileImage = undefined;
        this.router.navigate(['/orgadmin']);
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }

}
