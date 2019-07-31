import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const response$ = next.handle(request);

    return response$.pipe(
      tap( term => console.log('Hi ich bims ein HttpInterceptor! :)') )
      // HTTP-Response verarbeiten

    );
  }
}
