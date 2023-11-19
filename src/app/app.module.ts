import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { RecetasRandomHomeComponent } from './recetas-random-home/recetas-random-home.component';
import { DetalleRecetaComponent } from './detalle-receta/detalle-receta.component';
import { RecetasListComponent } from './recetas-list/recetas-list.component';
import { BuscadorComponent } from './buscador/buscador.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroUsuarioComponent,
    RecetasRandomHomeComponent,
    DetalleRecetaComponent,
    RecetasListComponent,
    BuscadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
