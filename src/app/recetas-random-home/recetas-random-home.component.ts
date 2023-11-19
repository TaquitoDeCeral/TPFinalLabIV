import { Component, Input } from '@angular/core';
import { recetas } from '../Interfaces/recetas';

@Component({
  selector: 'app-recetas-random-home',
  templateUrl: './recetas-random-home.component.html',
  styleUrl: './recetas-random-home.component.css'
})
export class RecetasRandomHomeComponent {
  @Input() comidas!: recetas;
}
