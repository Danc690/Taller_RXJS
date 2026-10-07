import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentModel } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  buscarComentariosPorPostId(postId: number): Observable<{ comments: CommentModel[] }> {
    const url = `https://dummyjson.com/comments/post/${postId}`;
    return this.http.get<{ comments: CommentModel[] }>(url);
  }
}
