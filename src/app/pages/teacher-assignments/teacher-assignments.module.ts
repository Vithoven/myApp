import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherAssignmentsPageRoutingModule } from './teacher-assignments-routing.module';

import { TeacherAssignmentsPage } from './teacher-assignments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherAssignmentsPageRoutingModule
  ],
  declarations: [TeacherAssignmentsPage]
})
export class TeacherAssignmentsPageModule {}
