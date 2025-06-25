import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private apiUrl = 'http://localhost:5059/api/gpt/send-question/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  generatePrompt(message: string, topic: string, subTopic: string): Observable<any> {
  const body = { message, topic, subTopic };
  return this.http.post(`${this.apiUrl}`, body, { headers: this.getHeaders() });
}

savePrompt(prompt: string, response: string, topicId: string, sub_topicId: string) {
  return this.http.post('http://localhost:5059/api/prompt/', {
    topicId,
    sub_topicId,
    prompt,
    response
  }, { headers: this.getHeaders() });
}
}