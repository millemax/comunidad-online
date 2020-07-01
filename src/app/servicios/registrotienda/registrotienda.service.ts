import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

import * as firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class RegistrotiendaService {
  //carpeta donde se almacenara documentos 
 

  constructor(private afs:AngularFirestore) { }

 


  



  // --------------------------------CRUD PARA LA TIENDA-------------- 
  createstore(record){
    
    
    var idtime=Date.now();
    return this.afs.collection("tiendas").doc(""+idtime).set(record)

  }

  updatestorage(){

  }




  //recuperar tienda cuando cumpla una condicion
  readstore(variabledb:string, tipo:string){        
    var refstore = firebase.firestore();    
    return refstore.collection('tiendas').where(variabledb, "==", tipo)
    
  } 

  //recuperar tiendas
  readtienda(){        
    var refstore = firebase.firestore();    
    return refstore.collection('tiendas');

  }
 


}
