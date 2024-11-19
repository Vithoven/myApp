import { Component, OnInit, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Asistencia } from 'src/app/models/asistencia.model'; // Asegúrate de tener la ruta correcta
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-generar-qr-asistencia',
  templateUrl: './generar-qr-asistencia.page.html',
  styleUrls: ['./generar-qr-asistencia.page.scss'],
})
export class GenerarQrAsistenciaPage implements OnInit {
  asignatura: string = ''; // Almacena el nombre de la asignatura
  qrCodeImage: string = ''; // URL para el código QR

  constructor(private route: ActivatedRoute) { }
  ionViewWillEnter(){
    this.firebaseSvc.getAuthIns().onAuthStateChanged( user => {
      let userLocal:User = this.utils.getFromLocalStorage('user');
      if(userLocal) {
        this.nombre = userLocal.uname
        this.currentUser = userLocal
      } else {
        this.firebaseSvc.getCurrentUserData().then( usr => {
          if (usr) this.nombre = usr.uname;
          else this.nombre = '';
        });
      }
    })
  }

  ngOnInit() {
    //Recibe el nombre de la asignatura 
    this.route.queryParams.subscribe(params => {
      this.asignatura = params['asignatura'];
    });

    // Se puede simular el código QR con una URL o generar uno real más adelante
    this.qrCodeImage = 'https://via.placeholder.com/200x200.png?text=QR+Code'; 
  }

}
