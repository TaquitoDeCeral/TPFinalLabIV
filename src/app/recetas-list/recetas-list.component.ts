// recetas-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { recetas } from '../Interfaces/recetas';
import { BuscadorComponent } from '../buscador/buscador.component';
import { RecetasUsuarioService } from '../recetas-usuario.service';

@Component({
  selector: 'app-recetas-list',
  templateUrl: './recetas-list.component.html',
  styleUrls: ['./recetas-list.component.css']
})
export class RecetasListComponent implements OnInit {
  recetas: recetas[] = [];

  constructor(private route: ActivatedRoute, private recetasUsuarioService: RecetasUsuarioService) {}

  ngOnInit() {
    // Recuperar las recetas filtradas de la URL
    this.route.queryParams.subscribe(params => {
      if (params['recetas']) {
        this.recetas = JSON.parse(params['recetas']);
      }
    });
  }

    guardarReceta(idReceta: number) {
    // Llama al servicio para guardar la id de la receta
    this.recetasUsuarioService.guardarReceta(idReceta);
  }
}
