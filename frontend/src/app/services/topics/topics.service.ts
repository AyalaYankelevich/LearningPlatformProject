import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TopicsService {
  private apiUrl = 'http://localhost:5059/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /** ------------------------- TOPICS ------------------------- **/

  getTopics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/topics`, { headers: this.getHeaders() });
  }

  getTopicTitleById(topicId: string): Observable<string> {
    return this.http.get<{ title: string }>(`${this.apiUrl}/topics/${topicId}`, { headers: this.getHeaders() })
      .pipe(map(res => res.title));
  }

  getTopicById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/topics/${id}`, { headers: this.getHeaders() });
  }

  /** ------------------------ SUB-TOPICS ------------------------ **/

  getAllSubTopics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sub_topics`, { headers: this.getHeaders() });
  }

  getSubTopicsByTopicId(topicId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sub_topics/topic/${topicId}`, { headers: this.getHeaders() });
  }

  getSubTopicById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sub_topics/${id}`, { headers: this.getHeaders() });
  }

  getSubTopicTitleById(subTopicId: string): Observable<string> {
    return this.http.get<{ title: string }>(`${this.apiUrl}/sub_topics/${subTopicId}`, { headers: this.getHeaders() })
      .pipe(map(res => res.title));
  }

}