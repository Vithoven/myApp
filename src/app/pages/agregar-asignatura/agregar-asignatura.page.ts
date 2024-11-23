import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-asignatura',
  templateUrl: './agregar-asignatura.page.html',
  styleUrls: ['./agregar-asignatura.page.scss'],
})
export class AgregarAsignaturaPage {
  nombreAsignatura: string = '';

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private alertController: AlertController
  ) {}


  async agregarAsignatura() {
    if (this.nombreAsignatura.trim() === '') {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingrese el nombre de la asignatura.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    try {
      await this.firebaseService.agregarAsignatura(this.nombreAsignatura);

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'La asignatura se ha agregado correctamente.',
        buttons: ['OK']
      });
      await alert.present();

      this.router.navigate(['/teacher-assignments']);
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al agregar la asignatura. Inténtalo de nuevo más tarde.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}