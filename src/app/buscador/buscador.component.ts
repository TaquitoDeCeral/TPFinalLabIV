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
  nuevoNombre: string = 'Category';
  recetas: recetas[] = [];
  CategoryList: Category[] = [];
  selectedCategory: string;

  constructor(private apiService: ApiConexionService, private router: Router) {

  }
  ngOnInit(): void {
    this.getCategorys();
  }
  async getCategorys(){
    this.CategoryList = await this.apiService.getCategorys();
    console.log(this.CategoryList);
    console.log(this.CategoryList[0].strCategory);
  }

  async getRecetas(filtro: string, categoria?: string) {
    this.recetas = [];
    if(!categoria){
      for(let i = 0; i < this.CategoryList.length; i++){
      this.recetas.push(...await this.apiService.getAllRecetas(this.CategoryList[i].strCategory));
      }
    }else{
      this.recetas = await this.apiService.getAllRecetas(categoria); 
    }
    if(filtro){
      this.recetas = this.recetas.filter(r => r.strMeal.toLowerCase().includes(filtro));
    }

  this.router.navigate(['/recetas-list'], {
    queryParams: { recetas: JSON.stringify(this.recetas) }
  });
  }

  searchRecetas(event: Event, filter: string, categoria: string) {
    event.preventDefault();
    this.getRecetas(filter, categoria);
  }

  selectCategory(category: string) {
    if(category === ''){
      this.nuevoNombre = "All Categories";
    }else{
      this.nuevoNombre = category;
    }
    this.selectedCategory = category;
  }
}