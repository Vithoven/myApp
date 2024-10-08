import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignaturas-profesor-qr',
  templateUrl: './asignaturas-profesor-qr.page.html',
  styleUrls: ['./asignaturas-profesor-qr.page.scss'],
})
export class AsignaturasProfesorQrPage implements OnInit {

  constructor(private router:Router) { }

  goToQR(asignatura: string) {
    this.router.navigate(['/generar-qr-asistencia'], { queryParams: { asignatura } });
  }

  ngOnInit() {
  }

}
