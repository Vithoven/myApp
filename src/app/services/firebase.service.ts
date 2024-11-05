import { User } from './../models/user.model';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Injectable, inject } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,  } from '@firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

 private auth = inject (AngularFireAuth)

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



