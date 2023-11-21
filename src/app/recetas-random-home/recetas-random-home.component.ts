import { Component, Input } from '@angular/core';
import { recetas } from '../Interfaces/recetas';
import { RecetasUsuarioService } from '../recetas-usuario.service';

@Component({
  selector: 'app-recetas-random-home',
  templateUrl: './recetas-random-home.component.html',
  styleUrl: './recetas-random-home.component.css'
})
export class RecetasRandomHomeComponent {
  @Input() comidas!: recetas;
  constructor(private recetasUsuarioService: RecetasUsuarioService){}
  guardarReceta(idReceta: number) {
    // Llama al servicio para guardar la id de la receta
    this.recetasUsuarioService.guardarReceta(idReceta);
  }
}
