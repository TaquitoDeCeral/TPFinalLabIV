import { Component, inject } from '@angular/core';
import { recetas } from '../Interfaces/recetas';
import { ActivatedRoute } from '@angular/router';
import { ApiConexionService } from '../api-conexion.service';
import { RecetasUsuarioService } from '../recetas-usuario.service';


@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.component.html',
  styleUrl: './detalle-receta.component.css'
})
export class DetalleRecetaComponent {
 
  route: ActivatedRoute = inject(ActivatedRoute);
  comidasService = inject(ApiConexionService);
  recetas: recetas | undefined;

  constructor(private recetasUsuarioService: RecetasUsuarioService) {
    const recetaComidaID = Number(this.route.snapshot.params['id']);
    console.log(recetaComidaID);
    this.comidasService.getRecetaByID(recetaComidaID).then((r) => {
      this.recetas = r;
      console.log(this.recetas?.idMeal);
    });
  }

  getIngredientsList(re: recetas | undefined): string[] {
    if (!re) {
      return [];
    }

    const ingredients: string[] = [];

    // Iterar sobre las propiedades strIngredientX y strMeasureX
    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;

      const ingredient = re[ingredientKey];
      const measure = re[measureKey];
  
      // Verificar si tanto la propiedad de ingrediente como la de medida existen y no son undefined
      if (ingredient !== undefined && measure !== undefined) {
        ingredients.push(`${measure} ${ingredient}`);
      } else if (ingredient !== undefined) {
        ingredients.push(String(ingredient));
      }
    }

    return ingredients;
  }


  ngOnInit() {
    // Llama a la función para desplazar la página hacia arriba al entrar en el componente
    this.scrollPageToTop();
  }

  private scrollPageToTop() {
    // Utiliza el método scrollTo para desplazar la página hacia arriba sin deslizamiento suave
    window.scrollTo(0, 0);
  }

  guardarReceta(idReceta: number) {
    // Llama al servicio para guardar la id de la receta
    this.recetasUsuarioService.guardarReceta(idReceta);
  }

}
