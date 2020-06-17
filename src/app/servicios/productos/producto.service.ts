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
    var tiempofuturo=2537654400999
    var tiempo=tiempofuturo-idtime;    
    return this.afs.collection("productos").doc(""+tiempo).set(record)

  }

  readcaproducts(){
      

  }

  updateproduct(){

  }

  deleteproduct(){

  }

  //recuperar un solo producto
  recuperarproducto(id:string){
    var refproduct = firebase.firestore(); 
    return refproduct.collection('productos').doc(id).get();

  }

  //fin de crud
  
  //recuperarpoducto cuando cumpla una condicion
  readproduct(tipo:string){        
    var refproduct = firebase.firestore();    
    return refproduct.collection('productos').where("tipoventa", "==", tipo).limit(5).get()
    
  }

  //recuperar productos mas vendidos en el servico
  readproductpopulate(){
    var refproduct = firebase.firestore(); 
    return refproduct.collection('productos').where("cantidadventas",">",0).orderBy("cantidadventas","desc").limit(5).get()
  }



 




}
