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
      if (navigator.onLine) {
        const user = await this.firebaseSvc.signIn(uemail!, upassword!);
        if (user) {
          const role = uemail!.includes('profesor.duocuc.cl') ? 'Profesor' : 'Alumno';

          const userData = {
            email: uemail,
            role: role,
            uname: user.user?.displayName || '', 
            ulaname: user.user?.displayName || '', 
            timestamp: new Date().toISOString(),
          };
          this.guardarUsuarioEnLocalStorage(userData);
          console.log('Usuario guardado en local storage');

          const route = role === 'Profesor' ? '/home-profe' : '/home';
          this.utils.navigateRoot(route);
        }
      } else {
        const userData = this.obtenerUsuarioDeLocalStorage(uemail);
        if (userData) {
          const route = userData.role === 'Profesor' ? '/home-profe' : '/home';
          this.utils.navigateRoot(route);
          console.log('Usuario obtenido de local storage');
        } else {
          this.utils.presentToast({
            icon: 'close-circle-sharp',
            message: 'No hay conexión a Internet y no se encontraron datos de usuario.',
            color: 'danger',
            duration: 2500,
          });
        }
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
    this.router.navigateByUrl('/login');
  }

  private guardarUsuarioEnLocalStorage(userData: any) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUserIndex = users.findIndex((user: any) => user.email === userData.email);
    if (existingUserIndex !== -1) {
      users[existingUserIndex] = userData;
    } else {
      users.push(userData);
    }
    localStorage.setItem('users', JSON.stringify(users));
  }

  private obtenerUsuarioDeLocalStorage(email: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find((user: any) => user.email === email);
  }
}
