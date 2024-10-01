import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.domainValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  domainValidator(control: any) {
    const email = control.value;
    if (email && !(email.endsWith('@duocuc.cl') || email.endsWith('@profesor.duocuc.cl'))) {
      return { domain: true };
    }
    return null;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario válido, autenticando...');
    } else {
      console.log('Formulario no válido');
    }
  }
}