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
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
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

  //=====OBTENER Y VERIFICAR EL ROL DEL USUARIO=====//
  getUserRole(): string {
    const userRole = this.getFromLocalStorage('userRole');
    return userRole ? userRole : 'alumno';
  }

  //=====NAVIGACIÓN DE REDIRECCIÓN BASADA EN EL ROL=====//
  navigateBasedOnRole() {
    const role = this.getUserRole();
    if (role === 'profesor') {
      this.navigateRoot('/home-profe');
    } else if (role === 'alumno') {
      this.navigateRoot('/home-alumno');
    } else {
      this.navigateToLogin();
    }
  }

  //=====GESTIÓN DE USUARIO=====//
  setUserRole(role: string) {
    this.saveInLocalStorage('userRole', role);
  }

  //=====CERRAR SESION======//
  async signOut() {
    try {
      // Limpia el almacenamiento local
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      
      // Redirige al login
      this.navigateToLogin();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  constructor() { }
}