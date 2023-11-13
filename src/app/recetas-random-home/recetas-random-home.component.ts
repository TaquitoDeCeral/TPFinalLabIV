import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { recetas } from '../recetas';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-recetas-random-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recetas-random-home.component.html',
  styleUrl: './recetas-random-home.component.css'
})
export class recetasRandomHomeComponent {
  @Input() comidas!: recetas;
}
