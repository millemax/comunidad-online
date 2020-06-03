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

  //obteniendo la subcategorias
  subcategoria=[];
  categoria=[];


  //talla y color false true
  valortalla=false;
  valorcolor=false;

  //para modificar el valor de tipo de ventana

  tipoVenta=false;



  constructor(private fireService: CategoriaService) { }


  ngOnInit() {
    this.obtenercategorias();
    
    
    

  }

  //obtenemos estados de color
  color(valor:any){
    
    this.valorcolor=!this.valorcolor;

  }

  //obtenemos los estados de Talla
  talla(valor:any){
    this.valortalla=!this.valortalla;

  }

  //obtengo los valores de categoria
  onChange(deviceValue: any) {
    
    this.obtenerunacategoria(deviceValue);
    

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
    
     var subcategoria=[];
        var value:any;
        this.fireService.readcategory(dato).then(function(doc){          
          if (doc.exists) {
            
             for(let key in doc.data()){               
               
               value=doc.data()[key];            
               
               subcategoria.push(value);     
             }        
             
                       
            
            
          } else {
            console.log("no se encontro el documento");
            
          }

        }).catch(function(err){
          console.log("erro al obtener documento", err);

        });         

       
       
        this.subcategoria=subcategoria;
        console.log("array global", this.subcategoria);

        
    
        
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
 

      //........... esto es para el tag de los colores...............
              visible = true;
              selectable = true;
              removable = true;
              addOnBlur = true;
              readonly separatorKeysCodes: number[] = [ENTER, COMMA];
              fruits: Fruit[] = [
                {name: 'negro'},
                
                
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


       //........... esto es para el tag de los tallas...............
              visible1 = true;
              selectable1 = true;
              removable1 = true;
              addOnBlur1 = true;
         //    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
              fruits1: Fruit[] = [
                {name: 'S'},  
                
                
              ];

              add1(event: MatChipInputEvent): void {
                const input = event.input;
                const value = event.value;

                // Add our fruit
                if ((value || '').trim()) {
                  this.fruits1.push({name: value.trim()});
                }

                // Reset the input value
                if (input) {
                  input.value = '';
                }
              }

              remove1(fruit: Fruit): void {
                const index = this.fruits1.indexOf(fruit);

                if (index >= 0) {
                  this.fruits1.splice(index, 1);
                }
              }
        //..............fin de los tags....................

         //........... esto es para el tag de los descripcion del producto...............
         visible2 = true;
         selectable2 = true;
         removable2 = true;
         addOnBlur2 = true;
    //    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
         fruits2: Fruit[] = [
           {name: 'ejemplo'},  
           
           
         ];

         add2(event: MatChipInputEvent): void {
           const input = event.input;
           const value = event.value;

           // Add our fruit
           if ((value || '').trim()) {
             this.fruits2.push({name: value.trim()});
           }

           // Reset the input value
           if (input) {
             input.value = '';
           }
         }

         remove2(fruit: Fruit): void {
           const index = this.fruits2.indexOf(fruit);

           if (index >= 0) {
             this.fruits2.splice(index, 1);
           }
         }
   //..............fin de los tags...................



      //-......................tipo de venta.............
      tipoventa(valor:string){
        console.log("valor :",  valor);
        /* if (valor=='oferta') {
           this.tipoVenta=true;
          
        } else {
          if (valor=='gold'){
            this.tipoVenta=true;

          }
          
        } */

        switch (valor) {
          case 'normal':  
           this.tipoVenta=false;          
            break;
          case 'oferta': 
            this.tipoVenta=true;           
            break;
          case 'gold':
            this.tipoVenta=true;            
            break;
        
          
        }

        

      }  
  
}
