import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../Interface/response-model';
import { UserProfile, UserProfileUpdatePayload } from '../Interface/profile.interface';
import { environment } from '../environment';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly baseUrl = `${environment.apiUrl}/Profile`;

  constructor(private readonly http: HttpClient) {}

  getProfile(): Observable<ResponseDTO<UserProfile>> {
    return this.http.get<ResponseDTO<UserProfile>>(`${this.baseUrl}/me`);
  }

  updateProfile(payload: UserProfileUpdatePayload): Observable<ResponseDTO<UserProfile>> {
    return this.http.put<ResponseDTO<UserProfile>>(`${this.baseUrl}/me`, payload);
  }
}
