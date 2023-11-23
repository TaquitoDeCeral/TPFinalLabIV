import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService  } from '../../Services/local-storage-service.service';
import { ConexionArchivosService } from '../../Services/conexion-archivos.service';
import { User } from '../Interfaces/user';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrl: './navegador.component.css'
})
export class NavegadorComponent {
  username: string = '';
  password: string = '';
  
  nombreUsuarioRegistrado: string | null = null;
  constructor(private localStorageService: LocalStorageService,
              private usuarioRegistrado: ConexionArchivosService) {
    
  }

  ngOnInit(){
    const logUser = this.localStorageService.obtenerUsuarioLogeado();
    if(logUser){
      console.log(this.localStorageService.obtenerToken());
      this.localStorageService.login(logUser.name, logUser.password);
      this.nombreUsuarioRegistrado = this.localStorageService.obtenerToken();
    }
    
  }
  
  async login() {

    let data: User | null = await this.usuarioRegistrado.comprobarUsuario(this.username, this.password);
    if (data) {
      const token ="TacoToken";
      console.log('Inicio de sesión exitoso');
      this.nombreUsuarioRegistrado = this.username;
      this.localStorageService.login(this.username, this.password);
      this.username = '';
      this.password = '';
    } else {
      this.password = '';
      window.alert('Credenciales incorrectas');
      console.log('Credenciales incorrectas');
    }
  }

  logout() {
    // Lógica para cerrar sesión
    this.nombreUsuarioRegistrado = null;
    this.localStorageService.logout();
    location.reload();
    // Puedes agregar más lógica según sea necesario
  }

}
