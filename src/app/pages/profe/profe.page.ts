import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-profe',
  templateUrl: './profe.page.html',
  styleUrls: ['./profe.page.scss'],
})
export class ProfePage {
  profileImage: string = 'assets/img/default_profile.png';
  nombre: string = 'Wacoldo'; 
  apellidos: string = 'Wasida'; 
  correo: string = 'wa.wasida@profesor.duocuc.cl';

  constructor(private actionSheetCtrl: ActionSheetController) {}
  async changeProfilePicture() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Cambiar foto de perfil',
      buttons: [
        {
          text: 'Tomar foto',
          icon: 'camera',
          handler: () => {
            console.log('Tomar foto');
          },
        },
        {
          text: 'Seleccionar desde galería',
          icon: 'image',
          handler: () => {
            console.log('Seleccionar desde galería');
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  guardarCambios() {
    console.log('Cambios guardados');
  }
}