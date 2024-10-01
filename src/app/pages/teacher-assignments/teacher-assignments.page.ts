import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-assignments',
  templateUrl: './teacher-assignments.page.html',
  styleUrls: ['./teacher-assignments.page.scss'],
})
export class TeacherAssignmentsPage {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/home-profe']); // Navega a la página de inicio del profesor
  }

  goToRegister(asignatura: string) {
    // Lógica para navegar a la página de registro de asignaturas
    console.log('Navegando a:', asignatura);
    // Aquí podrías añadir el código para redirigir a la página específica según la asignatura
    // Por ejemplo:
    this.router.navigate([`/register/${asignatura}`]); // Asegúrate de que esta ruta sea correcta
  }
}
