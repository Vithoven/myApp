import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './../models/user.model';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Injectable, inject } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,  } from '@firebase/auth'
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

// Inyecciones de dependencias
private ngFireAuth = inject(AngularFireAuth);
private utils = inject(UtilsService);
private ngFireStore = inject(AngularFirestore)

//======AUTENTICACION=========//

  //====ACCEDER A CUENTA=======//
    async signIn(user: User){
      const userresp = await this.auth.signInWithEmailAndPassword(user.uemail, user.upassword);
      return userresp;
    }

  //====CREAR CUENTA DE USUARIO=======//
    async register(user: User){
      const userreg = await this.auth.createUserWithEmailAndPassword(user.uemail, user.upassword);
      userreg
      return userreg;
    }

  constructor() { }
}



