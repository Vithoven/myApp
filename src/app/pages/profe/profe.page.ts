import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profe',
  templateUrl: './profe.page.html',
  styleUrls: ['./profe.page.scss'],
})
export class ProfePage {
  nombre = 'Wacoldo';
  apellidos = 'Alcachofa';
  correo = 'wa.alcachofa@profesor.duocuc.cl';
  profileImage = 'https://via.placeholder.com/150';
  constructor() { }

  ngOnInit() {
  }

}
