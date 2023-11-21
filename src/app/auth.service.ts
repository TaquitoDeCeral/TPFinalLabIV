// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  login() {
    // Lógica para autenticar al usuario
    this.isAuthenticated = true;
  }

  logout() {
    // Lógica para cerrar sesión
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
