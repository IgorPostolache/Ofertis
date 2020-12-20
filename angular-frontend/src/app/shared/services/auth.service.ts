import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user/user';

const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    const url = AUTH_API + 'login';
    return this.http.post<User>(url,{email: user.email, password: user.password}, httpOptions);
  }
  register(user: User): Observable<User> {
    const url = AUTH_API + 'register';
    return this.http.post<User>(url, {
      name: user.name, username: user.username, email: user.email, password: user.password}, httpOptions);
  }
  getJWT(): string {
    return localStorage.getItem('jwt');
  }
}
