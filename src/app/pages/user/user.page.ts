import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})

/* Datos por defecto */
export class UserPage {
  nombre = 'Jimenito';
  apellidos = 'Alcachofa';
  correo = 'ji.alcachofa@duocuc.cl';
  profileImage = 'https://via.placeholder.com/150';

  constructor(private alertController: AlertController, private router: Router) {}

  changeProfilePicture() {
    this.profileImage = 'https://via.placeholder.com/150/0000FF/808080';
  }

  /* Funcion guardar cambios */
  async guardarCambios() {
    const alert = await this.alertController.create({
      header: 'Cambios guardados',
      message: 'Tus cambios han sido guardados exitosamente',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/home']); // Redirigir a la página de inicio
        }
      }],
    });
    await alert.present();
  }
}
