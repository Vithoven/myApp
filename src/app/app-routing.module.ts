import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'confi',
    loadChildren: () => import('./pages/confi/confi.module').then(m => m.ConfiPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserPageModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./pages/scan/scan.module').then(m => m.ScanPageModule)
  },
  {
    path: 'crear',
    loadChildren: () => import('./pages/crear/crear.module').then(m => m.CrearPageModule)
  },
  {
    path: 'recover',
    loadChildren: () => import('./pages/recover/recover.module').then(m => m.RecoverPageModule)
  },
  {
    path: 'select-assistance',
    loadChildren: () => import('./pages/select-assistance/select-assistance.module').then(m => m.SelectAssistancePageModule)
  },
  {
    path: 'register-assistance',
    loadChildren: () => import('./pages/register-assistance/register-assistance.module').then(m => m.RegisterAssistancePageModule)
  },
  {
    path: 'register-assistance/:subject',
    loadChildren: () => import('./pages/register-assistance/register-assistance.module').then(m => m.RegisterAssistancePageModule)
  },
  {
    path: 'teacher-assignments',
    loadChildren: () => import('./pages/teacher-assignments/teacher-assignments.module').then(m => m.TeacherAssignmentsPageModule)
  },
  {
    path: 'teacher-register/:subject',
    loadChildren: () => import('./pages/teacher-register/teacher-register.module').then(m => m.TeacherRegisterPageModule)
  },
  {
    path: 'profe',
    loadChildren: () => import('./pages/profe/profe.module').then( m => m.ProfePageModule)
  },
  {
    path: 'home-profe',
    loadChildren: () => import('./pages/home-profe/home-profe.module').then( m => m.HomeProfePageModule)
  },  {
    path: 'asignaturas-profesor-qr',
    loadChildren: () => import('./pages/asignaturas-profesor-qr/asignaturas-profesor-qr.module').then( m => m.AsignaturasProfesorQrPageModule)
  },
  {
    path: 'generar-qr-asistencia',
    loadChildren: () => import('./pages/generar-qr-asistencia/generar-qr-asistencia.module').then( m => m.GenerarQrAsistenciaPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule{}