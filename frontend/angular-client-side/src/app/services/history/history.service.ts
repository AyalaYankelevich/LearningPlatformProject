import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = 'http://localhost:5059/api/prompt/id';

  constructor(private http: HttpClient) {}

  getUserPrompts(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  deletePrompt(promptId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Use correct REST endpoint for deleting a single prompt
    // Adjust your apiUrl if necessary (see note below)
    return this.http.delete(`${this.apiUrl.replace('/id', '')}/${promptId}`, { headers });
  }
}