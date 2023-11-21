import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { HomeComponent } from './home/home.component';
import { DetalleRecetaComponent } from './detalle-receta/detalle-receta.component';
import { RecetasListComponent } from './recetas-list/recetas-list.component';
import { MisRecetasComponent } from './mis-recetas/mis-recetas.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'registro-usuario', component: RegistroUsuarioComponent },
  { path: 'detalle-receta/:id', component: DetalleRecetaComponent, canActivate: [authGuard] },
  { path: 'recetas-list', component: RecetasListComponent},
  { path: 'mis-recetas', component: MisRecetasComponent, canActivate: [authGuard]},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
