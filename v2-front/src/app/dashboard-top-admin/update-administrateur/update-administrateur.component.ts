import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-update-administrateur',
  templateUrl: './update-administrateur.component.html',
  styleUrls: ['./update-administrateur.component.css']
})
export class UpdateAdministrateurComponent implements OnInit {
  user: User = {
    id : '',
    name: '',
    email: '',
    position: '',
    password: '',
    role: Role.ORG_ADMIN,
    active: true,

  };
  profileImage: File | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    console.log(userId)
    this.userService.getUser(userId).subscribe(
      (user) => {
        this.user = user;
        console.log(user)
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      }
    );
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.user.name);
    formData.append('email', this.user.email);
    if (this.user.password)
    formData.append('password', this.user.password);
    if (this.user.position)
    formData.append('position', this.user.position);
    if (this.profileImage) {
      formData.append('profileImage', this.profileImage);
    }
    const userId = this.route.snapshot.params['id'];
    this.userService.updateUserWithImageAndPermissions(this.user.id, formData)
    .subscribe(response => {
      console.log('User updated:', response);
      this.router.navigate(['/topAdmin/admins']);
    }, error => {
      console.error('Error updating user:', error);

    });

  }
  handleImageInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profileImage = input.files[0];
    } else {
      this.profileImage = null;
    }
  }
}
