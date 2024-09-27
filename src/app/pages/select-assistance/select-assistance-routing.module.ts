import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectAssistancePage } from './select-assistance.page';

const routes: Routes = [
  {
    path: '',
    component: SelectAssistancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectAssistancePageRoutingModule {}
