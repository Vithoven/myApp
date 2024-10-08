import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { EncabezadoProfeComponent } from './encabezado-profe/encabezado-profe.component';

@NgModule({
  declarations: [
    EncabezadoComponent,
    EncabezadoProfeComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  exports: [
    EncabezadoComponent,
    EncabezadoProfeComponent,
  ]
})
export class ComponentsModule { }