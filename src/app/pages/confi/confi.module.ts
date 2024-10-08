import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfiPageRoutingModule } from './confi-routing.module';
import { ConfiPage } from './confi.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ConfiPage]
})
export class ConfiPageModule {}
