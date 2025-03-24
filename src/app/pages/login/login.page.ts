import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private utils = inject(UtilsService);
  private firebaseSvc = inject(FirebaseService);

  loginForm = new FormGroup({
    uemail: new FormControl('', [Validators.required, Validators.email]),
    upassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      const route = userData.role === 'Profesor' ? '/home-profe' : '/home';
      this.router.navigateByUrl(route);
    }
  }

  async iniciarSesion() {
    const { uemail, upassword } = this.loginForm.value;
    const loading = await this.utils.presentLoading();
    loading.present();

    try {
      const user = await this.firebaseSvc.signIn(uemail!, upassword!);
      if (user) {
        const role = uemail!.includes('cosl.cl') ? 'Profesor' : 'Alumno';

        const userData = {
          email: uemail,
          role: role,
          timestamp: new Date().toISOString(),
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));

        const route = role === 'Profesor' ? '/home-profe' : '/home';
        this.utils.navigateRoot(route);
      }
    } catch (error) {
      console.log(error);
      this.utils.presentToast({
        icon: 'close-circle-sharp',
        message: 'Email o Contraseña Incorrectos',
        color: 'danger',
        duration: 2500,
      });
    } finally {
      loading.dismiss();
    }
  }

  cerrarSesion() {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }
}