import { Injectable } from '@angular/core';
//importar models user

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //para obtenerdatos deususario

  
  constructor(private afAuth:AngularFireAuth) { 
    //
    
  }

  //metodo para logear
  loginByEmail(email:any,password:any){
    
    return this.afAuth.auth.signInWithEmailAndPassword(email,password)
    
  }

  //loguear un usuario anonimo
  anonimuslogin(){
    
    return this.afAuth.auth.signInAnonymously()

  }

  //transferiri un usuario anonimo a una cuenta de gmail se crea esa cuenta con ese usuario
  trasferiruser(email,password){
    var credential = firebase.auth.EmailAuthProvider.credential(email, password);
     return firebase.auth().currentUser.linkWithCredential(credential)
  }


  

  //verificar estado de usuario devolvera true si el usuario es anonimo y false si el usuario esta autenticado
  verificarestadousuario(){
    return new Promise((resolved, reject)=>{

      this.afAuth.auth.onAuthStateChanged( firebaseuser=>{  
        var estadouser= firebaseuser.isAnonymous;   
        
           
        resolved(estadouser);                      
            
          });
        

      })    

  }

  userexists(){
    return new Promise((resolved, reject)=>{

      this.afAuth.auth.onAuthStateChanged( firebaseuser=>{              
           
        resolved(firebaseuser);                      
            
          });
        

      })    

  }


  //recuperar id independientemente is es anonimo o un usuario logueado

  readiduser(){
    return new Promise((resolved, reject)=>{

      this.afAuth.auth.onAuthStateChanged( firebaseuser=>{  
        var id:string;
        id= firebaseuser.uid;   
        
           
        resolved(id);                      
            
          });
        

      })    
    

  }

  
}
