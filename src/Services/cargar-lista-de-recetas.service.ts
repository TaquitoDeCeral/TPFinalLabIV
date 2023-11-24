import { Injectable } from '@angular/core';
import { Category } from '../app/Interfaces/category';
import { ApiConexionService } from './api-conexion.service';
import { recetas } from '../app/Interfaces/recetas';

@Injectable({
  providedIn: 'root'
})
export class CargarListaDeRecetasService {
  CategoryList: Category[] = [];
  recetas: recetas[] = [];

  constructor(private apiService: ApiConexionService) {

   }

 async inicializarListaRecetas(){
    await this.inicializarListaCategorias();
    //console.log("Categorias:",this.CategoryList);
    //console.log(this.CategoryList[0].strCategory);
    const recetasLocalStorage = sessionStorage.getItem('recetas');
    //console.log(recetasLocalStorage);
    try {
      if (!recetasLocalStorage) {
        for(let i = 0; i < this.CategoryList.length; i++){
          const recetasCategoria = await this.apiService.getAllRecetas(this.CategoryList[i].strCategory);
          this.recetas.push(...recetasCategoria);
        }
        sessionStorage.setItem('recetas', JSON.stringify(this.recetas));
      }else{

      }
    }catch(error){
      console.error('Error al parsear JSON desde SessionStorage:', error);
    }
  }

  async inicializarListaCategorias(){
    const categoriaStorage = sessionStorage.getItem('categorias');
    //console.log("Esta iniciando las categorias: ",categoriaStorage );
    try {
      if (!categoriaStorage) {
        this.CategoryList = await this.apiService.getCategorys();

        sessionStorage.setItem('categorias', JSON.stringify(this.CategoryList));
       
      }else{
        this.CategoryList = JSON.parse(categoriaStorage);
      }
    } catch (error) {
      console.error('Error al parsear JSON desde SessionStorage:', error);
    }
  }
}
