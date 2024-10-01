import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profe',
  templateUrl: './profe.page.html',
  styleUrls: ['./profe.page.scss'],
})
export class ProfePage {
  nombre = 'Wacoldo';
  apellidos = 'Wasida';
  correo = 'wa.wasida@profesor.duocuc.cl';
  profileImage = 'https://via.placeholder.com/150';

  constructor(private alertController: AlertController, private router: Router) {}

  changeProfilePicture() {
    this.profileImage = 'https://via.placeholder.com/150/0000FF/808080';
  }
  async guardarCambios() {
    const alert = await this.alertController.create({
      header: 'Cambios guardados',
      message: 'Tus cambios han sido guardados exitosamente',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/home-profe']);
        }
      }],
    });
    await alert.present();
  }
  goBack() {
    this.router.navigate(['/home-profe']);
  }
}