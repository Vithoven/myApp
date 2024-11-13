import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UtilsService } from 'src/app/services/utils.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  private allowedRange = 10; // Rango permitido en metros
  isSupported = false;
  barcodes: Barcode[] = [];
  studentData: any; // Reemplazar el valor inicial con datos del estudiante logueado
  scannedQrData: any;


  constructor(
    private alertController: AlertController,
    private firestore: AngularFirestore,
    private utilService: UtilsService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Verificar si BarcodeScanner es compatible
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

    // Cargar los datos del estudiante logueado
    this.studentData = this.utilService.getFromLocalStorage('user');
  }

  async getCurrentPosition() {
    const position = await Geolocation.getCurrentPosition();
    const studentLatitude = position.coords.latitude;
    const studentLongitude = position.coords.longitude;
    return { studentLatitude, studentLongitude };
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
