import { Component, OnInit, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Asistencia } from 'src/app/models/asistencia.model';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-generar-qr-asistencia',
  templateUrl: './generar-qr-asistencia.page.html',
  styleUrls: ['./generar-qr-asistencia.page.scss'],
})
export class GenerarQrAsistenciaPage implements OnInit {
  asignatura: string = '';
  seccion: string = '';
  qrData: string = '';
  currentUser: User = { uid: '', uname: '', ulaname: '', uemail: '', upassword: '' };
  nombre: string = '';

  // Dependencias
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
      this.seccion = params['seccion'];
  
      // Crear el objeto Asistencia con los datos necesarios
      const asistencia: Asistencia = {
        clase: this.asignatura,
        seccion: this.seccion,
        fecha: new Date().toISOString().split('T')[0],
        estado: 'PRESENTE',
        idEstudiante: '',
        nomEstudiante: ''
      };
  
      // Convertir el objeto Asistencia a cadena JSON y asignarlo a qrData
      this.qrData = JSON.stringify(asistencia);
    });
  }
}