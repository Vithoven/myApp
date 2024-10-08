import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicModule } from '@ionic/angular';

import { ProfePageRoutingModule } from './profe-routing.module';

import { ProfePage } from './profe.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    ProfePageRoutingModule
  ],
  declarations: [ProfePage]
})
export class ProfePageModule {}
