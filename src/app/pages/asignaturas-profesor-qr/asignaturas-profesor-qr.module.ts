import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignaturasProfesorQrPageRoutingModule } from './asignaturas-profesor-qr-routing.module';

import { AsignaturasProfesorQrPage } from './asignaturas-profesor-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignaturasProfesorQrPageRoutingModule
  ],
  declarations: [AsignaturasProfesorQrPage]
})
export class AsignaturasProfesorQrPageModule {}
