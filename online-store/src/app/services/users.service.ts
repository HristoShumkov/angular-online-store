import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/environment';
import { User } from '../types/user';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private user$$ = new BehaviorSubject<User | null>(this.getUserFromLocalStorage());
  private user$ = this.user$$.asObservable();

  private saveUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private getUserFromLocalStorage() {
    const userJSON = localStorage.getItem('user');
    return userJSON ? JSON.parse(userJSON) : null;
  }

  private saveAccessToken(token: string) {
    localStorage.setItem("token", token);
  }

  getAccessToken() {
    return localStorage.getItem('token') || '';
  }

  isOwner(ownerId: string) {
    return this.user?._id === ownerId;
  }

  user: User | null = this.getUserFromLocalStorage();
  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.saveUserToLocalStorage(user);
      } else {
        localStorage.removeItem("user");
      }
    });
  }


  login(email: string, password: string) {
    let url = `/url/users/login`;
    return this.http.post<User>(url, { email, password }).pipe(tap((user) => {
      this.saveAccessToken(user.accessToken);
      this.user$$.next(user);
    }));;
  }

  register(
    email: string,
    username: string,
    password: string,
    profilePic: string
  ) {
    let url = `/url/users/register`;
    return this.http.post<User>(url, { email, username, password, profilePic })
      .pipe(tap((user) => {
        this.saveAccessToken(user.accessToken);
        this.user$$.next(user);
      }));;
  }

  logout() {
    let url = `/url/users/logout`;
    return this.http.get<User>(url).pipe(tap((user) => {
      localStorage.removeItem("token");
      this.user$$.next(null);
    }));;
  }
}
