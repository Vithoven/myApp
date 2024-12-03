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
  isSupported = false;
  barcodes: Barcode[] = [];
  studentData: any;
  scannedQrData: any;
  currentUser: User = { uid: '', uname: '', ulaname: '', uemail: '', upassword: '' };
  asistencia: Asistencia = { clase: '', seccion:'', fecha: '', estado: 'ausente', idEstudiante: '', nomEstudiante: '' };

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
      this.checkConnectionAndSync();
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
    const loading = await this.utils.presentLoading();
    loading.present();
  
    try {
      const granted = await this.requestPermissions();
      if (!granted) {
        this.presentAlert('Permiso denegado', 'Para usar la aplicación autorizar los permisos de cámara');
        return null;
      }
  
      const { barcodes } = await BarcodeScanner.scan();
      if (barcodes.length > 0) {
        try {
          const qrData = JSON.parse(barcodes[0].displayValue);
          const { clase, fecha, estado, idEstudiante, seccion } = qrData;
          qrData.idEstudiante = this.currentUser.uid;
          qrData.nomEstudiante = this.currentUser.uname;
  
          await this.saveAttendance(clase, fecha, estado, idEstudiante, seccion, this.currentUser.uname);
        } catch (error) {
          console.error('Error al procesar el código QR:', error);
          await this.presentAlert('Error', 'El código QR escaneado es inválido.');
          return null;
        }
      } else {
        console.log('No se pudo escanear el QR.');
        return null;
      }
    } catch (error) {
      console.error('Error durante el escaneo:', error);
      await this.presentAlert('Error', 'Ocurrió un error durante el escaneo.');
    } finally {
      loading.dismiss();
    }
  }

  async saveAttendance(clase: string, fecha: string, estado: string, uid: string, seccion: string, nomEstudiante: string): Promise<void> {
    this.asistencia = { clase, fecha, estado: "presente", idEstudiante: uid, seccion, nomEstudiante };
  
    if (navigator.onLine) {
      try {
        await this.firebaseSvc.registerAssist(this.asistencia);
        console.log('Asistencia registrada en Firebase.');
        await this.presentAlert('Éxito', 'Asistencia registrada.');
      } catch (error) {
        console.error('Error al guardar la asistencia en Firebase:', error);
        this.saveToLocalStorage(this.asistencia);
        console.log('Asistencia guardada localmente.');
        await this.presentAlert('Error', 'No se pudo registrar la asistencia en Firebase. Guardada localmente.');
      }
    } else {
      this.saveToLocalStorage(this.asistencia);
      console.log('Asistencia guardada localmente.');
      await this.presentAlert('Sin conexión', 'Asistencia guardada localmente.');
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

async syncLocalStorageWithFirebase() {
  if (navigator.onLine) {
    const storedData = localStorage.getItem('asistencias');
    const asistencias = storedData ? JSON.parse(storedData) : [];

    for (const asistencia of asistencias) {
      try {
        await this.firebaseSvc.registerAssist(asistencia);
        console.log('Asistencia sincronizada con Firebase:', asistencia);
        await this.presentAlert('Éxito', 'Asistencia local sincronizada con Firebase.');
      } catch (error) {
        console.error('Error al sincronizar la asistencia con Firebase:', error);
      }
    }

    localStorage.removeItem('asistencias');
    console.log('Asistencias locales eliminadas después de la sincronización.');
    await this.presentAlert('Éxito', 'Asistencias locales eliminadas tras sincronización.');
  } else {
    console.log('No hay conexión a Internet. No se puede sincronizar.');
    await this.presentAlert('Sin conexión', 'No hay conexión a Internet. No se puede sincronizar.');
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

  checkConnectionAndSync() {
    window.addEventListener('online', () => this.syncLocalStorageWithFirebase());
    this.syncLocalStorageWithFirebase(); // Intentar sincronizar al iniciar la página
  }
}
