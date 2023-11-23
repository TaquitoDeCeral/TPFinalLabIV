// buscador.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { recetas } from '../Interfaces/recetas';
import { ApiConexionService } from '../../Services/api-conexion.service';
import { Category } from '../Interfaces/category';



@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit{
  nuevoNombre: string = 'Category';
  recetas: recetas[] = [];
  a: recetas[] = [];
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
        const recetasCategoria = await this.apiService.getAllRecetas(this.CategoryList[i].strCategory);
        this.recetas.push(...recetasCategoria);
      }

    sessionStorage.setItem('recetas', JSON.stringify(this.recetas));
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
    const recetasLocalStorage = sessionStorage.getItem('recetas');
    console.log(recetasLocalStorage);
    try {
      if (recetasLocalStorage) {
        const recetasTemp = JSON.parse(recetasLocalStorage);
  
        if (filter) {
          this.recetas = recetasTemp.filter((r:recetas) => r.strMeal.toLowerCase().includes(filter.toLowerCase()));
        } else {
          this.recetas = recetasTemp;
        }
  
        if (categoria) {
          this.recetas = this.recetas.filter(r => r.strCategory.toLowerCase() === categoria.toLowerCase());
        }
  
        this.router.navigate(['/recetas-list'], {
          queryParams: { recetas: JSON.stringify(this.recetas) }
        });
      } else {
        this.getRecetas(filter, categoria);
      }
    } catch (error) {
      console.error('Error al parsear JSON desde localStorage:', error);
      // Maneja el error según tus necesidades, por ejemplo, llamando a this.getRecetas(filter, categoria);
    }
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