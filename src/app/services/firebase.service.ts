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

  private ngFireAuth = inject(AngularFireAuth);
  private utils = inject(UtilsService);
  private ngFirestore = inject(AngularFirestore);

  //======AUTENTICACION=========//

  //====ACCEDER A CUENTA=======//
  async signIn(email: string, password: string) {
    try {
      const user = await this.ngFireAuth.signInWithEmailAndPassword(email, password);
      const userData = await this.getDocument(`usuarios/${user.user?.uid}`);
      this.utils.saveInLocalStorage('user', userData);
      return user;
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error;
    }
  }

  //====CREAR CUENTA DE USUARIO=======//
  signUp(uemail: string, upassword: string, uname: string, ulaname: string) {
    const user = this.ngFireAuth.createUserWithEmailAndPassword(uemail, upassword);
    user.then(userRef => {
      this.setDocument(`usuarios/${userRef.user?.uid}`, { uname, ulaname, uemail, upassword, uid: userRef.user?.uid });
    });
    return user;
  }

  //=====REGISTRAR ASISTENCIA=====//
  async registerAssist(asistencia: Asistencia) {
    try {
      const asistenciaRef = this.ngFirestore.collection('asistencia').doc();
      return await asistenciaRef.set(asistencia);
    } catch (error) {
      console.error('Error al crear la asistencia:', error);
      throw error;
    }
  }

  //=====RECUPERAR CONTRASEÑA EMAIL=====//
  resetPasswordEmail(email: string) {
    return this.ngFireAuth.sendPasswordResetEmail(email);
  }

  //====CERRAR SESION=====//
  async signOut() {
    try {
      await this.ngFireAuth.signOut();
      localStorage.removeItem('user');
      this.utils.navigateRoot('/login');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }

  //=====CAMBIAR CONTRASEÑA=====//
  async changePassword(newPassword: string, currentPassword: string) {
    try {
      const user = await this.ngFireAuth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        await user.reauthenticateWithCredential(credential);
        return await user.updatePassword(newPassword);
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      throw error;
    }
  }

  setDocument(path: string, data: any) {
    return setDoc(doc(this.ngFirestore.firestore, path), data);
  }

  async getDocument(path: string) {
    const docSnap = await getDoc(doc(this.ngFirestore.firestore, path));
    return docSnap.data();
  }

  getCollection(path: string) {
    let q = query(collection(this.ngFirestore.firestore, path));
    return collectionData(q, { idField: 'id' });
  }

  async getCurrentUserData() {
    try {
      const currentUid = await this.ngFireAuth.currentUser?.then(user => user?.uid);
      if (currentUid) {
        return await this.getDocument(`usuarios/${currentUid}`) as User;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener datos del usuario actual', error);
      throw error;
    }
  }

  getAuthIns() {
    return getAuth();
  }

  //=====ACTUALIZAR DATOS DE USUARIO=====//
  async updateUser(userData: any) {
    try {
      const currentUid = await this.ngFireAuth.currentUser?.then(user => user?.uid);
      if (currentUid) {
        const userRef = this.ngFirestore.doc(`usuarios/${currentUid}`);
        return await userRef.update(userData);
      }
      throw new Error('UID del usuario no encontrado');
    } catch (error) {
      console.error('Error al actualizar los datos del usuario', error);
      throw error;
    }
  }

  constructor() { }

  getFirestore(): AngularFirestore {
    return this.ngFirestore;
  }

    //=====AGREGAR MATERIA COMO PROFESOR=====//
async agregarAsignatura(nombre: string) {
  try {
    const asignaturaRef = this.ngFirestore.collection('asignaturas').doc();

    await asignaturaRef.set({
      nombre: nombre,
      createdAt: new Date()
    });

    console.log('Asignatura agregada con éxito');
  } catch (error) {
    console.error('Error al agregar la asignatura:', error);
    throw error;
  }
}
}
