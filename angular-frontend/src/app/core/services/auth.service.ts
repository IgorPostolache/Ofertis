import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user/user';


const AUTH_API = 'http://localhost:8080/api/auth/';
const PROFILE_API = 'http://localhost:8080/api/profile/';
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
    return localStorage.getItem('token');
  }
  deleteJWT(): void {
    localStorage.removeItem('token');
  }
  getUserRole(): string {
    return localStorage.getItem('role')
  }
  getAllProfile(): Observable<any> {
    return this.http.get(PROFILE_API + "all", {responseType: 'text'});
  }
  getUserProfile(): Observable<any> {
    return this.http.get(PROFILE_API + "user", {responseType: 'text'});
  }
  getUserVipProfile(): Observable<any> {
    return this.http.get(PROFILE_API + "user_vip", {responseType: 'text'});
  }
  getUserModeratorProfile(): Observable<any> {
    return this.http.get(PROFILE_API + "user_moderator", {responseType: 'text'});
  }
  getUserAdminProfile(): Observable<any> {
    return this.http.get(PROFILE_API + "user_admin", {responseType: 'text'});
  }
}
