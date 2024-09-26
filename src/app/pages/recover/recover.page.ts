import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
  recoveryForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private alertController: AlertController, private router: Router) {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, this.dominioValidator]],
    });
  }

  ngOnInit() {}

  // Validador para el dominio
  dominioValidator(control: any) {
    const email = control.value;
    if (email && !email.endsWith('@duocuc.cl')) {
      return { domainInvalid: true };
    }
    return null;
  }

  async onSubmit() {
    if (this.recoveryForm.valid) {
      console.log('Formulario válido:', this.recoveryForm.value);
      // Aquí puedes añadir la lógica para recuperar la contraseña

      // Muestra la alerta después de enviar el formulario
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Se ha enviado un correo con instrucciones de recuperación.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {
            // Redirige a la página de inicio de sesión al presionar "Aceptar"
            this.router.navigate(['/login']);
          }
        }]
      });
      await alert.present();
    } else {
      console.log('Formulario no válido');
    }
  }
}