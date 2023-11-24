import { Injectable } from '@angular/core';
import { User } from '../app/Interfaces/user';
import { ConexionArchivosService } from './conexion-archivos.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private claveToken = 'TacoToken';
  constructor(private obtenerUsuarioData: ConexionArchivosService) { }

  async login(nombre: string, password: string) {
      let usuario = await this.obtenerUsuarioData.obtenerUsuario(nombre);
      //console.log(usuario);
      if(usuario.password === password){
        sessionStorage.setItem(this.claveToken, JSON.stringify(usuario));
      }
    
  }

  logout(): void {
    sessionStorage.removeItem(this.claveToken);
  }

  obtenerToken(): string | null {
    const tokenString = sessionStorage.getItem(this.claveToken);
  
    if (tokenString) {
      const tokenObj = JSON.parse(tokenString);
      const nombreUsuario = tokenObj.name;
      
      if (nombreUsuario) {
       // console.log(nombreUsuario);
        return nombreUsuario;
      }
    }
    return null;
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