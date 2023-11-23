import { Injectable } from '@angular/core';
import { User } from '../app/Interfaces/user';
import { ConexionArchivosService } from './conexion-archivos.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private claveToken = 'token';
  constructor(private obtenerUsuarioData: ConexionArchivosService) { }

  async login(nombre: string) {
      let usuario = await this.obtenerUsuarioData.obtenerUsuario(nombre);
      console.log(usuario);
    sessionStorage.setItem(this.claveToken, JSON.stringify(usuario));
  }

  logout(): void {
    sessionStorage.removeItem(this.claveToken);
  }

  obtenerToken(): string | null {
    const tokenString = sessionStorage.getItem(this.claveToken);
  
    if (tokenString) {
      const tokenObj = JSON.parse(tokenString);
      // Asumiendo que hay una propiedad 'nombre' en el objeto del token
      const nombreUsuario = tokenObj.name;
  
      if (nombreUsuario) {
        console.log(nombreUsuario);
        return nombreUsuario;
      }
    }
    return null; // o un valor predeterminado según tus necesidades
  }

  obtenerUsuarioLogeado(): User | null {
    const tokenString = sessionStorage.getItem(this.claveToken);
  
    if (tokenString) {
      const tokenObj = JSON.parse(tokenString);
      
      return tokenObj;
    }
  
    return null; // o un valor predeterminado según tus necesidades
  }
  


  estaLogeado(): boolean {
    return !!this.obtenerToken();
  }

}