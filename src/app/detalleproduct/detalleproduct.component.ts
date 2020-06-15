import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

//estamos importando a la casa de la moneda
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-detalleproduct',
  templateUrl: './detalleproduct.component.html',
  styleUrls: ['./detalleproduct.component.scss']
})
export class DetalleproductComponent implements OnInit {

  idProducto:string;


  constructor( private _route: ActivatedRoute) { }

  ngOnInit() {
    this.obtenerid();

  }

  obtenerid(){
    console.log("el id del producto detalles", this._route.snapshot.paramMap.get('id'))
    this.idProducto=this._route.snapshot.paramMap.get('id');

  }

   //esto recibe los puntajes de la estrella
onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
    New Value: ${$event.newValue}, 
    Checked Color: ${$event.starRating.checkedcolor}, 
    Unchecked Color: ${$event.starRating.uncheckedcolor}`);

}

obtenerproducto(){
  
}

}
