import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = 'http://localhost:5059/api/admin';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
    });
  }

  // Add new admin
  createAdmin(adminData: { firstName: string, lastName: string, id: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl, adminData, {
      headers: this.getAuthHeaders(),
    });
  }

// Get all users
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get all prompts
 getAllPrompts(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/prompts`, {
    headers: this.getAuthHeaders(),
  });
}

// Get prompts by userId
getUserPrompts(userId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/userPrompts/${userId}`, {
    headers: this.getAuthHeaders()
  });
}
  
}