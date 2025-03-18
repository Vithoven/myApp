import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarAsignaturaPageRoutingModule } from './agregar-asignatura-routing.module';
import { AgregarAsignaturaPage } from './agregar-asignatura.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAsignaturaPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarAsignaturaPage]
})
export class AgregarAsignaturaPageModule { }
