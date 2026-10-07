import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  buscarUsuarioPorUsername(username: string): Observable<{ users: UserModel[] }> {
    const url = `https://dummyjson.com/users/filter?key=username&value=${username}`;
    return this.http.get<{ users: UserModel[] }>(url);
  }
}
