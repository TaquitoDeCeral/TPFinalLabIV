import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../Services/local-storage-service.service';
import { ConexionArchivosService } from '../../Services/conexion-archivos.service';


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.css'
})
export class RegistroUsuarioComponent implements OnInit {
  registroForm: FormGroup;
  UsuarioRegistrado: boolean = false;
  usuarioExistente: boolean = false;
  emailExistente: boolean = false;
  
  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService, 
              private conexionArchivos: ConexionArchivosService) {
    
  }

  ngOnInit() {
    this.scrollPageToTop(); // Para que aparezca en la parte de arriba.

    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\S.*\S$/), // Evita espacios al principio y al final
          Validators.minLength(1)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\S.*\S$/), // Evita espacios al principio y al final
          Validators.minLength(1)
        ]
      ]
    });
  }


  async onSubmit() {
    if (this.registroForm.valid) {
      const userData = this.registroForm.value;
  
      // Verificar si ya existe un usuario con el mismo nombre o correo electrónico
      const existingUser = await this.conexionArchivos.obtenerUsuario(userData.name);
      const existingEmail = await this.conexionArchivos.obtenerUsuarioPorEmail(userData.email);
      
      this.usuarioExistente = !!existingUser;
      this.emailExistente = !!existingEmail;

      if (existingUser || existingEmail) {
        console.error('Ya existe un usuario con ese nombre o correo electrónico.');

      } else {
        // Agregar el nuevo usuario solo si no existe un usuario con el mismo nombre o correo electrónico
        this.conexionArchivos.agregarUsuario(userData);
        this.UsuarioRegistrado = true;
        this.registroForm.reset(); // Restablecer el formulario
        console.log('Usuario registrado correctamente:', userData);
        // Puedes realizar acciones adicionales después de guardar los datos
      }
    }
  }

  private scrollPageToTop() {
    // Utiliza el método scrollTo para desplazar la página hacia arriba sin deslizamiento suave
    window.scrollTo(0, 0);
  }
}
