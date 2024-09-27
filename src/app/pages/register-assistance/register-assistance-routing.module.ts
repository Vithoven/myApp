import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterAssistancePage } from './register-assistance.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterAssistancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterAssistancePageRoutingModule {}
