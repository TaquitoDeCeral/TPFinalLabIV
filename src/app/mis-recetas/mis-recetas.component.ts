import { Component, OnInit } from '@angular/core';
import { recetas } from '../Interfaces/recetas';
import { ConexionArchivosService } from '../../Services/conexion-archivos.service';
import { LocalStorageService } from '../../Services/local-storage-service.service';
import { User } from '../Interfaces/user';
import { ApiConexionService } from '../../Services/api-conexion.service';
import { Recetaxusuario } from '../Interfaces/recetaxusuario';

@Component({
  selector: 'app-mis-recetas',
  templateUrl: './mis-recetas.component.html',
  styleUrls: ['./mis-recetas.component.css']
})
export class MisRecetasComponent implements OnInit {
  listaRecetas: recetas[] = [];
  idRecetas: string[] = [];
  recetasEnLista: Record<string, boolean> = {};

  constructor(
    private misRecetas: ConexionArchivosService,
    private usuarioLog: LocalStorageService,
    private apiConexionService: ApiConexionService
  ) {}

  ngOnInit() {
    this.obtenerMisIdRecetas();
  }

  async obtenerMisIdRecetas() {
    try {
      const nombreUsuario: User | null = this.usuarioLog.obtenerUsuarioLogeado() || null;

      if (nombreUsuario) {
        const recetas: Recetaxusuario[] = await this.misRecetas.getRecetas(nombreUsuario.name);
        this.idRecetas = recetas.map(receta => receta.idreceta);
        console.log(this.idRecetas);
        await this.obtenerRecetasPorIDs();
      } else {
        console.error('Usuario no logeado.');
        // Puedes manejar el caso en el que no hay usuario logeado, como redirigir a la página de inicio de sesión.
      }
    } catch (error) {
      console.error('Error al obtener recetas:', error);
      // Puedes manejar el error de alguna manera, como mostrar un mensaje al usuario.
    }
  }

  async obtenerRecetasPorIDs() {
    for (let i = 0; i < this.idRecetas.length; i++) {
      const idReceta = this.idRecetas[i];
      this.apiConexionService.getRecetaByID(parseInt(idReceta)).then((r) => {
        if (r) {
          this.listaRecetas.push(r);
          this.recetasEnLista[idReceta] = true; // Actualiza el estado de la receta en tiempo real
        }

        console.log(this.listaRecetas);
      });
    }
  }

  async guardarReceta(idReceta: string) {
    const nombreUsuario: string | null = this.usuarioLog.obtenerToken();
  
    if (!nombreUsuario) {
      console.error("No se pudo obtener el nombre de usuario para guardar la receta.");
      return;
    }
  
    // Verifica si la receta ya está en la lista del usuario
    const recetaExistente = this.recetasEnLista[idReceta];
  
    if (recetaExistente) {
      // Si la receta ya está en la lista, la eliminamos
      console.log("Removiendo receta para", nombreUsuario, "con ID:", idReceta);
      await this.misRecetas.removerReceta(idReceta, nombreUsuario);
  
      // Elimina la receta visualmente de this.listaRecetas
      this.listaRecetas = this.listaRecetas.filter(receta => receta.idMeal.toString() !== idReceta);
    } else {
      // Si la receta no está en la lista, la agregamos
      console.log("Guardando receta para", nombreUsuario, "con ID:", idReceta);
      await this.misRecetas.agregarReceta(idReceta, nombreUsuario);
  
      // Agrega la receta visualmente a this.listaRecetas (si no existe ya)
      const receta = await this.apiConexionService.getRecetaByID(parseInt(idReceta));
      if (receta) {
        this.listaRecetas.push(receta);
      }
    }
  
    // Actualiza el estado de la receta en tiempo real
    this.recetasEnLista[idReceta] = !recetaExistente;
  }
  
}
