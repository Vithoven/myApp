import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterAssistancePageRoutingModule } from './register-assistance-routing.module';

import { RegisterAssistancePage } from './register-assistance.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    RegisterAssistancePageRoutingModule
  ],
  declarations: [RegisterAssistancePage]
})
export class RegisterAssistancePageModule {}
