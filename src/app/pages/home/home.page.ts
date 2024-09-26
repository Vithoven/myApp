import { CommonModule } from '@angular/common';
import { Component, importProvidersFrom } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { EncabezadoComponent } from 'src/app/components/encabezado/encabezado.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private alertController: AlertController) {}

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Confirmar cierre de sesión',
      message: '¿Desea cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: () => {
            console.log('Sesión cerrada');
          }
        }
      ]
    });
    await alert.present();
  }
}
