import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.css']
})
export class Sidebar2Component {
  constructor(private tokenService: TokenService, private router: Router) {}
  logout(): void {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('organizationId');
    localStorage.removeItem('name');
    this.tokenService.removeToken();
    this.router.navigate(['']);
  }
}
