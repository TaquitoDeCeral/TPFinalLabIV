import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {comidasService} from '../comidas.service';
import {recetas} from '../recetas';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  comidasService = inject(comidasService);
  recetas: recetas | undefined;

  constructor() {
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
}
