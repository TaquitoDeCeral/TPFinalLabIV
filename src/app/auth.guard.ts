import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../Services/local-storage-service.service';
import Swal from 'sweetalert2';


export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(LocalStorageService);
  const routerService = inject(Router);


  const token = authService.estaLogeado();
  if(!token){
    //window.alert("To access the rest of the content, you must log in.");
    Swal.fire({
      title: 'Welcome!',
      text: 'To access the rest of the content, you must log in.',
      icon: 'info',
      confirmButtonText: 'Understood',
      background: '#C24600',  // Cambia el color de fondo
    });
    routerService.navigate(['']);
    return false;
  }
  return true;
};
