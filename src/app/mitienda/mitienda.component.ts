//import { Component, OnInit } from '@angular/core';

//importamos los modulos para los chips de angular
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component,OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';


//importamos el servicio crud de Categoria
import {CategoriaService} from '../servicios/categorias/categoria.service';

export interface Fruit {
  name: string;
}

//esto es para cargar la foto
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-mitienda',
  templateUrl: './mitienda.component.html',
  styleUrls: ['./mitienda.component.scss']
})
export class MitiendaComponent implements OnInit {
  //variables para las imagenes
  file: File;
  file1: File;
  file2: File;
  file3: File;

  photoSelected: string | ArrayBuffer;
  photoSelected1: string | ArrayBuffer;
  photoSelected2: string | ArrayBuffer;
  photoSelected3: string | ArrayBuffer;

  //collecion categorias
  collectionCategorias=[];

  categoria=[];


  constructor(private fireService: CategoriaService) { }


  ngOnInit() {
    this.obtenercategorias();
    this.obtenerunacategoria('Electronicos');

  }
  
  //otengo las categorias que tengo disponible
  obtenercategorias(){
        this.fireService.readcategorys().subscribe((resultados)=>{
          resultados.forEach((datostarea)=>{
            this.collectionCategorias.push(
              datostarea.payload.doc.id,
            );           

          })


        });
        console.log("categorias : ",this.collectionCategorias);
  }

  //obtengo solo una categoria y sus datos 
  obtenerunacategoria(dato:string){
    
        this.fireService.readcategory(dato).then(function(doc){          
          if (doc.exists) {
            console.log("document data", doc.data())
            
          } else {
            console.log("no se encontro el documento");
            
          }

        }).catch(function(err){
          console.log("erro al obtener documento");

        });
    
        
  }



  //...............recibimos las 4 fotos.......................
  onPhotoSelected(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
         this.file=<File>event.target.files[0];
         
         //image preview
        const reader= new FileReader();
        reader.onload = e => this.photoSelected = reader.result;
        reader.readAsDataURL(this.file);


    }
    
  
  }

  onPhotoSelected1(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
         this.file1=<File>event.target.files[0];
         
         //image preview
        const reader= new FileReader();
        reader.onload = e => this.photoSelected1 = reader.result;
        reader.readAsDataURL(this.file1);


    }
    
  
  }

  onPhotoSelected2(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
         this.file2=<File>event.target.files[0];
         
         //image preview
        const reader= new FileReader();
        reader.onload = e => this.photoSelected2 = reader.result;
        reader.readAsDataURL(this.file2);


    }
    
  
  }

  onPhotoSelected3(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
         this.file3=<File>event.target.files[0];
         
         //image preview
        const reader= new FileReader();
        reader.onload = e => this.photoSelected3 = reader.result;
        reader.readAsDataURL(this.file3);


    }
    
  
  }

//.............fin para recibir las 4 fotos...............
 

//........... esto es para el tag...............
        visible = true;
        selectable = true;
        removable = true;
        addOnBlur = true;
        readonly separatorKeysCodes: number[] = [ENTER, COMMA];
        fruits: Fruit[] = [
          {name: 'negro'},
          {name: 'verde'}
          
        ];

        add(event: MatChipInputEvent): void {
          const input = event.input;
          const value = event.value;

          // Add our fruit
          if ((value || '').trim()) {
            this.fruits.push({name: value.trim()});
          }

          // Reset the input value
          if (input) {
            input.value = '';
          }
        }

        remove(fruit: Fruit): void {
          const index = this.fruits.indexOf(fruit);

          if (index >= 0) {
            this.fruits.splice(index, 1);
          }
        }
  //..............fin de los tags....................
  
}
