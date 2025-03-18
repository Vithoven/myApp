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
  /**
   * Lista de clases obtenidas desde la base de datos.
   */
  clases: Clase[] = [];

  /**
   * Lista de asistencias filtradas por el usuario actual.
   */
  asistencias: Asistencia[] = [];

  /**
   * Información del usuario actual.
   */
  currentUser: User = { uid: '', uname: '', ulaname: '', uemail: '', upassword: '' };

  /**
   * Constructor de la clase.
   * 
   * @param firebaseService Servicio para interactuar con Firebase.
   * @param utils Servicio de utilidades.
   */
  constructor(private firebaseService: FirebaseService, private utils: UtilsService) {}

  /**
   * Llama al método para obtener los talleres.
   */
  ngOnInit() {
    this.getAsignaturas();
  }

  /**
   * Método que se ejecuta cada vez que la vista va a entrar en primer plano.
   * Verifica la autenticación del usuario y actualiza la información del usuario actual.
   */
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

  /**
   * Obtiene la lista de asignaturas desde la colección 'clase' en Firebase.
   * Luego llama al método para obtener las asistencias.
   */
  getAsignaturas() {
    this.firebaseService.getCollection('clase').subscribe(clases => {
      this.clases = clases as Clase[];
      console.log('Clases obtenidas:', this.clases);
      this.getAsistencias();
    });
  }

  /**
   * Obtiene la lista de asistencias desde la colección 'asistencia' en Firebase.
   * Filtra las asistencias para obtener solo las del usuario actual.
   */
  getAsistencias() {
    this.firebaseService.getCollection('asistencia').subscribe(asistencia => {
      this.asistencias = (asistencia as Asistencia[]).filter(asistencia => asistencia.idEstudiante === this.currentUser.uid);
      console.log('Asistencias filtradas:', this.asistencias);
    });
  }
}