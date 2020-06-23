import { Injectable } from '@angular/core';
//importar models user
import {UserI} from '../models/user.interface'
import { AngularFireAuth } from '@angular/fire/auth';
import { observable, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //para obtenerdatos deususario
  public userData:Observable<firebase.User>;
  
  constructor(private afAuth:AngularFireAuth) { 
    //
    this.userData = afAuth.authState;
  }

  //metodo para logear
  loginByEmail(user:UserI){
    const {email,password} = user;
    return this.afAuth.auth.signInWithEmailAndPassword(email,password)
    
  }

  //loguear un usuario anonimo
  anonimuslogin(){
    
    return this.afAuth.auth.signInAnonymously()

  }

  //status de login podemos ver en que estado esta logueado
  statuslogin(){   

        return this.afAuth.auth.onAuthStateChanged(firebaseuser=>{     
          
          console.log("el usuario autenticado",firebaseuser.uid);
        })
  }

  
}
