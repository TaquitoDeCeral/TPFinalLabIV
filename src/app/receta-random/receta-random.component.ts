import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { recetas } from '../recetas';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-receta-random',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './receta-random.component.html',
  styleUrl: './receta-random.component.css'
})
export class RecetaRandomComponent {
  @Input() comidas!: recetas;
}