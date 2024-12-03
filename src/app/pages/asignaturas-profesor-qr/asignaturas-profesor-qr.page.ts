import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { Clase } from 'src/app/models/clase.model';

@Component({
  selector: 'app-asignaturas-profesor-qr',
  templateUrl: './asignaturas-profesor-qr.page.html',
  styleUrls: ['./asignaturas-profesor-qr.page.scss'],
})
export class AsignaturasProfesorQrPage implements OnInit {
  clases: Clase[] = [];
  nombresClases: string[] = [];


  constructor(private firebaseSvc: FirebaseService, private utilsSvc: UtilsService, private router: Router) { }

  ngOnInit() {
    this.obtenerClase();
  }

  obtenerClase() {
    this.firebaseSvc.getCollection('clase').subscribe(async clase => {
      let nuevasClases = clase as Clase[];{
        
      }
      this.clases = nuevasClases;
      console.log('Clase asignada:', this.clases);
    });
  }

  goToQR(clase : Clase) {
    this.router.navigate(['/generar-qr-asistencia'], { queryParams: { asignatura : clase.nombreClase, seccion: clase.seccion } });
  }
}
