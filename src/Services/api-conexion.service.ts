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

  async getAllRecetas(nombre : string): Promise<recetas[]> {
    const data = await fetch(`${this.apiUrl}filter.php?c=${nombre}`);
    const procesdata = await data.json();
    console.log(`${this.apiUrl}filter.php?c=${nombre}`);
    console.log(procesdata);
    
    return (procesdata.meals) ?? [];
  }

  async getRecetasRandom(): Promise<recetas[]> {
    const data = await fetch(`${this.apiUrl}random.php`);
    const procesdata = await data.json();
    return (procesdata.meals) ?? [];
  }

  async getRecetaByID(id: number): Promise<recetas | undefined> {
    const data = await fetch(`${this.apiUrl}lookup.php?i=${id}`);
    const procesdata = await data.json();
    console.log(procesdata);
    console.log(id);
    return (procesdata.meals) ? procesdata.meals[0] : undefined;
  }

  async getCategorys(): Promise<Category[]> {
    const data = await fetch(`${this.apiUrl}categories.php`);
    const procesdata = await data.json();
    return (procesdata.categories) ?? [];
  }

}
