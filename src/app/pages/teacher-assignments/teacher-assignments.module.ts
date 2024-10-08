import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicModule } from '@ionic/angular';

import { TeacherAssignmentsPageRoutingModule } from './teacher-assignments-routing.module';

import { TeacherAssignmentsPage } from './teacher-assignments.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    TeacherAssignmentsPageRoutingModule
  ],
  declarations: [TeacherAssignmentsPage]
})
export class TeacherAssignmentsPageModule {}
