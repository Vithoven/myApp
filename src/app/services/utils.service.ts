import { inject, Injectable } from '@angular/core';
import { ToastController, ToastOptions, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  toastCtrl = inject(ToastController);
  loadingCtrl = inject(LoadingController);


  //=====TOAST=====//
  async presentToast(opts?: ToastOptions){
    const toast = await this.toastCtrl.create(opts)
    toast.present();
  }
  
  //=====LOADING=====//
  async presentLoading(texto: string){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'crescent',
      duration: 0,
      translucent: true
    });
    await loading.present();
  }
}
