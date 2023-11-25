import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isCheckboxChecked: boolean = false;

  name: string = '';
  email: string = '';
  password: string = '';
  position: string = '';
  confirmPassword: string = ''; // Add this line
  registerForm: FormGroup;
  selectedImage: File | undefined;
  selectedImagePreview: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]], // Add this line
      position: ['', [Validators.required]], // Add this line
      profileImage: [null],
      isCheckboxChecked: [false, [Validators.requiredTrue]]
    });
  }

  handleImageInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    } else {
      this.selectedImage = undefined;
      this.selectedImagePreview = undefined;
    }
  }


  ngOnInit(): void {}

  onCheckboxChange(event: any): void {
    this.isCheckboxChecked = event.target.checked;
  }

  register() {
    const name = this.registerForm.get('name')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const position = this.registerForm.get('position')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (this.registerForm.valid && password === confirmPassword) {
      let profileImage: any;
      if (this.selectedImage) {
        profileImage = this.selectedImage;
      }

      this.authService.register(name, email, password, position, profileImage)
        .subscribe(
          response => {
            this.toastr.success('Inscription réussie !', 'Succès');
            // Rediriger vers la page d'accueil ou une autre page
            this.router.navigate(['']);
          },
          error => {
            this.toastr.error('Erreur lors de l\'inscription', 'Erreur');
            console.error('Erreur lors de l\'inscription:', error);
          }
        );
    } else {
      this.toastr.error('Veuillez vérifier les champs du formulaire', 'Erreur');
    }
  }



}
