// recetas-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { recetas } from '../Interfaces/recetas';
import { BuscadorComponent } from '../buscador/buscador.component';

@Component({
  selector: 'app-recetas-list',
  templateUrl: './recetas-list.component.html',
  styleUrls: ['./recetas-list.component.css']
})
export class RecetasListComponent implements OnInit {
  recetas: recetas[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Recuperar las recetas filtradas de la URL
    this.route.queryParams.subscribe(params => {
      if (params['recetas']) {
        this.recetas = JSON.parse(params['recetas']);
      }
    });
  }
}
