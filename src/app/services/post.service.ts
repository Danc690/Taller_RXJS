import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  buscarPostsPorUsuarioId(userId: number): Observable<{ posts: PostModel[] }> {
    const url = `https://dummyjson.com/posts/user/${userId}`;
    return this.http.get<{ posts: PostModel[] }>(url);
  }
}
