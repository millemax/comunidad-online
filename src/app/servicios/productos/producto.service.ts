import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { storage } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
 
  constructor(private afs:AngularFirestore) { }

  //crud para los productos

  createproduct(record){
    
    //var record={nombre:"romel",apellido:"huaraca", apellido1:"pocco"}
    var idtime=Date.now();
    return this.afs.collection("productos").doc(""+idtime).set(record)

  }

  readcaproducts(){
      

  }

  updateproduct(){

  }

  deleteproduct(){

  }


  //fin de crud
  readproduct(tipo:string){        
    var refproduct = firebase.firestore();    
    return refproduct.collection('productos').where("tipoventa", "==", tipo).limit(5).get()
    
  }


 




}
