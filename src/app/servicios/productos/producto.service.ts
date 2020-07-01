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

  //recuperar un solo producto solo por su id
  recuperarproducto(id:string){
    var refproduct = firebase.firestore(); 
    return refproduct.collection('productos').doc(id).get();
  }

  //fin de crud
  
  //recuperarpoducto cuando cumpla una condicion
  readproduct(variabledb:string, tipo:string){        
    var refproduct = firebase.firestore();    
    return refproduct.collection('productos').where(variabledb, "==", tipo)
    
  }
           
  //recuperar productos mas vendidos en el servico
  readproductpopulate(){
    var refproduct = firebase.firestore(); 
    return refproduct.collection('productos').where("cantidadventas",">",0).orderBy("cantidadventas","desc").limit(5).get()
  }

  //recuperar productos de mayor a menor
  readproductmayorMenor(variabledb:string, tipo:string){
    var refproduct = firebase.firestore(); 
    return refproduct.collection('productos').where(variabledb, "==", tipo).where("precio",">",0).orderBy("precio","desc")
  }

  //recuperar productos de menor a mayor
  readproductmenorMayor(variabledb:string, tipo:string){
    var refproduct = firebase.firestore(); 
    return refproduct.collection('productos').where(variabledb, "==", tipo).where("precio",">",0).orderBy("precio")
  }

  //recuperar productos en liquidación
  readproductliquidacion(variabledb:string, tipo:string){
    var refproduct = firebase.firestore(); 
    return refproduct.collection('productos').where(variabledb, "==", tipo).where("tipoventa","==","oferta")
  }

  //recuperar productos en ciudad geolocalizado del usuario
  readproductMiciudad(variabledb:string, tipo:string, ciudad:string){
    var refproduct = firebase.firestore(); 
    return refproduct.collection('productos').where(variabledb, "==", tipo).where('ciudadventa',"==",ciudad)
  }

  //recuperar productos de ciudad de mayor a menor geolocalizado del usuario
  readproductMayorMiciudad(variabledb:string, tipo:string, ciudad:string){
    var refproduct = firebase.firestore(); 
    return refproduct.collection('productos').where(variabledb, "==", tipo).where('ciudadventa',"==",ciudad).where("precio",">",0).orderBy("precio","desc")
  }

  //recuperar productos de ciudad de mayor a menor geolocalizado del usuario
  readproductMenorMiciudad(variabledb:string, tipo:string, ciudad:string){
    var refproduct = firebase.firestore(); 
    return refproduct.collection('productos').where(variabledb, "==", tipo).where('ciudadventa',"==",ciudad).where("precio",">",0).orderBy("precio")
  }

  //recuperar productos de ciudad en oferta geolocalizado del usuario
  readproductLiquidacionMiciudad(variabledb:string, tipo:string, ciudad:string){
    var refproduct = firebase.firestore(); 
    return refproduct.collection('productos').where(variabledb, "==", tipo).where('ciudadventa',"==",ciudad).where("tipoventa","==","oferta")
  }

}
