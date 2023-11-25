import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    baseUrl = 'http://localhost:8081/api/v1/auth';
    private readonly TOKEN_KEY = 'token';
    private currentUserId: string = '';
  constructor(private http: HttpClient) { }

  setCurrentUserId(userId: string) {
    this.currentUserId = userId;
  }

  getCurrentUserId(): string {
    return this.currentUserId;
  }


  login(email: string, password: string): Observable<any> {
    const data = { email, password };
    return this.http.post(`${this.baseUrl}/authenticate`, data);

  }

  register(name: string, email: string, password: string, position: string, profileImage: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('position', position);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    return this.http.post(`${this.baseUrl}/register`, formData);
  }





}
