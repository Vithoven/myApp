import { User } from './../models/user.model';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Injectable, inject } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from '@firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject (AngularFireAuth)

//======AUTENTICACION=========//

//====ACCEDER A CUENTA=======//
  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.uemail, user.upassword)
  }

//====CREAR CUENTA DE USUARIO=======//
  register(user: User){
    return createUserWithEmailAndPassword(getAuth(), user.uemail, user.upassword)
  }

  constructor() { }
}



