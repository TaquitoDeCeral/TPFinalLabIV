import { Injectable } from '@angular/core';
import { recetas } from './recetas';

@Injectable({
  providedIn: 'root'
})
export class comidasService {

  constructor() { }
  urlRandom = 'https://www.themealdb.com/api/json/v1/1/random.php';
  urlByID ="https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  
  async getRecetasRandom(): Promise<recetas[]> {
    const data = await fetch(this.urlRandom);
    const procesdata = await data.json();
    console.log(procesdata);
    return (procesdata.meals) ?? [];
  }
  async getRecetaByID(id: number): Promise<recetas | undefined> {
    const data = await fetch(`${this.urlByID}${id}`);
    const procesdata = await data.json();
    console.log(procesdata);
    console.log(`${this.urlByID}${id}`);
    return (procesdata.meals) ? procesdata.meals[0]: undefined;
  }
}
