import { Component, OnInit } from '@angular/core';
import { CargarListaDeRecetasService } from '../Services/cargar-lista-de-recetas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FlavorAlchemy';
  
  constructor(private inicializarLista : CargarListaDeRecetasService) {
    
  }
  ngOnInit(){
    this.inicializarLista.inicializarListaRecetas();
  }
}

