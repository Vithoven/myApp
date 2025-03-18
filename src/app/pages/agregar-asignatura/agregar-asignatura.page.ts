import { EncabezadoComponent } from './../../components/encabezado/encabezado.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { Clase } from 'src/app/models/clase.model';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agregar-asignatura',
  templateUrl: './agregar-asignatura.page.html',
  styleUrls: ['./agregar-asignatura.page.scss'],
})
export class AgregarAsignaturaPage {
  form = new FormGroup({
    nombreClase: new FormControl('', [Validators.required]),
    seccion: new FormControl('', [Validators.required]),
    jornada: new FormControl('', [Validators.required]),
  })
  
  nuevaClase = {} as Clase;
  subAsignaturas : Subscription;
  mostrarAsignaturas: boolean = false;
  clases: Clase[] = [];

  ionViewWillLeave(){
    this.subAsignaturas.unsubscribe();
  }

  ionViewWillEnter(){
    this.getAsignaturas();
  }

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private alertController: AlertController
  ) { }

  async agregarAsignatura() {
    try {
      this.nuevaClase = this.form.value as Clase;
      this.firebaseService.setDocument(`clase/${this.nuevaClase.nombreClase}-${this.nuevaClase.seccion}${this.nuevaClase.jornada}`, this.nuevaClase)
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'El taller se ha agregado correctamente.',
        buttons: ['OK'],
      });
      await alert.present();


    } catch (error) {

      const alert = await this.alertController.create({
        header: 'Error',
        message:
          'Hubo un problema al agregar el taller. Inténtalo de nuevo más tarde.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  getAsignaturas(){
    this.subAsignaturas = this.firebaseService.getCollection('clase').subscribe(clases => {
      this.clases = clases as Clase[];
      console.log(this.clases)
    })
    
  }
}