import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EncabezadoProfeComponent } from './encabezado-profe/encabezado-profe.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { CustomInputComponent } from './custom-input/custom-input.component';

@NgModule({
  declarations: [
    EncabezadoComponent,
    EncabezadoProfeComponent,
    CustomInputComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    EncabezadoComponent,
    EncabezadoProfeComponent,
    CustomInputComponent,

  ]
})
export class ComponentsModule { }