import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm = new FormGroup({
    uemail: new FormControl('', [Validators.required, Validators.email]),
    upassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private fb: FormBuilder, private router: Router) {
  }

firebaseSvc = inject(FirebaseService);

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('Formulario inválido');
      return;
    }
    
    if (this.loginForm.valid){
      this.firebaseSvc.signIn(this.loginForm.value as User).then(res => {
        console.log(res);
      })
    }
  }
}
