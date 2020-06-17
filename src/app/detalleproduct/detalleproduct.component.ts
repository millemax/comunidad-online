import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

//estamos importando a la casa de la moneda
import { StarRatingComponent } from 'ng-starrating';


//importamos los servicios para reucperar un solo producto
import {ProductoService} from '../servicios/productos/producto.service';



@Component({
  selector: 'app-detalleproduct',
  templateUrl: './detalleproduct.component.html',
  styleUrls: ['./detalleproduct.component.scss']
})
export class DetalleproductComponent implements OnInit {

  idProducto:string;
  product=[];

  //variable para cambiar cuando le da click
  fotoproduct: string;

  //variable para recpeionar los colores y tallas
  valortalla=["s","m","x","l"];
  valorcolor=["rojo","verde","azul"];


  constructor( private _route: ActivatedRoute, private crudProduct:ProductoService) { }

  ngOnInit() {
    this.obtenerid();

  }

  obtenerid(){
    console.log("el id del producto detalles", this._route.snapshot.paramMap.get('id'))
    this.idProducto=this._route.snapshot.paramMap.get('id');
    this.obtenerproducto();

  }
  

   //esto recibe los puntajes de la estrella
onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
    New Value: ${$event.newValue}, 
    Checked Color: ${$event.starRating.checkedcolor}, 
    Unchecked Color: ${$event.starRating.uncheckedcolor}`);

}

obtenerproducto(){ 
  var imagen:string;
  var product=[]; 
  this.crudProduct.recuperarproducto(this.idProducto).then((doc)=>{
        if (doc.exists) {
         product.push(doc.data());
          this.fotoproduct=doc.data().fotouno;
         /*  this.valorcolor=doc.data().etiquetacolor;
          this.valortalla=doc.data().etiquetatalla; */

          

      } else {
          // doc.data() will be undefined in this case
          console.log("no se encuentra el documento!");
      } 
    
    
  })
  .catch((err)=>{
    console.log("no se pudo obtener el documento");

  })

  this.product=product;
  console.log("la lista de los productos", this.product)
  
  

  
}


//funcion para cambiar las fotos
cambiarimagen(image:any){
  console.log("imagen", image);
  this.fotoproduct=image;

}



}
