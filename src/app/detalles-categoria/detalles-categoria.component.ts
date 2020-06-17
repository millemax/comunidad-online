import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoriaService} from '../servicios/categorias/categoria.service';
enum CheckBoxOrdenar { mayor, menor, liquidacion, NONE };
enum CheckBoxUbicacion{todos, miciudad, NONE};
@Component({
  selector: 'app-detalles-categoria',
  templateUrl: './detalles-categoria.component.html',
  styleUrls: ['./detalles-categoria.component.scss']
})
export class DetallesCategoriaComponent implements OnInit {
  private _opened: boolean = true;

  //esta es la colección categoria
  collectionCategorias=[]; 

  //esta es para los chekbox ordenar
  check_box_type = CheckBoxOrdenar;
  currentlyChecked: CheckBoxOrdenar;

  //esta es para los chekbox ubicacion
  check_box= CheckBoxUbicacion;
  currentChecked: CheckBoxUbicacion;

  // para recuperar los IDs
  idProducto:string;
  product=[];

    

  constructor(private _route: ActivatedRoute, private crudCategoria: CategoriaService) { }

  ngOnInit() {
    this.recuperarCategoria()
    this.obtenerid();
 
  }
  //esta funcion recupera le ID
  obtenerid(){
    console.log("el id del producto detalles", this._route.snapshot.paramMap.get('id'))
  /*   this.idProducto=this._route.snapshot.paramMap.get('id'); */
    //this.recuperarCategoria();
  }


  //esta es la parte del sidebar
  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  // ------------------esta es para validar los checkbox

  selectCheckBoxOrdenar(targetType: CheckBoxOrdenar) {
    // Si la casilla de verificación ya estaba marcada, borre la variable actualmente Comprobada
    if(this.currentlyChecked === targetType) {
      this.currentlyChecked = CheckBoxOrdenar.NONE;
      return;
    }

    this.currentlyChecked = targetType;
  }

  selectCheckBoxUbicacion(targetType: CheckBoxUbicacion) {
    // Si la casilla de verificación ya estaba marcada, borre la variable actualmente Comprobada
    if(this.currentChecked === targetType) {
      this.currentChecked = CheckBoxUbicacion.NONE;
      return;
    }

    this.currentChecked = targetType;
  }

  // ------------------esta es el final para validar los checkbox


  //recupera la lista de categorias del sidebar
  recuperarCategoria(){
    this.crudCategoria.readcategorys().subscribe((resultados)=>{
      resultados.forEach((datostarea)=>{
        this.collectionCategorias.push({
          id:datostarea.payload.doc.id,
          data:datostarea.payload.doc.data(),
        }
          
        );
      })
    });
    console.log("categorias : ",this.collectionCategorias);

  } 

}


