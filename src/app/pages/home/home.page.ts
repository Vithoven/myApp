import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';  // Importar AlertController

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private alertController: AlertController) {}

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Confirmar Cierre de Sesión',
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
