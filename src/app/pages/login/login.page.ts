import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.email.includes('@duocuc.cl') || this.email.includes('@profesor.duoc.cl')) {
      console.log('Acceso permitido');
      this.router.navigate(['/home']);
      console.log('Acceso denegado: Correo inválido');
    }
  }
}
