import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Organization } from '../models/organisation.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private baseUrl = 'http://localhost:8081/organizations';

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(`${this.baseUrl}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  createOrganization(organization: Organization, adminUserId: string): Observable<Organization> {
    return this.http.post<Organization>(this.baseUrl + '?adminUserId=' + adminUserId, organization);
  }

  getOrganization(orgId: string): Observable<Organization> {
    return this.http.get<Organization>(`${this.baseUrl}/${orgId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  updateOrganization(orgId: string, adminUserId: string, organization: Organization): Observable<Organization> {
    const url = `${this.baseUrl}/${orgId}?adminUserId=${adminUserId}`;
    return this.http.put<Organization>(url, organization);
  }

  deleteOrganization(orgId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${orgId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('An error occurred:', error.error.message);
    } else {
      // Erreur côté serveur
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
