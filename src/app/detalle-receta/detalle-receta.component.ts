import { Component, inject, OnInit } from '@angular/core';
import { recetas } from '../Interfaces/recetas';
import { ActivatedRoute } from '@angular/router';
import { ApiConexionService } from '../../Services/api-conexion.service';
import { ComentarioReceta } from '../Interfaces/comentario-receta';
import { ComentariosService } from '../../Services/comentarios.service';
import { LocalStorageService } from '../../Services/local-storage-service.service';
import { User } from '../Interfaces/user';
import { ConexionArchivosService } from '../../Services/conexion-archivos.service';
import { Recetaxusuario } from '../Interfaces/recetaxusuario';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.component.html',
  styleUrl: './detalle-receta.component.css'
})
export class DetalleRecetaComponent {
 
  route: ActivatedRoute = inject(ActivatedRoute);
  comidasService = inject(ApiConexionService);
  recetas: recetas | undefined;
  nuevoComentario: string = "";
  comentarios: ComentarioReceta[] = [];
  isRecetaEnLista: boolean = false;
  recetaComidaID = Number(this.route.snapshot.params['id']);
  constructor(private comentariosService: ComentariosService, private usuarioLog: LocalStorageService,
              private archivoReceta: ConexionArchivosService, private sanitizer: DomSanitizer) {
    
    console.log(this.recetaComidaID);
    this.comidasService.getRecetaByID(this.recetaComidaID).then((r) => {
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


  async ngOnInit() {
    // Llama a la función para desplazar la página hacia arriba al entrar en el componente
    this.isRecetaEnLista = await this.esRecetaEnLista(this.recetaComidaID);
    this.obtenerComentarios();
    this.scrollPageToTop();
    //
 
  }

  private scrollPageToTop() {
    window.scrollTo(0, 0);
  }

  async guardarReceta(idReceta: number) {
    const nombreUsuario: string | null = this.usuarioLog.obtenerToken();
  
    if (!nombreUsuario) {
      console.error("No se pudo obtener el nombre de usuario para guardar la receta.");
      return;
    }
  
    // Verifica si la receta ya está en la lista del usuario
    const recetasUsuario: Recetaxusuario[] = await this.archivoReceta.getRecetas(nombreUsuario);
    const recetaExistente = recetasUsuario.find((receta) => receta.idreceta === String(idReceta));
  
    if (recetaExistente) {
      // Si la receta ya está en la lista, la eliminamos
      console.log("Removiendo receta para", nombreUsuario, "con ID:", idReceta);
      await this.archivoReceta.removerReceta(String(idReceta), nombreUsuario);
    } else {
      // Si la receta no está en la lista, la agregamos
      console.log("Guardando receta para", nombreUsuario, "con ID:", idReceta);
      await this.archivoReceta.agregarReceta(String(idReceta), nombreUsuario);
    }
    // Actualiza la propiedad para reflejar el cambio.
    this.isRecetaEnLista = await this.esRecetaEnLista(idReceta);
  }
  async esRecetaEnLista(idReceta: number): Promise<boolean> {
    const nombreUsuario: string | null = this.usuarioLog.obtenerToken();
  
    if (!nombreUsuario) {
      console.error("No se pudo obtener el nombre de usuario para guardar la receta.");
      return true;
    }
  
    // Verifica si la receta ya está en la lista del usuario
    const recetasUsuario: Recetaxusuario[] = await this.archivoReceta.getRecetas(nombreUsuario);
    const recetaExistente = recetasUsuario.find((receta) => receta.idreceta === String(idReceta));
    if(recetaExistente){ return true;}
    return false;
  }

  async obtenerComentarios(){
    console.log("idReceta:", this.recetaComidaID);
    this.comentarios = await this.comentariosService.getComentarios(this.recetaComidaID);
  }

  async agregarComentario() {

    const nuevoComentario :ComentarioReceta = {
      id: "", // Si comentarios.length es undefined o 0, usa 1 como valor predeterminado
      idusuario: this.getUsuarioActual()?.id.toString() || "",
      username: this.getUsuarioActual()?.name.toString() || "",
      comentario: this.nuevoComentario,
      fecha: new Date(),
      idreceta: this.recetaComidaID.toString(), // Usa el operador opcional (?) para evitar errores si idReceta es nulo o undefined
    };

    this.comentariosService.agregarComentario(nuevoComentario);
    this.nuevoComentario = ''; // Limpiar el campo de comentario después de agregarlo
    this.obtenerComentarios();
}

getUsuarioActual(): User | undefined {
  const userInfo: User | null = this.usuarioLog.obtenerUsuarioLogeado();

  if (userInfo) {
    console.log(userInfo.name);
    return userInfo;

  } else {
    console.error('Usuario no logeado.');
    return undefined;
  }
 }

 sanitizeInstructions(instructions: string | undefined): SafeHtml {
  if (!instructions) {
    return '';
  }

  // Reemplaza los saltos de línea con la etiqueta <br>
  const formattedInstructions = instructions.replace(/(\r\n|\. )/g, '<br>');

  // Utiliza DomSanitizer para asegurar que el HTML sea considerado seguro
  return this.sanitizer.bypassSecurityTrustHtml(formattedInstructions);
}

}
