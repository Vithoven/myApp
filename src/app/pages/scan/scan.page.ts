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
  qrData: string = ''; // Almacena los datos para el QR generado

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  async onScanSuccess(result: string) {
    if (!this.isScanned) {
      console.log('Código QR escaneado:', result);
      this.scannedResult = result;
      this.isScanned = true;
      this.isScanning = false; 

      const alert = await this.alertController.create({
        header: 'Escaneo Exitoso',
        message: `Escaneo exitoso. Redirigiendo a: ${result}`,
        buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl(result);
          }
        }],
      });
      await alert.present();
    }
  }

  // Genera el código QR con el valor específico para cada materia
  generarQR(subject: string) {
    switch (subject) {
      case 'ingles':
        this.qrData = '/register-assistance/ingles';
        break;
      case 'arquitectura':
        this.qrData = '/register-assistance/arquitectura';
        break;
      case 'programacion':
        this.qrData = '/register-assistance/programacion';
        break;
      default:
        this.qrData = '';
    }
    console.log('QR generado:', this.qrData);  // Verificar que qrData tiene el valor correcto
  }
}
