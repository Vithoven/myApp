import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Asistencia } from 'src/app/models/asistencia.model';
import { Clase } from 'src/app/models/clase.model';

@Component({
  selector: 'app-teacher-assignments',
  templateUrl: './teacher-assignments.page.html',
  styleUrls: ['./teacher-assignments.page.scss'],
})
export class TeacherAssignmentsPage implements OnInit {
  clases: Clase[] = [];
  asistencias: Asistencia[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.getAsignaturas();
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
      this.asistencias = asistencia as Asistencia[];
      console.log('Asistencias obtenidas:', this.asistencias);
    });
  }

  getAsistenciasPorClase(clase: string) {
    return this.asistencias.filter(asistencia => asistencia.clase === clase);
  }

  getAsistenciasPorDia(clase: string, fecha: string) {
    return this.asistencias.filter(asistencia => asistencia.clase === clase && asistencia.fecha.split('T')[0] === fecha);
  }

  getFechasPorClase(clase: string) {
    const fechas = this.asistencias
      .filter(asistencia => asistencia.clase === clase)
      .map(asistencia => asistencia.fecha.split('T')[0]);
    return Array.from(new Set(fechas));
  }
}