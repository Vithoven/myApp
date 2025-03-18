import { UtilsService } from './../../services/utils.service';
import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { inject } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {
  uname: string;
  ulaname: string;
  uemail: string;
  currentUser: User = { uid: '', uname: '', ulaname: '', uemail: '', upassword: '' };

  // Dependencias
  private utils = inject(UtilsService);
  private firebaseSvc = inject(FirebaseService);

  constructor() {}

    // Vista de ion al entrar
    ionViewWillEnter() {
      this.loadUserData();
    }
  
    // Cargar datos del usuario
    async loadUserData() {
      const loading = await this.utils.presentLoading();
      loading.present();
  
      const userLocal: User = this.utils.getFromLocalStorage('user');
      if (userLocal) {
        this.currentUser = userLocal;
        this.uname = this.currentUser.uname;
        this.ulaname = this.currentUser.ulaname;
        this.uemail = this.currentUser.uemail;
      }
  
      loading.dismiss();
    }

  // Guardar cambios
  async guardarCambios() {
    const userData = {
      uname: this.uname,
      ulaname: this.ulaname,
      uemail: this.uemail,
    };

    const loading = await this.utils.presentLoading();
    loading.present();

    try {
      await this.firebaseSvc.updateUser(userData);
      this.utils.presentToast({
        icon: 'checkmark-circle-sharp',
        message: 'Cambios guardados exitosamente',
        color: 'success',
      });
    } catch (error) {
      console.error(error);
      this.utils.presentToast({
        icon: 'close-circle-sharp',
        message: 'Error al guardar cambios',
        color: 'danger',
      });
    } finally {
      loading.dismiss();
    }
  }
}