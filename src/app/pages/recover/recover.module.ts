import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecoverPageRoutingModule } from './recover-routing.module';
import { RecoverPage } from './recover.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoverPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [RecoverPage]
})
export class RecoverPageModule {}
