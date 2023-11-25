import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailValidationMessage: string = ''; // Message de validation pour l'email
  passwordValidationMessage: string = '';
  constructor(private authService: AuthService, private tokenService: TokenService,  private router: Router) { }
  validateEmail() {
    if (this.email === '') {
      this.emailValidationMessage = 'L\'Email est obligatoire';
    } else {
      this.emailValidationMessage = ''; // Effacer le message d'erreur
    }
  }

  validatePassword() {
    if (this.password === '') {
      this.passwordValidationMessage = 'Le mot de passe est obligatoire';
    } else {
      this.passwordValidationMessage = ''; // Effacer le message d'erreur
    }
  }

  login(email: string, password: string): void {
    this.authService.login(email, password).subscribe(
      (response) => {
        console.log(response);
        // Stocker le token dans le localStorage
        this.tokenService.setToken(response.token);
        console.log('Logged in successfully.');

        const userRole = response.userRole;
        const userId = response.id;
        const organizationId = response.organizationId; // Supposons que ce champ soit renvoyé par le backend
        const name = response.name;
        console.log(organizationId)
        console.log(userRole);
        console.log(userId);

        // Stoker les informations de l'utilisateur dans le localStorage
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userId', userId);
        localStorage.setItem('name', name);
        localStorage.setItem('organizationId', organizationId); // Stocker l'organizationId


        // Rediriger en fonction du rôle de l'utilisateur
        if (userRole === 'USER') {
          this.router.navigate(['/ui']);
        } else if (userRole === 'ORG_ADMIN') {
          this.router.navigate(['/orgadmin']);
        } else if (userRole === 'SUPER_ADMIN') {
          this.router.navigate(['/topAdmin']);
        }
      },

      error => {
        console.error('Login error:', error);
      }
    );
  }




}
