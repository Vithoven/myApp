import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiPage } from './confi.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiPageRoutingModule {}
