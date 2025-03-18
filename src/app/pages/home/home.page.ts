import { Component, inject, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nombre!: string;
  apellidos!: string;
  nombreCompleto!: string;

  // Dependencias
  private alertController = inject(AlertController);
  private firebaseSvc = inject(FirebaseService);
  private utils = inject(UtilsService);
  private router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.loadUserData();
  }

  // Cargar los datos del usuario
  loadUserData() {
    const userLocal: User = this.utils.getFromLocalStorage('user');

    if (userLocal) {
      this.nombre = userLocal.uname;
      this.apellidos = userLocal.ulaname;
      this.nombreCompleto = `${this.nombre} ${this.apellidos}`;
    } else {
      this.firebaseSvc.getAuthIns().onAuthStateChanged((user) => {
        if (user) {
          this.firebaseSvc.getCurrentUserData().then((usr) => {
            if (usr) {
              this.nombre = usr.uname;
              this.apellidos = usr.ulaname;
              this.nombreCompleto = `${this.nombre} ${this.apellidos}`; 
            } else {
              this.nombre = '';
              this.apellidos = '';
              this.nombreCompleto = '';
            }
          });
        }
      });
    }
  }
  // Función que se ejecuta cuando la vista va a entrar
  ionViewWillEnter() {
    this.loadUserData();
  }
  // Confirmar logout
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
            this.logoutUser();
          },
        },
      ],
    });
    await alert.present();
  }
  // Funcion para cerrar sesion
  private async logoutUser() {
    try {
      await this.firebaseSvc.signOut();

      const currentUser = await this.firebaseSvc.getAuthIns().currentUser;
      if (!currentUser) {
        console.log('Usuario desconectado correctamente');
        this.router.navigate(['/login']);
      } else {
        console.error('Error al desconectar al usuario');
      }
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  }
}