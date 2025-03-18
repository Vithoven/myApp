import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
  
  // Inyecciones
  private firebaseSvc = inject(FirebaseService);
  private utils = inject(UtilsService);

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])
  });


  ngOnInit() {}

  async sendEmail() {
    const email = this.emailForm.value.email;
    if (email) {
      const loading = await this.utils.presentLoading();
      loading.present();
      this.firebaseSvc.resetPasswordEmail(email).catch( error => {
        this.utils.presentToast({
          icon: 'close-circle-sharp',
          message: 'Ocurrió un error, Vuelva a intentarlo.',
          color: 'danger',
          duration: 2500
        });
      }).finally( () => {
        loading.dismiss();
        this.utils.presentAlert({
          header: 'Correo enviado',
          message: 'Revisa tu bandeja de entrada para restablecer tu contraseña.',
          buttons: ['Aceptar']
        }).then( alert => {
          alert.onDidDismiss().then( () => {
            this.utils.navigateRoot('/login');
          });
        })
      });
    }
  }
}