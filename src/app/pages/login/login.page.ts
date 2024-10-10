import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('Formulario inválido');
      return;
    }
    
    const email = this.loginForm.get('email')?.value;
    
    console.log(`Intentando iniciar sesión con: ${email}`);

    if (email.includes('@docente.duocuc.cl')) {
      this.router.navigate(['/home-profe']);
    } else if (email.includes('@duocuc.cl')) {
      this.router.navigate(['/home']);
    } else {
      console.log('Correo no válido');
    }
  }
}
