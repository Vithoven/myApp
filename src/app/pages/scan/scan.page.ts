import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  isScanning: boolean = true; 
  qrData: string = 'RegistroAsistencia123'; // El texto o dato que deseas incluir en el QR
  generatedQRCode: string | null = null;
  scannedBarcodes: Barcode[] = [];

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.generatedQRCode = this.qrData; // Genera el código QR al iniciar
  }

  // Escaneo exitoso
  async onScanSuccess(result: Barcode[]) {
    this.scannedBarcodes = result;
    console.log('Código QR escaneado:', result[0]?.rawValue);
    this.mostrarAlertaExito();
  }

  // Cancelar escaneo
  cancelarEscaneo() {
    this.isScanning = false;
    console.log('Escaneo cancelado');
  }

  // Solicitar permisos y escanear
  async startScanning() {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.onScanSuccess(barcodes);
  }

  // Solicitud de permisos
  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  // Alerta de fallo en escaneo
  async mostrarAlertaFallo() {
    const alert = await this.alertController.create({
      header: 'Escaneo Fallido',
      message: 'Muy lejos de la ubicación del Código QR.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Alerta de éxito en escaneo
  async mostrarAlertaExito() {
    const alert = await this.alertController.create({
      header: 'Escaneo Exitoso',
      message: `Código escaneado: ${this.scannedBarcodes[0]?.rawValue || 'Desconocido'}`,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Alerta de permiso denegado
  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Para usar la aplicación autorizar los permisos de cámara',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
