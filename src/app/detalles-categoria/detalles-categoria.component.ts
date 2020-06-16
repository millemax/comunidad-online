import { Component, OnInit } from '@angular/core';
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

    

  constructor(private crudCategoria: CategoriaService) { }

  ngOnInit() {
    this.recuperarCategoria()
 
  }
  private _toggleSidebar() {
    this._opened = !this._opened;
  }

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
