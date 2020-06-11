import { Component, OnInit } from '@angular/core';
import {CategoriaService} from '../servicios/categorias/categoria.service';
import { StarRatingComponent } from 'ng-starrating';
import {ProductoService} from '../servicios/productos/producto.service'




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //esta es la colección categoria
  collectionCategorias=[]; 

  //collecion de los productos oferta
  collectionOferta=[];

  //collection productos
  collectionNormal=[];

  constructor (private crudCategoria: CategoriaService, private crudProductos: ProductoService){

  }
 

  ngOnInit(){
    this.recuperarCategoria();
    this.recuperarProductosoferta();
    this.recuperarProductos();
  } 

  recuperarProductosoferta(){
    var tipoproducto="oferta";
    this.crudProductos.readproduct(tipoproducto).then((res)=>{      
      res.forEach((datos)=>{
            // console.log(doc.id, " => ", doc.data());
            this.collectionOferta.push(
               datos.data()
            );
         });

      

    })
    .catch((err)=>{
      console.log("no se puedo recuperar de la base de datos", err);

    })

  }

  recuperarProductos(){
    var tipoproducto="normal";
    this.crudProductos.readproduct(tipoproducto).then((res)=>{
      res.forEach((datos)=>{
        this.collectionNormal.push(
          datos.data()
        );

      });

    })
    .catch((err)=>{
      console.log("no se puedo recuperar productos");
    })

  }
  

  recuperarCategoria(){
    this.crudCategoria.readcategorys().subscribe((resultados)=>{
      resultados.forEach((datostarea)=>{
        this.collectionCategorias.push(
          datostarea.payload.doc.id,
        );
      })
    });
    console.log("categorias : ",this.collectionCategorias);

  } 


  //esto recibe los puntajes de la estrella
onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);

  }
  
  
  


}
