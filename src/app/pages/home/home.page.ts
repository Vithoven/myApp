import { CommonModule } from '@angular/common';
import { Component, importProvidersFrom, inject} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { EncabezadoComponent } from 'src/app/components/encabezado/encabezado.component';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  //=====DEPENDENCIAS=====//
  private alertController = inject(AlertController);
  private firebaseSvc = inject(FirebaseService);
  private utils = inject(UtilsService);

  //=====VARIABLES=====//
  nombre!: string;
  apellidos!: string;

  //=====MOSTRAR DATOS DE USUARIO EN HOME=====//
  ngOnInit() {
    this.firebaseSvc.getAuthIns().onAuthStateChanged( user => {
      let userLocal:User = this.utils.getFromLocalStorage('user');

      if(userLocal) {
        this.nombre = userLocal.uname, this.apellidos =userLocal.ulaname;
      } else {
        this.firebaseSvc.getCurrentUserData().then( usr => {
          if (usr) this.nombre = usr.uname, this.apellidos =usr.ulaname;
          else this.nombre = '';
        });
      }
    })
  }

  //=====CAMBIAR DATOS EN HOME EN TIEMPO REAL=====//
  ionViewWillEnter() {
    
    let userLocal:User = this.utils.getFromLocalStorage('user');

    if(userLocal) {
      this.nombre = userLocal.uname
      this.apellidos = userLocal.ulaname
    } else {
      this.firebaseSvc.getCurrentUserData().then( usr => {
        if (usr) this.nombre = usr.uname, this.apellidos =usr.ulaname;
        else this.nombre = '';
      });
    }
  
}


  //=====CERRAR SESION=====//
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
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }
}
