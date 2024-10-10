import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicModule } from '@ionic/angular';

import { TeacherRegisterPageRoutingModule } from './teacher-register-routing.module';

import { TeacherRegisterPage } from './teacher-register.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    TeacherRegisterPageRoutingModule
  ],
  declarations: [TeacherRegisterPage]
})
export class TeacherRegisterPageModule {}
