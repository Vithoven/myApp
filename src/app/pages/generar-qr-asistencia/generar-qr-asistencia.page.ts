import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QrCodeModule } from 'ng-qrcode';
@Component({
  selector: 'app-generar-qr-asistencia',
  templateUrl: './generar-qr-asistencia.page.html',
  styleUrls: ['./generar-qr-asistencia.page.scss'],
})
export class GenerarQrAsistenciaPage implements OnInit {
  asignatura: string = ''; // Almacena el nombre de la asignatura
  qrCodeImage: string = ''; // URL para el código QR

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //Recibe el nombre de la asignatura 
    this.route.queryParams.subscribe(params => {
      this.asignatura = params['asignatura'];
    });

    // Se puede simular el código QR con una URL o generar uno real más adelante
    this.qrCodeImage = 'https://via.placeholder.com/200x200.png?text=QR+Code'; 
  }

}
