import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { EncabezadoProfeComponent } from './encabezado-profe/encabezado-profe.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    EncabezadoComponent,
    EncabezadoProfeComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  exports: [
    EncabezadoComponent,
    EncabezadoProfeComponent
  ]
})
export class ComponentsModule { }