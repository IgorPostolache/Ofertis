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
    return this.http.post<User>(url, user, httpOptions);
  }
  register(user: User): Observable<User> {
    const url = AUTH_API + 'register';
    return this.http.post<User>(url, user, httpOptions);
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
    return this.http.get(PROFILE_API + "all");
  }
  getUserProfile(): Observable<any> {
    return this.http.get(PROFILE_API + "user");
  }
  getUserVipProfile(): Observable<any> {
    return this.http.get(PROFILE_API + "user_vip");
  }
  getUserModeratorProfile(): Observable<any> {
    return this.http.get(PROFILE_API + "user_moderator");
  }
  getUserAdminProfile(): Observable<any> {
    return this.http.get(PROFILE_API + "user_admin");
  }
}
