import { Component } from '@angular/core';

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
