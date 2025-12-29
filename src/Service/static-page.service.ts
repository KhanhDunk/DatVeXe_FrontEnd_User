import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environment';
import { ResponseDTO } from '../Interface/response-model';
import { StaticPageModel } from '../Interface/static-page.interface';

@Injectable({ providedIn: 'root' })
export class StaticPageService {
  private readonly baseUrl = `${environment.apiUrl}/StaticPage`;

  constructor(private http: HttpClient) {}

  getPublishedPages(): Observable<StaticPageModel[]> {
    return this.http
      .get<ResponseDTO<StaticPageModel[]>>(`${this.baseUrl}/published`)
      .pipe(map((response) => response.data ?? []));
  }

  getPageBySlug(slug: string): Observable<StaticPageModel> {
    return this.http
      .get<ResponseDTO<StaticPageModel>>(`${this.baseUrl}/${slug}`)
      .pipe(
        map((response) => {
          if (!response.success || !response.data) {
            throw new Error(response.message || 'Khong tim thay noi dung');
          }
          return response.data;
        })
      );
  }
}
