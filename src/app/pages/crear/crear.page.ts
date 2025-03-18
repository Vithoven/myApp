import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {

  
  // Dependencias
  authSvc = inject(FirebaseService);
  utils = inject(UtilsService);

  // Formulario
  createUserForm = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(4)]),
    ulaname: new FormControl('', [Validators.required, Validators.minLength(4)]),
    uemail: new FormControl('', [Validators.email, Validators.required]),
    upassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  ngOnInit() {
  }

  // Validacion de contraseña
  validarContraseniasIguales() {
    const pass1 = this.createUserForm.value.upassword;
    const pass2 = this.createUserForm.value.password2;

    if (pass1 !== pass2) {
      this.createUserForm.controls.password2.setErrors({ noIguales: true});
    }
  }

  // Registro
async signUp() {
  if (this.createUserForm.valid) {
    const loading = await this.utils.presentLoading();
    loading.present();
    const email = this.createUserForm.value.uemail;
    const password = this.createUserForm.value.upassword;
    const nombre = this.createUserForm.value.uname;
    const apellidos = this.createUserForm.value.ulaname;
    try {
      const user = await this.authSvc.signUp(email!, password!, nombre!, apellidos!);
      if (user) {
        this.utils.navigateForwardto("/login");
      }
    } catch (error) {
      let errorMessage = 'Error al registrarse';
      if (!navigator.onLine) {
        errorMessage = 'No hay conexión a Internet. Por favor, inténtelo de nuevo más tarde.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'El correo electrónico ya está registrado. Por favor, use otro correo.';
      }
      this.utils.presentToast({
        icon: 'close-circle-sharp',
        message: errorMessage,
        color: 'danger',
        duration: 2500
      });
    } finally {
      loading.dismiss();
    }
  }
}
}