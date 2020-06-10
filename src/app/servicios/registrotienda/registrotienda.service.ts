import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class RegistrotiendaService {

  constructor(private afs:AngularFirestore) { }
  // CRUD PARA LA TIENDA 
  createstorage(record){
    
    
    var idtime=Date.now();
    return this.afs.collection("tiendas").doc(""+idtime).set(record)

  }





}
