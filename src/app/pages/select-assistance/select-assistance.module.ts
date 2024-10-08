import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicModule } from '@ionic/angular';

import { SelectAssistancePageRoutingModule } from './select-assistance-routing.module';

import { SelectAssistancePage } from './select-assistance.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    SelectAssistancePageRoutingModule
  ],
  declarations: [SelectAssistancePage]
})
export class SelectAssistancePageModule {}
