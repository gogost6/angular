import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IUser } from '../shared/interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<IUser>

  get isLogged(): boolean {
    return localStorage.getItem('user') !== null ? true : false;
  }

  get userData(): any | null {
    return localStorage.getItem('user');
  }

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.userSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('user') || "{}"));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): IUser {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<IUser>(`${environment.apiUrl}/user/login`, { username, password }, { withCredentials: true })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }))
      .subscribe(
        (response) => {
          this.router.navigate(['/']);
        },
        (error) => console.log(error)
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    this.http.get<any>(`${environment.apiUrl}/user/logout`, { withCredentials: true })
      .subscribe(
        (error) => console.log(error)
      );
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  register(userData: IUser) {
    return this.http.post(`${environment.apiUrl}/user/register`, userData, { withCredentials: true })
      .pipe(
        map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        }))
      .subscribe(
        (response) => {
          this.router.navigate(['/home']);
        },
        (error) => console.log(error)
      );
  }
}
