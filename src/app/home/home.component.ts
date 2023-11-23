import { Component, inject } from '@angular/core';
import { recetas } from '../Interfaces/recetas';
import { ApiConexionService } from '../../Services/api-conexion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  listaComidas: recetas[] = [];
  comidasService: ApiConexionService = inject(ApiConexionService);

  constructor() {
    for (let index = 0; index < 9; index++) {
    this.comidasService.getRecetasRandom().then((listaComidas: recetas[]) => {
      this.listaComidas.push(...listaComidas);
    });
    }
  }

  ngOnInit() {
    // Llama a la función para desplazar la página hacia arriba al entrar en el componente
    this.scrollPageToTop();

  }

  private scrollPageToTop() {
    // Utiliza el método scrollTo para desplazar la página hacia arriba sin deslizamiento suave
    window.scrollTo(0, 0);
  }


  inicializarListaRecetas(){
    const recetasLocalStorage = sessionStorage.getItem('recetas');
    console.log(recetasLocalStorage);
    try {
      if (recetasLocalStorage) {
        const recetasTemp = JSON.parse(recetasLocalStorage);
        
      }else{
        
      }
    }catch{

    }
  }
}
