import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, Observable, throwError, catchError, of } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse } from '../interfaces';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null); //
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token: string): boolean {

    console.log('setAuthentication', user, token);

    this._currentUser.set(user); //
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('roles', JSON.stringify(user.roles));

    return true;
  }

  //Implementación de la función login
  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/api/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError((err) => throwError(() => err.error.message))
    );
  }
  register(name: string, email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/api/auth/register`;
    const body = { name, email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap(({ user, token }) => this.setAuthentication(user, token)),
      map(() => true),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/api/auth/check-status`;
    const token = localStorage.getItem('token');

    console.log('checkAuthStatus', token);
    
    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      
      catchError(() => {
        this._authStatus.set(AuthStatus.unauthenticated);
        console.log(url);
        return of(false);
      })
    );
  }

  //Verifica si usr es admin
  isAdmin(): boolean {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]'); //extrae el array de roles
    return roles.includes('admin');
  }
  


  logout(): void {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.unauthenticated);
  }
}
