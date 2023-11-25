import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-sidebar1',
  templateUrl: './sidebar1.component.html',
  styleUrls: ['./sidebar1.component.css']
})
export class Sidebar1Component {
   name = localStorage.getItem('name')!
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
