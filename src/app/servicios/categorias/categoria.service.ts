import { Injectable } from '@angular/core';

import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';


import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private afs:AngularFirestore) { }

  createcategory(){

  }

  
  readcategorys(){
    return this.afs.collection('categorias').snapshotChanges();

  }

  updatecategory(){

  }

  deletecategory(){

  }



  //solo obtenemos el valor un documento
  readcategory(documento:string){
    var db = firebase.firestore();    
    return db.collection('categorias').doc(documento).get();
  }




}
