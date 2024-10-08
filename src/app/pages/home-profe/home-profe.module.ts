import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeProfePageRoutingModule } from './home-profe-routing.module';

import { HomeProfePage } from './home-profe.page';
import { EncabezadoProfeComponent } from 'src/app/components/encabezado-profe/encabezado-profe.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    HomeProfePageRoutingModule,
  ],
  declarations: [HomeProfePage]
})
export class HomeProfePageModule {}
