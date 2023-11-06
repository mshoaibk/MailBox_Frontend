import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { BehaviorSubject } from 'rxjs';
const defaultUser = null
@Injectable({
  providedIn: 'root'
})
export class UserContextService {
  public user$: any = new BehaviorSubject(defaultUser);
  private userRoles: string[] = [];

 constructor(private sessionService: SessionService,) {
    var data = this.sessionService.getItem("currentUser");
    if (data != null) {
      this.user$.next(data);
    }
  }

 public setUser(user: any) {
    this.sessionService.setItem("currentUser", user);
    this.user$.next(user);
  }

  public logout() {
    this.sessionService.removeItem("currentUser");
    this.user$.next(defaultUser);
  }

  setUserRoles(roles: string[]): void {
    this.userRoles = roles;
  }

  getUserRoles(): string[] {
    return this.user$._value.userRole.toString();
  }

}
