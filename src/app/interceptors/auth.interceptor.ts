import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';

// export class AuthInterceptor implements HttpInterceptor {

//   constructor() {}
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {

//     console.log('Interceptor invocado!', req);

//     const token = localStorage.getItem('token');

//     if (token) {
//       const cloned = req.clone({
//         headers: req.headers.set('Authorization', `Bearer ${token}`),
//       });

//       return next.handle(cloned);
//     }
//     return next.handle(req);
//   }
// }

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  
    console.log('Interceptor invocado!', req);

    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });

      return next(cloned);
    }
    return next(req);
  }
