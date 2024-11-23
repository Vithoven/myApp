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
  nuevaAsignatura: string = '';
  nuevaSeccion: string = '';
  nuevaJornada: string = '';
  mostrarAsignaturas: boolean = false;
  asignaturas: { nombre: string; seccion: string; jornada: string }[] = [];

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private alertController: AlertController
  ) {}

  async agregarAsignatura() {
    if (
      this.nuevaAsignatura.trim() === '' ||
      this.nuevaSeccion.trim() === '' ||
      this.nuevaJornada === ''
    ) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos antes de agregar la asignatura.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.firebaseService.agregarAsignatura(
        this.nuevaAsignatura,
        this.nuevaSeccion,
        this.nuevaJornada
      );

      this.asignaturas.push({
        nombre: this.nuevaAsignatura,
        seccion: this.nuevaSeccion,
        jornada: this.nuevaJornada,
      });

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'La asignatura se ha agregado correctamente.',
        buttons: ['OK'],
      });
      await alert.present();

      this.nuevaAsignatura = '';
      this.nuevaSeccion = '';
      this.nuevaJornada = '';
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message:
          'Hubo un problema al agregar la asignatura. Inténtalo de nuevo más tarde.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  toggleAsignaturas() {
    this.mostrarAsignaturas = !this.mostrarAsignaturas;
  }

  async editarAsignatura(index: number) {
    const asignatura = this.asignaturas[index];
    const nuevoNombre = prompt(
      'Editar nombre de la asignatura:',
      asignatura.nombre
    );
    const nuevaSeccion = prompt(
      'Editar sección:',
      asignatura.seccion
    );
    const nuevaJornada = prompt(
      'Editar jornada (D = Diurno, V = Vespertino):',
      asignatura.jornada
    );

    if (
      nuevoNombre !== null &&
      nuevoNombre.trim() !== '' &&
      nuevaSeccion !== null &&
      nuevaSeccion.trim() !== '' &&
      nuevaJornada !== null &&
      (nuevaJornada.trim() === 'D' || nuevaJornada.trim() === 'V')
    ) {
      this.asignaturas[index] = {
        nombre: nuevoNombre.trim(),
        seccion: nuevaSeccion.trim(),
        jornada: nuevaJornada.trim(),
      };
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos deben ser válidos.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async eliminarAsignatura(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Estás seguro de que deseas eliminar la asignatura "${this.asignaturas[index].nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.asignaturas.splice(index, 1);
          },
        },
      ],
    });
    await alert.present();
  }
}