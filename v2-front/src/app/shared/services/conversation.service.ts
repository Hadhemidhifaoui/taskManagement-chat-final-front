import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conversation } from '../models/conversation.model';


@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private apiUrl = 'http://localhost:8081/api/conversations';

  constructor(private http: HttpClient) { }

  createConversation(): Observable<Conversation> {
    return this.http.post<Conversation>(`${this.apiUrl}`, {});
  }

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(this.apiUrl);
  }
}
