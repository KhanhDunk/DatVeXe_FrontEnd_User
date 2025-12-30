import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../Service/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  if (!token || !req.url.startsWith('http')) {
    return next(req);
  }

  if (req.headers.has('Authorization')) {
    return next(req);
  }

  const authorizedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authorizedRequest).pipe(
    catchError((error) => {
      if (error?.status === 401 || error?.status === 403) {
        const message = error?.error?.message || 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
        auth.forceLogout(message);
      }
      return throwError(() => error);
    })
  );
};
