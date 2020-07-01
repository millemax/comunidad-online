import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private afs:AngularFirestore) { }

  createproductocarrito(record:any){
    var refproduct = firebase.firestore(); 
    
    return refproduct.collection("carrito").add(record)

  }

  readcarrito(variabledb:string, tipo:string){

    

    var refproduct = firebase.firestore();
    return refproduct.collection('carrito').where(variabledb, "==", tipo)

  }

  
  updateproductcarrito(variable:any, id:string, cantidad){
    var refproduct = firebase.firestore();
    return refproduct.collection('carrito').doc(id).update(variable,cantidad)

  }

 // lo use para actualizar para transferecia de un usuario anonimo a un usuario exitente
  updateproductocarrito(id:string,clave:string,valor:any){
    var refproduct = firebase.firestore();
    return refproduct.collection('carrito').doc(id).update(clave,valor)

  }

  deleteproductcarrito(id:string){
    var refproduct = firebase.firestore();
    return refproduct.collection('carrito').doc(id).delete()

  }





}
