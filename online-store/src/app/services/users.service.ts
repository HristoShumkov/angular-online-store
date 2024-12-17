import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/environment';
import { User } from '../types/user';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private user$$ = new BehaviorSubject<User | null>(null);
  private user$ = this.user$$.asObservable();

  user: User | null = null;
  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    const { BASE_URL } = environment;
    let url = `${BASE_URL}/users/login`;
    return this.http.post<User>(url, {email, password}).pipe(tap((user) => this.user$$.next(user)));;
  }

  register(
    email: string,
    username: string,
    password: string,
    profilePic: string
  ) {
    const { BASE_URL } = environment;
    let url = `${BASE_URL}/users/register`;
    return this.http.post<User>(url, {email, username, password, profilePic}).pipe(tap((user) => this.user$$.next(user)));;
  }
}
