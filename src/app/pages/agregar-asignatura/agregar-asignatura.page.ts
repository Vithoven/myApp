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
  nuevaAsignatura: string = ''; // Nueva asignatura que se agrega con [(ngModel)]
  mostrarAsignaturas: boolean = false; // Controla la visibilidad de la pestañita
  asignaturas: string[] = []; // Lista de asignaturas agregadas

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private alertController: AlertController
  ) {}

  // Método para agregar asignaturas
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

      this.asignaturas.push(this.nombreAsignatura); // Agrega la asignatura al listado local

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'La asignatura se ha agregado correctamente.',
        buttons: ['OK']
      });
      await alert.present();

      this.nombreAsignatura = ''; // Limpia el campo de entrada
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al agregar la asignatura. Inténtalo de nuevo más tarde.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Método para mostrar u ocultar las asignaturas
  toggleAsignaturas() {
    this.mostrarAsignaturas = !this.mostrarAsignaturas;
  }

  // Método para editar una asignatura del listado
  async editarAsignatura(index: number) {
    const nuevaNombre = prompt('Editar nombre de la asignatura:', this.asignaturas[index]);
    if (nuevaNombre !== null && nuevaNombre.trim() !== '') {
      this.asignaturas[index] = nuevaNombre.trim();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El nombre de la asignatura no puede estar vacío.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Método para eliminar una asignatura del listado
  async eliminarAsignatura(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Estás seguro de que deseas eliminar la asignatura "${this.asignaturas[index]}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.asignaturas.splice(index, 1); // Elimina la asignatura del listado local
          }
        }
      ]
    });
    await alert.present();
  }
}
