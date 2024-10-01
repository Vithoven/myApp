import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherAssignmentsPage } from './teacher-assignments.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherAssignmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherAssignmentsPageRoutingModule {}
