import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AgregarAsignaturaPageRoutingModule } from './agregar-asignatura-routing.module';
import { AgregarAsignaturaPage } from './agregar-asignatura.page';
import { ComponentsModule } from 'src/app/components/components.module'; // Si estás usando componentes reutilizables

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAsignaturaPageRoutingModule,
    ComponentsModule  // Asegúrate de que ComponentsModule esté correctamente importado si usas componentes comunes
  ],
  declarations: [AgregarAsignaturaPage]
})
export class AgregarAsignaturaPageModule {}
