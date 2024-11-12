import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
    isScanning: boolean = true;

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  /*Escaneo exitoso*/
  async scanSuccess(result:string){
    console.log('escaneo exitoso', result);
    this.mostrarAlertaExito
  }



  /*Cancelar escaneo*/
  async scanCancel(){
    this.isScanning = false;
    console.log('escaneo cancelado')
  }

  /* Alerta de escaneo exitoso */
  async mostrarAlertaExito() {
    const alert = await this.alertController.create({
      header: 'Escaneo Exitoso',
      message: 'Escaneo exitoso. Asistencia registrada.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  /*Alerta escaneo fallido*/
  async mostrarAlertaFallo(){
    const alert =await this.alertController.create({
      header: 'Escaneo fallido',
      message: 'Fuera de rango',
      buttons: ['OK']
    })
    await alert.present();
  }
}