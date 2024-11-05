import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  isScanning: boolean = true; // Variable para controlar el estado del escaneo

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  // Función que se llama cuando el escaneo es exitoso
  onScanSuccess(result: string) {
    console.log('Código QR escaneado:', result);
    this.mostrarAlertaExito();
  }

  // Función para cancelar el escaneo
  cancelarEscaneo() {
    this.isScanning = false; // Detenemos el escaneo
    console.log('Escaneo cancelado');
  }

  // Alerta de escaneo fallido
  async mostrarAlertaFallo() {
    const alert = await this.alertController.create({
      header: 'Escaneo Fallido',
      message: 'Muy lejos de la ubicación del Código QR.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Alerta de escaneo exitoso
  async mostrarAlertaExito() {
    const alert = await this.alertController.create({
      header: 'Escaneo Exitoso',
      message: 'Escaneo exitoso. Asistencia registrada.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
