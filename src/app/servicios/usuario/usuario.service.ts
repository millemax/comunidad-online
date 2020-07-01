import { Injectable } from '@angular/core';

import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private afs:AngularFirestore) { }

  createuser(record){
  var refproduct = firebase.firestore();
  return refproduct.collection("usuarios").add(record)


  }
  readuser(){

  }

  updateuser(){

  }
  deleteuser(){

  }


}





