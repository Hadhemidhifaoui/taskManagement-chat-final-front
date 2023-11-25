import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
})
export class Header1Component {
  me: string = localStorage.getItem('userId')!
  currentUser$: Observable<User | null> = this.userService.getUser(this.me);
  constructor(private userService: UserService, private http: HttpClient, private sanitizer: DomSanitizer) {
  }
  getProfileImageSafeUrl(base64Image: string | null): SafeUrl | null {
    if (base64Image) {
      const imageUrl = `data:image/jpeg;base64,${base64Image}`;
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }
    return null;
  }
}
