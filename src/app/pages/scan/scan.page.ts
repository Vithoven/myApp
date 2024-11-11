import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  isScanning: boolean = true; 

  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  onScanSuccess(result: string) {
    console.log('Código QR escaneado:', result);
    this.mostrarAlertaExito();
  }

  cancelarEscaneo() {
    this.isScanning = false;
    console.log('Escaneo cancelado');
  }

  async mostrarAlertaFallo() {
    const alert = await this.alertController.create({
      header: 'Escaneo Fallido',
      message: 'Muy lejos de la ubicación del Código QR.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async mostrarAlertaExito() {
    const alert = await this.alertController.create({
      header: 'Escaneo Exitoso',
      message: 'Escaneo exitoso. Asistencia registrada.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}