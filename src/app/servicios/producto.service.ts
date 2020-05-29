import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private afs:AngularFirestore) { }

  createproduct(){


  }

  readproducts(){

  }

  updateproduct(){

  }

  deleteproduct(){


  }

  




}
