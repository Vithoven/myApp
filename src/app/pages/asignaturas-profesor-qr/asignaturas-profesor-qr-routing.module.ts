import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignaturasProfesorQrPage } from './asignaturas-profesor-qr.page';

const routes: Routes = [
  {
    path: '',
    component: AsignaturasProfesorQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignaturasProfesorQrPageRoutingModule {}
