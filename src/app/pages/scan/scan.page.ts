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

  // Función para manejar el resultado del escaneo
  onScanSuccess(result: string) {
    console.log('Código QR escaneado:', result); // Aquí se imprime el resultado del escaneo
    this.mostrarAlertaExito(); // Llamar a la alerta de éxito
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
