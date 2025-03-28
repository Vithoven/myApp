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

  async obtenerClase() {
    const loading = await this.utilsSvc.presentLoading();
    await loading.present();

    this.firebaseSvc.getCollection('clase').subscribe(async clase => {
      let nuevasClases = clase as Clase[];
      this.clases = nuevasClases;
      console.log('Taller asignado:', this.clases);
      await loading.dismiss();
    }, async error => {
      console.error('Error al obtener talleres:', error);
      await loading.dismiss();
    });
  }

  goToQR(clase: Clase) {
    this.router.navigate(['/generar-qr-asistencia'], { queryParams: { asignatura: clase.nombreClase, seccion: clase.seccion } });
  }
}
