import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest } from '../Interface/login-interface';
import { RegisterRequest } from '../Interface/register-interface';
import { ForgotPasswordRequest } from '../Interface/forgot-password-interface';
import { ResetPasswordRequest } from '../Interface/reset-password-interface';
import { ResponseDTO } from '../Interface/response-model';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/Auth`;
  private currentUserSubject = new BehaviorSubject<string | null>(this.getStoredUsername());
  readonly authState$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}


  login(data: LoginRequest): Observable<ResponseDTO<string>> {
    return this.http.post<ResponseDTO<string>>(
      `${this.apiUrl}/login`,
      data
    ).pipe(
      tap(res => {
        if (res.success && res.data) {
          this.setSession(res.data, data.username);
        }
      })
    );
  }

  // 📝 REGISTER
  register(data: RegisterRequest): Observable<ResponseDTO<any>> {
    return this.http.post<ResponseDTO<any>>(
      `${this.apiUrl}/register`,
      data
    );
  }

  forgotPassword(payload: ForgotPasswordRequest): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/forgot-password`,
      payload,
      { responseType: 'text' as 'json' }
    );
  }

  resetPassword(payload: ResetPasswordRequest): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/reset-password`,
      payload,
      { responseType: 'text' as 'json' }
    );
  }

  // 🔓 LOGOUT
  logout(): void {
    this.clearSession();
  }

  // 🔑 GET TOKEN
  getToken(): string | null {
    if (!this.isBrowser()) {
      return null;
    }
    return localStorage.getItem('token');
  }

  getCurrentUser(): string | null {
    return this.currentUserSubject.value;
  }

  // ✅ CHECK LOGIN
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private setSession(token: string, username: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    }
    this.currentUserSubject.next(username);
  }

  private clearSession(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
    this.currentUserSubject.next(null);
  }

  private getStoredUsername(): string | null {
    if (!this.isBrowser()) {
      return null;
    }
    return localStorage.getItem('username');
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
