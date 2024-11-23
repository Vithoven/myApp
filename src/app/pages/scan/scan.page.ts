import { Component, OnInit, inject } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UtilsService } from 'src/app/services/utils.service';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';
import { Asistencia } from 'src/app/models/asistencia.model';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  private allowedRange = 10;
  isSupported = false;
  barcodes: Barcode[] = [];
  studentData: any;
  scannedQrData: any;
  currentUser: User = { uid: '', uname: '', ulaname: '', uemail: '', upassword: '' };
  asistencia: Asistencia = { clase: '', fecha: '', estado: 'ausente', idEstudiante: '' };

  private utils = inject(UtilsService);
  private firebaseSvc = inject(FirebaseService);

  constructor(
    private alertController: AlertController,
    private firestore: AngularFirestore,
    private utilService: UtilsService,
    private navCtrl: NavController
  ) {
    BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  ionViewWillEnter() {
    this.firebaseSvc.getAuthIns().onAuthStateChanged((user) => {
      const userLocal: User = this.utils.getFromLocalStorage('user');
      if (userLocal) {
        this.currentUser = userLocal;
      }
    });
  }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

    this.studentData = this.utilService.getFromLocalStorage('user');
  }

  goBack() {
    this.navCtrl.back();
  }

  async scan(): Promise<any> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert('Permiso denegado', 'Para usar la aplicación autorizar los permisos de cámara');
      return null;
    }

    const { barcodes } = await BarcodeScanner.scan();
    if (barcodes.length > 0) {
      try {
        const qrData = JSON.parse(barcodes[0].displayValue);
        const { clase, fecha, estado, idEstudiante } = qrData;
        qrData.idEstudiante = this.currentUser.uname;

        await this.saveAttendance(clase, fecha, estado, idEstudiante);
      } catch (error) {
        console.error('Error al procesar el código QR:', error);
        await this.presentAlert('Error', 'El código QR escaneado es inválido.');
        return null;
      }
    } else {
      console.log('No se pudo escanear el QR.');
      return null;
    }
  }

  async saveAttendance(clase: string, fecha: string, estado: string, uid: string): Promise<void> {
    try {
      const documentId = `${clase}_${fecha}_${this.currentUser.uid}`;
      this.asistencia = {
        clase: clase,
        fecha: fecha,
        estado: 'presente',
        idEstudiante: this.currentUser.uid,
      };

      if (navigator.onLine) {
        await this.firebaseSvc.registerAssist(this.asistencia);
        console.log('Asistencia registrada en Firebase.');
      } else {
        this.saveToLocalStorage(this.asistencia);
        console.log('Asistencia guardada localmente.');
      }

      await this.presentAlert('Éxito', 'Asistencia registrada.');
    } catch (error) {
      console.error('Error al guardar la asistencia:', error);
      await this.presentAlert('Error', 'No se pudo registrar la asistencia.');
    }
  }

  saveToLocalStorage(asistencia: Asistencia) {
    const storedData = localStorage.getItem('asistencias');
    const asistencias = storedData ? JSON.parse(storedData) : [];

    const exists = asistencias.some(
      (a: Asistencia) =>
        a.clase === asistencia.clase && a.fecha === asistencia.fecha && a.idEstudiante === asistencia.idEstudiante
    );

    if (!exists) {
      asistencias.push(asistencia);
      localStorage.setItem('asistencias', JSON.stringify(asistencias));
      console.log('Asistencia añadida al local storage:', asistencia);
    } else {
      console.log('La asistencia ya existe en el local storage.');
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}