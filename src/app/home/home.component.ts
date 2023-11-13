import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { recetasRandomHomeComponent } from '../recetas-random-home/recetas-random-home.component';
import { recetas } from '../recetas';
import { comidasService } from '../comidas.service';
import { RecetaRandomComponent } from '../receta-random/receta-random.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, recetasRandomHomeComponent, RecetaRandomComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  listaComidas: recetas[] = [];
  comidasService: comidasService = inject(comidasService);

  constructor() {
    for (let index = 0; index < 9; index++) {
    this.comidasService.getRecetasRandom().then((listaComidas: recetas[]) => {
      this.listaComidas.push(...listaComidas);
    });
    }
  }
}
