import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerarQrAsistenciaPage } from './generar-qr-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: GenerarQrAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerarQrAsistenciaPageRoutingModule {}
