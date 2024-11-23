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

  // Función para mostrar un toast
  presentToast(opts: ToastOptions) {
    this.toastCtrl.create(opts).then(toast => {
      toast.present();
    });
  }

  // Función para mostrar un loading spinner
  presentLoading() {
    return this.loadingCtrl.create({
      spinner: 'crescent',
      message: 'Cargando...',
    });
  }

  // Función para mostrar una alerta
  async presentAlert(opts?: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);
    alert.present();
    return alert;
  }

  // Navegar hacia una ruta
  navigateForwardto(route: string, extras?: NavigationExtras) {
    this.navCtrl.navigateForward(route, extras);
  }

  // Navegar hacia atrás
  navigateBack() {
    this.navCtrl.back();
  }

  // Navegar hacia la raíz (inicio) de la aplicación
  navigateRoot(route: string, extras?: NavigationExtras) {
    this.navCtrl.navigateRoot(route, extras);
  }

  // Guardar datos en el localStorage
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  // Obtener datos desde el localStorage
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }

  // Recuperar eventos del router
  retrieveRouterEvents() {
    return this.router.events;
  }

  // Función para limpiar datos del localStorage (por ejemplo, al hacer logout)
  clearLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  // Redirigir al login, en caso de que sea necesario
  navigateToLogin() {
    this.navigateRoot('/login');
  }

  constructor() { }
}
