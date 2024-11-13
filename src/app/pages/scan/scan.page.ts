import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';  // Asegúrate de importar el Router

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
    private router: Router  // Inyecta el Router
  ) {}

  ngOnInit() {}

  onScanSuccess(result: string) {
    if (!this.isScanned) {
      console.log('Código QR escaneado:', result);
      this.scannedResult = result;
      this.isScanned = true;
      this.isScanning = false; 
      this.mostrarAlertaExito(result);  // Llamada para mostrar alerta de éxito
    }
  }

  cancelarEscaneo() {
    this.isScanning = false;
    console.log('Escaneo cancelado');
  }

  // Mostrar alerta de escaneo exitoso y redirigir
  async mostrarAlertaExito(codigoQR: string) {
    const alert = await this.alertController.create({
      header: 'Escaneo Exitoso',
      message: `Escaneo exitoso. El código QR es: ${codigoQR}`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Aquí se pasa el parámetro 'subject' a la ruta
            this.router.navigate(['/register-assistance', { subject: 'ingles' }]);  // Cambia 'ingles' por el valor adecuado
          },
        },
      ],
    });
    await alert.present();
  }

  // Función para manejar errores de escaneo
  onScanError(error: any) {
    console.log('Error en escaneo:', error);  // Imprimir el error en consola

    // Mostrar alerta de error
    this.mostrarAlertaError('Escaneo fallido. Intente nuevamente.');
  }

  // Mostrar alerta de error
  async mostrarAlertaError(message: string) {
    const alert = await this.alertController.create({
      header: 'Error en Escaneo',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
