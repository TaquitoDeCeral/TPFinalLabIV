import { Injectable } from '@angular/core';
import { ComentarioReceta } from '../app/Interfaces/comentario-receta';
import { ConexionArchivosService } from './conexion-archivos.service';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private comentarios: ComentarioReceta[] = [];
  constructor(private archivoComentarios: ConexionArchivosService){}
async getComentarios(idreceta : number): Promise<ComentarioReceta[]> {
    this.comentarios = await this.archivoComentarios.getComentarios(idreceta);
    return this.comentarios;
  }

 async agregarComentario(comentario: ComentarioReceta) {
    await this.archivoComentarios.agregarComentario(comentario);
    //this.comentarios.push(comentario);
  }
}