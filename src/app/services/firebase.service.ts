import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, EmailAuthProvider, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDoc, setDoc, doc, query, collection, collectionData, where } from "@angular/fire/firestore";
import { User } from '../models/user.model';
import { UtilsService } from './utils.service';
import { Asistencia } from '../models/asistencia.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

// Inyecciones de dependencias
private ngFireAuth = inject(AngularFireAuth);
private utils = inject(UtilsService);
private ngFirestore = inject(AngularFirestore)

//======AUTENTICACION=========//

  //====ACCEDER A CUENTA=======//
  async signIn(email:string, password:string){
    const user = await this.ngFireAuth.signInWithEmailAndPassword(email, password); 
    const userData = await this.getDocument(`usuarios/${user.user?.uid}`);
    this.utils.saveInLocalStorage('user', userData);
    return user;
  }

  //====CREAR CUENTA DE USUARIO=======//
  signUp(uemail:string, upassword:string, uname:string, ulaname:string){
    const user = this.ngFireAuth.createUserWithEmailAndPassword(uemail, upassword);
    user.then( userRef => { this.setDocument(`usuarios/${userRef.user?.uid}`, {uname, ulaname, uemail, upassword, uid: userRef.user?.uid}) });
    return user;
  }

  //=====REGISTRAR ASISTENCIA=====//
  async registerAssist(asistencia: Asistencia){
    try {
      // Crear la tabla en la base de datos
      return await this.setDocument('asistencia', asistencia);
    } catch (error) {
      console.error('Error al crear la asistencia:', error);
      throw error;
    }
  }

  //=====RECUPERAR CONTRASEÑA EMAIL=====//
  resetPasswordEmail(email:string) {
    return this.ngFireAuth.sendPasswordResetEmail(email);
  }

  //====CERRAR SESION=====//
  signOut(){
    this.ngFireAuth.signOut();
    localStorage.removeItem('user');
    this.utils.navigateRoot('/login');
  }

  //=====CAMBIAR CONTRASEÑA=====//
  async changePassword(newPassword:string, currentPassword:string){
    try {
      const user = await this.ngFireAuth.currentUser;
      const credential = EmailAuthProvider.credential(user?.email!, currentPassword);
      if (credential) {
        await user?.reauthenticateWithCredential(credential);
        return await user?.updatePassword(newPassword);
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      throw error;
    }
  }

  setDocument(path:string, data:any) {
    return setDoc(doc(this.ngFirestore.firestore, path), data);
  }

  async getDocument(path:string) {
    return (await getDoc(doc(this.ngFirestore.firestore, path))).data();
  }

  getCollection(path: string) {
    let q = query(collection(this.ngFirestore.firestore, path));
    return collectionData(q, { idField: 'id' });
  }

  async getCurrentUserData() {
    const currentUid = await this.ngFireAuth.currentUser.then( user => user?.uid);
    return (await this.getDocument(`usuarios/${currentUid}`)) as User;
  }

  getAuthIns() {
    return getAuth();
  }

  //=====ACUTALIZAR DATOS DE USUARIO=====//
  async updateUser(userData: any) {
    const currentUid = await this.ngFireAuth.currentUser.then(user => user?.uid);
    const userRef = this.ngFirestore.doc(`usuarios/${currentUid}`);
    return userRef.update(userData);
  }
  constructor() { }

  //=====Recibe firestore de la aplicación=====//
  getFirestore(): AngularFirestore {
    return this.ngFirestore;
  }
}



