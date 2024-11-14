import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicModule } from '@ionic/angular';
import { GenerarQrAsistenciaPageRoutingModule } from './generar-qr-asistencia-routing.module';
import { GenerarQrAsistenciaPage } from './generar-qr-asistencia.page';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    GenerarQrAsistenciaPageRoutingModule,
    QrCodeModule
  ],
  declarations: [GenerarQrAsistenciaPage]
})
export class GenerarQrAsistenciaPageModule {}
