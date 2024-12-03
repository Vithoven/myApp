import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Asistencia } from 'src/app/models/asistencia.model';
import { Clase } from 'src/app/models/clase.model';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-select-assistance',
  templateUrl: './select-assistance.page.html',
  styleUrls: ['./select-assistance.page.scss'],
})
export class SelectAssistancePage implements OnInit {
  clases: Clase[] = [];
  asistencias: Asistencia[] = [];
  currentUser: User = { uid: '', uname: '', ulaname: '', uemail: '', upassword: '' };

  constructor(private firebaseService: FirebaseService, private utils: UtilsService) {}

  ngOnInit() {
    this.getAsignaturas();
  }

  ionViewWillEnter() {
    this.firebaseService.getAuthIns().onAuthStateChanged((user) => {
      const userLocal: User = this.utils.getFromLocalStorage('user');
      if (userLocal) {
        this.currentUser = userLocal;
      }
      console.log('Usuario actual:', this.currentUser);
      this.getAsignaturas();
    });
  }

  getAsignaturas() {
    this.firebaseService.getCollection('clase').subscribe(clases => {
      this.clases = clases as Clase[];
      console.log('Clases obtenidas:', this.clases);
      this.getAsistencias();
    });
  }

  getAsistencias() {
    this.firebaseService.getCollection('asistencia').subscribe(asistencia => {
      this.asistencias = (asistencia as Asistencia[]).filter(asistencia => asistencia.idEstudiante === this.currentUser.uid);
      console.log('Asistencias filtradas:', this.asistencias);
    });
  }
}