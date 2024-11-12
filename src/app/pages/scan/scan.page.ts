import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  /* Alerta de escaneo fallido (Temporal) */
  async mostrarAlertaFallo() {
    const alert = await this.alertController.create({
      header: 'Escaneo Fallido',
      message: 'Muy lejos de la ubicación del Código QR.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  /* Alerta de escaneo exitoso */
  async mostrarAlertaExito() {
    const alert = await this.alertController.create({
      header: 'Escaneo Exitoso',
      message: 'Escaneo exitoso. Asistencia registrada.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}