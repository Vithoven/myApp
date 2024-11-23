import { inject, Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController, ToastOptions, LoadingController, AlertController, AlertOptions, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  //=====DEPENDENCIAS=====//
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);
  private alertCtrl = inject(AlertController);
  private navCtrl = inject(NavController);
  private router = inject(Router);

  presentToast(opts: ToastOptions) {
    this.toastCtrl.create(opts).then(toast => {
      toast.present();
    });
  }

  presentLoading() {
    return this.loadingCtrl.create({
      spinner: 'crescent',
      message: 'Cargando...',
    });
  }

  async presentAlert(opts?: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);
    alert.present();
    return alert;
  }

  navigateForwardto(route: string, extras?: NavigationExtras) {
    this.navCtrl.navigateForward(route, extras);
  }

  navigateBack() {
    this.navCtrl.back();
  }

  navigateRoot(route: string, extras?: NavigationExtras) {
    this.navCtrl.navigateRoot(route, extras);
  }

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }

  retrieveRouterEvents() {
    return this.router.events;
  }

  clearLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  navigateToLogin() {
    this.navigateRoot('/login');
  }

  constructor() { }
}