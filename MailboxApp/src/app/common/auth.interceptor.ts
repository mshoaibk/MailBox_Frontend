import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionService } from './session.service';
//import { UserContextService } from './user-context.service';
const defaultUser = null
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 public user$: any = new BehaviorSubject(defaultUser);
  constructor(private sessionService:SessionService) {
    var data = this.sessionService.getItem("currentUser");
    if (data != null) {
      this.user$.next(data);
    }
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.user$ && this.user$._value && this.user$._value.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.user$._value.token}`,
        }
      });
    }

    return next.handle(request);
  }
}
