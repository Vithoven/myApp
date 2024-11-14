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
  asignatura: string = ''; // Nombre de la clase
  qrData: string = ''; // JSON convertido a cadena para el QR
  currentUser: User = { uid: '', uname: '', ulaname: '', uemail: '', upassword: '' };
  nombre: string = '';

  // DEPENDENCIAS
  private utils = inject(UtilsService);
  private firebaseSvc = inject(FirebaseService);

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
    // Recibe el nombre de la asignatura
    this.route.queryParams.subscribe(params => {
      this.asignatura = params['asignatura'];

      // Crear el objeto Asistencia con los datos necesarios
      const asistencia: Asistencia = {
        clase: this.asignatura,
        fecha: new Date().toISOString(), // Fecha actual en formato ISO
        estado: 'presente',
        idEstudiante: ''// Id del estudiante actual
      };

      // Convertir el objeto Asistencia a cadena JSON y asignarlo a qrData
      this.qrData = JSON.stringify(asistencia);
    });
  }
}