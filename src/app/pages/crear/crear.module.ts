import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearPageRoutingModule } from './crear-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { CrearPage } from './crear.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CrearPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [CrearPage]
})
export class CrearPageModule {}
