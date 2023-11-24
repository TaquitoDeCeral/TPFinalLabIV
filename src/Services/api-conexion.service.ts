// api-conexion.service.ts
import { Injectable } from '@angular/core';
import { recetas } from '../app/Interfaces/recetas';
import { Category } from '../app/Interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class ApiConexionService {

  constructor() { }

  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/';

  async getAllRecetas(nombre: string): Promise<recetas[]> {
    console.log("API: Llamado a getAllRecetas");
    const data = await fetch(`${this.apiUrl}filter.php?c=${nombre}`);
    const procesdata = await data.json();
  
    //console.log(`${this.apiUrl}filter.php?c=${nombre}`);
    //console.log(procesdata);
  
    const recetas = (procesdata.meals) ?? [];
  
    // Agrega la propiedad 'categoria' a cada receta
    const recetasConCategoria = recetas.map((r: recetas) => ({ ...r, strCategory: nombre }));
    //console.log("categoriaAgregada:",recetasConCategoria);
    return recetasConCategoria;
  }
  

  async getRecetasRandom(): Promise<recetas[]> {
    console.log("API: Llamado a getRecetasRandom");
    const data = await fetch(`${this.apiUrl}random.php`);
    const procesdata = await data.json();
    return (procesdata.meals) ?? [];
  }

  async getRecetaByID(id: number): Promise<recetas | undefined> {
    console.log("API: Llamado a getRecetaByID");
    const data = await fetch(`${this.apiUrl}lookup.php?i=${id}`);
    const procesdata = await data.json();
    //console.log(procesdata);
    //console.log(id);
    return (procesdata.meals) ? procesdata.meals[0] : undefined;
  }

  async getCategorys(): Promise<Category[]> {
    console.log("API: Llamado a getCategorys");
    const data = await fetch(`${this.apiUrl}categories.php`);
    const procesdata = await data.json();
    return (procesdata.categories) ?? [];
  }

}
