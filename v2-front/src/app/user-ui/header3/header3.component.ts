import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header3',
  templateUrl: './header3.component.html',
  styleUrls: ['./header3.component.css']
})
export class Header3Component {
  me: string = localStorage.getItem('userId')!
  currentUser$: Observable<User | null> = this.userService.getUser(this.me);


  constructor(private sanitizer: DomSanitizer, private tokenService: TokenService, private router: Router, private userService: UserService, private http: HttpClient) {}
  getProfileImageSafeUrl(base64Image: string | null): SafeUrl | null {
    if (base64Image) {
      const imageUrl = `data:image/jpeg;base64,${base64Image}`;
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('organizationId');
    localStorage.removeItem('name');
    this.tokenService.removeToken();
    this.router.navigate(['']);
  }
}
