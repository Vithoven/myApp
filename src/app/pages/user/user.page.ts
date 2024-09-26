import { CommonModule } from '@angular/common';
import { Component, importProvidersFrom } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { EncabezadoComponent } from 'src/app/components/encabezado/encabezado.component';
import { ComponentsModule } from 'src/app/components/components.module';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],

})

export class UserPage {
  nombre = 'Jimenito';
  apellidos = 'Alcachofa';
  correo = 'ji.alcachofa@duocuc.cl';
  profileImage = 'https://via.placeholder.com/150';

  constructor() {}

  changeProfilePicture() {
    this.profileImage = 'https://via.placeholder.com/150/0000FF/808080';
  }
}
