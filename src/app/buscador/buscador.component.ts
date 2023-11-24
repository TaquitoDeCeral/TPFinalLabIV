// buscador.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { recetas } from '../Interfaces/recetas';
import { ApiConexionService } from '../../Services/api-conexion.service';
import { Category } from '../Interfaces/category';
import { CargarListaDeRecetasService } from '../../Services/cargar-lista-de-recetas.service';



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

  constructor(private apiService: ApiConexionService, private router: Router, 
              private inicializarRecetas: CargarListaDeRecetasService) {

  }
  ngOnInit() {
    //inicializa las categorias y luego de eso permite hacer el get.
    this.inicializarRecetas.inicializarListaCategorias().then(() => {
      this.getCategorys();
    });
  }
  async getCategorys(){
    //this.CategoryList = await this.apiService.getCategorys();
    const categoriaStorage = sessionStorage.getItem('categorias');
    //console.log(categoriaStorage);
    try {
      if(categoriaStorage){
        this.CategoryList = JSON.parse(categoriaStorage);
      }else{
        await this.inicializarRecetas.inicializarListaCategorias();
        
      }
    } catch (error) {
      console.error('Error en getCategorys:', error);
    }
  }


  async searchRecetas(event: Event, filter: string, categoria: string) {
    event.preventDefault();
    const recetasLocalStorage = sessionStorage.getItem('recetas');
    //console.log(recetasLocalStorage);
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
        //await this.inicializarRecetas.inicializarListaRecetas();
      }
    } catch (error) {
      console.error('Error al parsear JSON desde localStorage:', error);
    
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