import { Component, inject, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home-profe',
  templateUrl: './home-profe.page.html',
  styleUrls: ['./home-profe.page.scss'],
})
export class HomeProfePage implements OnInit {
  nombre!: string;
  apellidos!: string;


  private alertController = inject(AlertController);
  private firebaseSvc = inject(FirebaseService);
  private utils = inject(UtilsService);
  private router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.firebaseSvc.getAuthIns().onAuthStateChanged((user) => {
      const userLocal: User = this.utils.getFromLocalStorage('user');

      if (userLocal) {
        this.nombre = userLocal.uname;
        this.apellidos = userLocal.ulaname;
      } else {
        this.firebaseSvc.getCurrentUserData().then((usr) => {
          if (usr) {
            this.nombre = usr.uname;
            this.apellidos = usr.ulaname;
          } else {
            this.nombre = '';
          }
        });
      }
    });
  }

  ionViewWillEnter() {
    this.loadUserData();
  }


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

  //=====FUNCIÓN PARA CERRAR SESIÓN=====//
  private async logoutUser() {
    try {
      localStorage.clear();

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