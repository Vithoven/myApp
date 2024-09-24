import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiPageRoutingModule } from './confi-routing.module';

import { ConfiPage } from './confi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiPageRoutingModule
  ],
  declarations: [ConfiPage]
})
export class ConfiPageModule {}
