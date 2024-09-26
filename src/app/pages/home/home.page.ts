import { CommonModule } from '@angular/common';
import { Component, importProvidersFrom } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { EncabezadoComponent } from 'src/app/components/encabezado/encabezado.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private alertController: AlertController, private router: Router) {}

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
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }
}
