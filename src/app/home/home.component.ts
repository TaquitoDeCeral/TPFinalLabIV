import { Component, inject } from '@angular/core';
import { recetas } from '../Interfaces/recetas';
import { ApiConexionService } from '../api-conexion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  listaComidas: recetas[] = [];
  comidasService: ApiConexionService = inject(ApiConexionService);

  constructor() {
    for (let index = 0; index < 9; index++) {
    this.comidasService.getRecetasRandom().then((listaComidas: recetas[]) => {
      this.listaComidas.push(...listaComidas);
    });
    }
  }
}
