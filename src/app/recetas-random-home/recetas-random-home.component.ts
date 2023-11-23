import { Component, Input } from '@angular/core';
import { recetas } from '../Interfaces/recetas';
import { ConexionArchivosService } from '../../Services/conexion-archivos.service';
import { LocalStorageService } from '../../Services/local-storage-service.service';
import { User } from '../Interfaces/user';
import { ApiConexionService } from '../../Services/api-conexion.service';
import { Recetaxusuario } from '../Interfaces/recetaxusuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recetas-random-home',
  templateUrl: './recetas-random-home.component.html',
  styleUrls: ['./recetas-random-home.component.css']
})
export class RecetasRandomHomeComponent {
  @Input() comidas!: recetas;
  recetasEnLista: Record<string, boolean> = {};
  constructor(
    private archivoReceta: ConexionArchivosService,
    private usuarioLog: LocalStorageService,
    private apiConexionService: ApiConexionService
  ) {}

  async guardarReceta(idReceta: number) {
    const nombreUsuario: string | null = this.usuarioLog.obtenerToken();
  
    if (!nombreUsuario) {
      console.error("No se pudo obtener el nombre de usuario para guardar la receta.");
      Swal.fire({
        title: 'Welcome!',
        text: 'To access the rest of the content, you must log in.',
        icon: 'info',
        confirmButtonText: 'Understood',
        background: '#C24600',  // Cambia el color de fondo
      });
      return;
    }
  
    // Verifica si la receta ya está en la lista del usuario
    const recetasUsuario: Recetaxusuario[] = await this.archivoReceta.getRecetas(nombreUsuario);
    const recetaExistente = recetasUsuario.find((receta) => receta.idreceta === String(idReceta));
  
    if (recetaExistente) {
      // Si la receta ya está en la lista, la eliminamos
      console.log("Removiendo receta para", nombreUsuario, "con ID:", idReceta);
      await this.archivoReceta.removerReceta(String(idReceta), nombreUsuario);
    } else {
      // Si la receta no está en la lista, la agregamos
      console.log("Guardando receta para", nombreUsuario, "con ID:", idReceta);
      await this.archivoReceta.agregarReceta(String(idReceta), nombreUsuario);
    }
    // Actualiza la propiedad para reflejar el cambio.
    this.recetasEnLista[idReceta] = !recetaExistente;
  }

  async esRecetaEnLista(idReceta: number): Promise<boolean> {
    const nombreUsuario: string | null = this.usuarioLog.obtenerToken();
  
    if (!nombreUsuario) {
      console.error("No se pudo obtener el nombre de usuario para guardar la receta.");
      return true;
    }
  
    // Verifica si la receta ya está en la lista del usuario
    const recetasUsuario: Recetaxusuario[] = await this.archivoReceta.getRecetas(nombreUsuario);
    const recetaExistente = recetasUsuario.find((receta) => receta.idreceta === String(idReceta));
    if(recetaExistente){ return true;}
    return false;
  }
  private async actualizarEstadoRecetasEnLista() {
    const nombreUsuario: string | null = this.usuarioLog.obtenerToken();

    if (!nombreUsuario) {
      console.error("No se pudo obtener el nombre de usuario para actualizar el estado de las recetas.");
      return;
    }

    const recetasUsuario: Recetaxusuario[] = await this.archivoReceta.getRecetas(nombreUsuario);
    recetasUsuario.forEach(receta => {
      this.recetasEnLista[receta.idreceta] = true;
    });
  }
}
