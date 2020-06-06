import { Component, OnInit } from '@angular/core';
import {CategoriaService} from '../servicios/categorias/categoria.service'




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //esta es la colección categoria
  collectionCategorias=[]; 

  constructor (private crudCategoria: CategoriaService){

  }
 

  ngOnInit(){
    this.recuperarCategoria();
     
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
  
  
  


}
