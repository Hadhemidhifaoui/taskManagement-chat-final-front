import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8081/users';


  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, user);
  }

  createUserWithImage(user: FormData): Observable<User> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<User>(this.baseUrl, user, { headers });
  }

  createAdminWithImage(user: FormData): Observable<User> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<User>(`${this.baseUrl}/admin`, user, { headers });
  }

  getUsersByRole(role: Role): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/by-role?role=${role}`);
  }
  getUsersByRoleAndOrganization(role: Role, organizationId: string): Observable<User[]> {
    const url = `${this.baseUrl}/by-role-and-organization?role=${role}&organizationId=${organizationId}`;
    return this.http.get<User[]>(url);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`);
  }

  updateUser(userId: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${userId}`, user);
  }
  updateUserWithImageAndPermissions(userId: string, formData: FormData): Observable<User> {
    const headers = new HttpHeaders();
    // Définir le type de contenu comme multipart/form-data
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.put<User>(`${this.baseUrl}/${userId}`, formData, { headers });
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);
  }
  // updateUserStatus(userId: string, newStatus: boolean): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/${userId}/status`, { validated: newStatus });
  // }
  updateUserStatusAndAssignOrganization(userId: string, request: any): Observable<any> {
    const url = `${this.baseUrl}/${userId}/status-and-organization`;
    return this.http.put(url, request);
  }


}
