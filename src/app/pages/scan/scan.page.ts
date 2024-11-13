import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  isScanning: boolean = true;
  scannedResult: string = '';
  isScanned: boolean = false;

  constructor(private alertController: AlertController) { }

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

  async mostrarAlertaExito(codigoQR: string) {
    const alert = await this.alertController.create({
      header: 'Escaneo Exitoso',
      message: `Escaneo exitoso. El código QR es: ${codigoQR}`,
      buttons: ['OK'],
    });
    await alert.present();
  }

  cancelarEscaneo() {
    this.isScanning = false;
    console.log('Escaneo cancelado');
  }
}
