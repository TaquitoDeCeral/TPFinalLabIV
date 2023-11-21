import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../local-storage-service.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.css'
})
export class RegistroUsuarioComponent implements OnInit {
  registroForm: FormGroup;
  UsuarioRegistrado: boolean = false;
  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService) {
    
  }

  ngOnInit() {
    this.scrollPageToTop(); // Para que aparezca en la parte de arriba.

      this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }


  onSubmit() {
    if (this.registroForm.valid) {
      const userData = this.registroForm.value;
      this.localStorageService.saveDataLocally(userData);
      this.UsuarioRegistrado = true;
      this.registroForm.reset(); // Restablecer el formulario
      
      console.log(this.localStorageService.getStoredData());
      // Guardar datos en el almacenamiento local
      console.log('Datos guardados localmente:', userData);
      // Puedes realizar acciones adicionales después de guardar los datos
    }
  }

  private scrollPageToTop() {
    // Utiliza el método scrollTo para desplazar la página hacia arriba sin deslizamiento suave
    window.scrollTo(0, 0);
  }
}
