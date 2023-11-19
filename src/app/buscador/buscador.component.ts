// buscador.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { recetas } from '../Interfaces/recetas';
import { ApiConexionService } from '../api-conexion.service';
import { Category } from '../Interfaces/category';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit{
  recetas: recetas[] = [];
  filteredRecetas: recetas[] = [];
  CategoryList: Category[] = [];
  constructor(private apiService: ApiConexionService, private router: Router) {

  }
  ngOnInit(): void {
    this.getCategorys();
  }
  async getCategorys(){
    this.CategoryList = await this.apiService.getCategorys();
    console.log(this.CategoryList);
  }

  async getRecetas(nombre: string) {
    this.recetas = await this.apiService.getAllRecetas(nombre);
   
  
    //console.log(this.recetas);
    //console.log(this.filteredRecetas);

    this.router.navigate(['/recetas-list'], {
      queryParams: { recetas: JSON.stringify(this.recetas) }
    });
  }

  searchRecetas(event: Event, filter: string) {
    event.preventDefault();
    this.getRecetas(filter);
    //console.log(this.recetas);
    //console.log(this.filteredRecetas);
  }

}