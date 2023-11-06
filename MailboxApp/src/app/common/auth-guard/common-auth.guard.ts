import { CanActivateFn } from '@angular/router';
import { UserContextService } from '../user-context.service';
import { inject } from '@angular/core';

export const commonAuthGuard: CanActivateFn = (route, state) => {
  const loginService = inject(UserContextService);
  if(loginService.user$._value.userRole == "Admin" || loginService.user$._value.userRole == "User"){
    
     return true;
  }
  else{
    return false;
  }
}