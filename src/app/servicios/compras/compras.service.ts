import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor() { }

  // .....................crud...............
  createcompra(record:any){

    var refproduct = firebase.firestore(); 
    return refproduct.collection("compras").add(record)

    

  }

  readcompras(){
    var refproduct = firebase.firestore();    
    return refproduct.collection('compras')

  }
  updatecompra(id:string,clave:string,valor:string){
    var refproduct = firebase.firestore();
    return refproduct.collection('compras').doc(id).update(clave,valor);

  }

  delete(id:string){
    var refproduct = firebase.firestore();
    return refproduct.collection('compras').doc(id).delete()


  }


  //..............fin del crud..................



  //solo de un usuario especifico
  readcompra(clave:string, valor:string){
    var refproduct = firebase.firestore();
    return refproduct.collection('compras').where(clave, "==", valor)


  }


}
