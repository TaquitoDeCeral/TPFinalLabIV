import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService  } from '../local-storage-service.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrl: './navegador.component.css'
})
export class NavegadorComponent {
  username: string = '';
  password: string = '';
  nombreUsuarioRegistrado: string | null = null;
  constructor(private localStorageService: LocalStorageService, private authService: AuthService) {
    
  }
  
  login() {
    if (this.localStorageService.checkUserCredentials(this.username, this.password)) {
      // Lógica para redirigir o realizar acciones después de iniciar sesión correctamente
      console.log('Inicio de sesión exitoso');
      this.nombreUsuarioRegistrado = this.username;
      this.username = '';
      this.password = '';
      this.authService.login();
    } else {
      console.log('Credenciales incorrectas');
    }
  }

  logout() {
    // Lógica para cerrar sesión
    this.nombreUsuarioRegistrado = null;
    this.authService.logout();
    // Puedes agregar más lógica según sea necesario
  }

}
