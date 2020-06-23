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

  
  updateproductcarrito(variable:any, id:string, cantidad:number){
    var refproduct = firebase.firestore();
    return refproduct.collection('carrito').doc(id).update(variable,cantidad)

  }

  deleteproductcarrito(id:string){
    var refproduct = firebase.firestore();
    return refproduct.collection('carrito').doc(id).delete()

  }


}
