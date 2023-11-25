import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8081/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  getAssignedTasks(userId: string): Observable<Task[]> {
    const url = `${this.baseUrl}/assigned?userId=${userId}`;
    return this.http.get<Task[]>(url);
  }
  updateTaskStatus(taskId: string, newStatus: string): Observable<any> {
    const url = `${this.baseUrl}/update-status`;
    const params = {
      taskId: taskId,
      newStatus: newStatus
    };
    return this.http.put(url, null, { params });
  }
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}`, task);
  }

  getTask(taskId: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${taskId}`);
  }

  updateTask(taskId: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${taskId}`, task);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${taskId}`);
  }
}
