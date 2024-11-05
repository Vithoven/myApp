import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generar-qr-asistencia',
  templateUrl: './generar-qr-asistencia.page.html',
  styleUrls: ['./generar-qr-asistencia.page.scss'],
})
export class GenerarQrAsistenciaPage implements OnInit {
  asignatura: string = ''; 
  qrCodeValue: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.asignatura = params['asignatura'];
      this.qrCodeValue = `Asistencia-${this.asignatura}`;
    });
  }
}
