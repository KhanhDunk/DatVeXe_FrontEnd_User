import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../Interface/login-interface';
import { ResponseDTO } from '../Interface/response-model';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}


  login(data: LoginRequest): Observable<ResponseDTO<string>> {
    return this.http.post<ResponseDTO<string>>(
      `${this.apiUrl}/login`,
      data
    ).pipe(
      tap(res => {
        if (res.success && res.data) {
          localStorage.setItem('token', res.data);
        }
      })
    );
  }

  // 📝 REGISTER
  register(data: any): Observable<ResponseDTO<any>> {
    return this.http.post<ResponseDTO<any>>(
      `${this.apiUrl}/register`,
      data
    );
  }

  // 🔓 LOGOUT
  logout(): void {
    localStorage.removeItem('token');
  }

  // 🔑 GET TOKEN
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ CHECK LOGIN
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
