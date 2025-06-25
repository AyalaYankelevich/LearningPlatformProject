// auth.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5059/api/auth';

  constructor(private http: HttpClient) { }

  register(firstName: string, lastName: string, id: string, email: string, password: string): Observable<any> {
    const userData = { firstName, lastName, id, email, password };
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
