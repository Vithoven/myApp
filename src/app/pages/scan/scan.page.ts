import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  isScanning: boolean = true;
  scannedResult: string = '';
  isScanned: boolean = false;

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  onScanSuccess(result: string) {
    if (!this.isScanned) {
      console.log('Código QR escaneado:', result);
      this.scannedResult = result;
      this.isScanned = true;
      this.isScanning = false; 
      this.mostrarAlertaExito(result);
    }
  }

  cancelarEscaneo() {
    this.isScanning = false;
    console.log('Escaneo cancelado');
  }

  async mostrarAlertaExito(codigoQR: string) {
    const alert = await this.alertController.create({
      header: 'Escaneo Exitoso',
      message: `Escaneo exitoso. El código QR es: ${codigoQR}`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/register-assistance', { subject: 'ingles' }]);
          },
        },
      ],
    });
    await alert.present();
  }
  onScanError(error: any) {
    console.log('Error en escaneo:', error);

    this.mostrarAlertaError('Escaneo fallido. Intente nuevamente.');
  }

  async mostrarAlertaError(message: string) {
    const alert = await this.alertController.create({
      header: 'Error en Escaneo',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
