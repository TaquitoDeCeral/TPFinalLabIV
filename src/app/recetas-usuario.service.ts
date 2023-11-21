import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecetasUsuarioService {
  misRecetas: number[] = [];

  guardarReceta(idReceta: number) {
    // Agrega la id de la receta a la lista
    console.log(idReceta);
    this.misRecetas.push(idReceta);
    console.log(this.misRecetas);
  }
}
