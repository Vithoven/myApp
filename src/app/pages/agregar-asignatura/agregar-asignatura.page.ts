import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agregar-asignatura',
  templateUrl: './agregar-asignatura.page.html',
  styleUrls: ['./agregar-asignatura.page.scss'],
})
export class AgregarAsignaturaPage {
  form = new FormGroup({
    nombreAsignatura: new FormControl(),
    seccion: new FormControl(),
    jornada: new FormControl(),
  })
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
  ) { }

  async agregarAsignatura() {
    try {
      const asignatura = this.form.value
      this.firebaseService.setDocument(`asignaturas/${asignatura.nombreAsignatura}+${asignatura.seccion}`, asignatura)
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