import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage {
  createUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private alertController: AlertController) {
    this.createUserForm = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email, this.emailDomainValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: this.matchPasswords('password', 'confirmPassword')
    });
  }

  // Validador personalizado para el dominio de correo
  emailDomainValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;
    if (email && email.indexOf('@duocuc.cl') === -1) {
      return { emailDomain: true };
    }
    return null;
  }

  // Validador para comparar contraseñas
  matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[confirmPassword];

      if (confirmPassControl.errors && !confirmPassControl.errors['mustMatch']) {
        return;
      }

      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
      } else {
        confirmPassControl.setErrors(null);
      }
    };
  }

  // Método para enviar el formulario
  async onSubmit() {
    if (this.createUserForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos correctamente.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Usuario Creado',
      message: 'El usuario ha sido creado correctamente.',
      buttons: ['OK']
    });
    await alert.present();
  }

  subirFoto() {
    console.log('Subir foto de perfil');
  }
}