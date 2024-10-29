import { inject, Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  toastCtrl = inject(ToastController);


  //=====TOAST=====//
  async presentToast(opts?: ToastOptions){
    const toast = await this.toastCtrl.create(opts)
    toast.present();
  }
}
