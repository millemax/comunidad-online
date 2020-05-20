import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import {AngularFireAuth} from '@angular/fire/auth';  
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
//obtener datos de usuario
  public userData:Observable<firebase.User>;
  
  constructor(private afAuth:AngularFireAuth) { 
    this.userData = afAuth.authState;
   }
//metodologin
  loginByEmail(user:UserI){
    const {email,password} = user;
    return this.afAuth.auth.signInWithEmailAndPassword(email,password);

  }
  //metodo logout
    logout(){
      this.afAuth.auth.signOut();
    }  
}
