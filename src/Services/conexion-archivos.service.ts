import { Injectable } from '@angular/core';
import { User } from '../app/Interfaces/user';
import { recetas } from '../app/Interfaces/recetas';
import { Recetaxusuario } from '../app/Interfaces/recetaxusuario';
import { LocalStorageService } from './local-storage-service.service';
import { ComentarioReceta } from '../app/Interfaces/comentario-receta';

@Injectable({
  providedIn: 'root'
})
export class ConexionArchivosService {
  private apiUrl = 'http://localhost:3000';
  private userURL :string = '/users';
  private recetasURL :string = '/recetas';
  private comentariosURL :string = '/comentarios';

  constructor() { 

  }
//// SISTEMA DE ACCESO Y MODIFICACION DE USUARIOS.

  async obtenerUsuario(nombre: string): Promise<User>  {
    const data = await fetch(`${this.apiUrl}${this.userURL}?name=${nombre}`);
    const procesdata = await data.json();
    return (procesdata[0]) ?? null;
  }

  async comprobarUsuario(nombre: string, password: string): Promise<User | null>  {
    const data = await fetch(`${this.apiUrl}${this.userURL}?name=${nombre}`);
    const procesdata = await data.json();
    const usuario: User | null = (procesdata[0]) ?? null;
  
    if (usuario && usuario.password === password) {
      return usuario;
    } else {
      return null;
    }
  }
  

  async obtenerUsuarioPorEmail(email: string): Promise<User>  {
    const data = await fetch(`${this.apiUrl}${this.userURL}?email=${email}`);
    const procesdata = await data.json();
    return (procesdata[0]) ?? null;
  }

  async agregarUsuario(usuario: User){
    const response = await fetch(this.apiUrl+this.userURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });
    if (response.ok) {
      console.log('Usuario agregado correctamente.');
    } else {
      console.error('Error al agregar usuario.');
    }
  }

//// SISTEMA DE ACCESO Y MODIFICACION DE ID DE RECETAS ASIGNADAS.

  async agregarReceta(idreceta: string, nombre: string){
    let iduser = (await this.obtenerUsuario(nombre)).id; 
    console.log(idreceta, iduser);
    const recetaxusuario = {
      idreceta: idreceta,
      idusuario: iduser,
       
    };
    
    const response = await fetch(this.apiUrl.concat(this.recetasURL), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recetaxusuario),
    });

    if (response.ok) {
      console.log('Receta agregada correctamente.');
    } else {
      console.error('Error al agregar receta.');
    }
  }

  async getRecetas(nombre: string): Promise<Recetaxusuario[]> {
    const usuario = await this.obtenerUsuario(nombre);
  
    if (!usuario) {
      console.error('Usuario no encontrado.');
      return [];
    }
  
    const idUsuario = usuario.id;
    const data = await fetch(`${this.apiUrl}${this.recetasURL}?idusuario=${idUsuario}`);
    const procesdata = await data.json();
    console.log(procesdata);
    return (procesdata) ?? [];
  }

  async removerReceta(idreceta: string, nombre: string) {
    const usuario = await this.obtenerUsuario(nombre);

    if (!usuario) {
        console.error('Usuario no encontrado.');
        return;
    }

    const recetasUsuario = await this.getRecetas(nombre);
    const recetaUsuario = recetasUsuario.find(receta => receta.idreceta === idreceta);
    console.log(recetaUsuario);
    if (!recetaUsuario) {
        console.error('Receta no encontrada para el usuario.');
        return;
    }

    // Remove the recipe based on the ID
    const response = await fetch(`${this.apiUrl}${this.recetasURL}/${recetaUsuario.id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        console.log('Receta eliminada correctamente.');
    } else {
        console.error('Error al eliminar receta.');
    }
}

  
  
  
  
//// SISTEMA DE ACCESO Y MODIFICACION DE COMENTARIOS.
  async agregarComentario(comentario: ComentarioReceta): Promise<void> {
    console.log(comentario);
    console.log(`${this.apiUrl}${this.comentariosURL}`);
    const response = await fetch(`${this.apiUrl}${this.comentariosURL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comentario),
    });

    if (response.ok) {
      console.log('Comentario agregado correctamente.');
    } else {
      console.error('Error al agregar comentario.');
    }
  }

  async getComentarios(idreceta: number): Promise<ComentarioReceta[]> {
    const data = await fetch(`${this.apiUrl}${this.comentariosURL}?idreceta=${idreceta}`);
    const procesdata = await data.json();
    console.log("comentarios:", procesdata);
    return procesdata ?? [];
  }

}
