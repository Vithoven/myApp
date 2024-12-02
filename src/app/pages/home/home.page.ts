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

  // Inyección de dependencias usando el nuevo patrón de inyección con `inject()`
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

  //=====FUNCIÓN PARA CERRAR SESIÓN=====//
  private async logoutUser() {
    try {
      // Limpia los datos de almacenamiento local usando el método estándar
      localStorage.clear();  // Usando directamente localStorage.clear()

      // Cierra sesión en Firebase
      await this.firebaseSvc.signOut();

      // Verifica si el usuario está correctamente desconectado antes de redirigir
      const currentUser = await this.firebaseSvc.getAuthIns().currentUser;
      if (!currentUser) {
        console.log('Usuario desconectado correctamente');
        // Redirige al login
        this.router.navigate(['/login']);  // Redirigir al login
      } else {
        console.error('Error al desconectar al usuario');
      }
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  }
}
