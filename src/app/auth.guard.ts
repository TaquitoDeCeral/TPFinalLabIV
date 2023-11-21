import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const routerService = inject(Router);

  const token = authService.isLoggedIn();
  if(!token){
    routerService.navigate(['/home']);
  }
  return true;
};
