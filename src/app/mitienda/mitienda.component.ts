//import { Component, OnInit } from '@angular/core';

//importamos los modulos para los chips de angular
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component,OnInit} from '@angular/core'; 
import {MatChipInputEvent} from '@angular/material/chips';


//importamos el servicio crud de Categoria
import {CategoriaService} from '../servicios/categorias/categoria.service';

//importamos el crud de productos para cargar nuestros Productos

import {ProductoService} from '../servicios/productos/producto.service';

//importamos firebase storage 
import { storage } from 'firebase';
import * as firebase from 'firebase/app';


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

  //precio de las ofertas
 porcentaje:number=0;
 descuento:number=0;


  //variables para las imagenes
  file: File;
  file1: File;
  file2: File;
  file3: File;

  //url de las imagenes para cargar
  urlfile: string;
  urlfile1: string;
  urlfile2: string;
  urlfile3: string;

  //variables del producto
  titulo: string;
  cantidad: number;
  altura:number;
  ancho:number;
  peso:number;
  espesor:number;
  precio:number;
  valorcategoria: string;
  valorsubcategoria: string="sin categoria";
  tiempoEntrega: number=0;
  valortipoventa: string="normal";
  descripciongeneral: string;
  
  

  

  photoSelected: string | ArrayBuffer;
  photoSelected1: string | ArrayBuffer;
  photoSelected2: string | ArrayBuffer;
  photoSelected3: string | ArrayBuffer;

  //collecion categorias
  collectionCategorias=["Selecciona:"];

  //obteniendo la subcategorias
  subcategoria=[];
  categoria=[];


  //talla y color false true
  valortalla=false;
  valorcolor=false;

  //para modificar el valor de tipo de ventana

  tipoVenta=false;

  //para poder ver si tiene subcategoria 

   estadosubcategoria=true;


   //  variable para el nuevo objeto de tags productos
   etiquetaproducto = new Object();

   // etiqueta de las color
   etiquetacolor= new Object();

   //etiqueta Tallas

   etiquetatalla= new Object();


  

  constructor(private fireService: CategoriaService, private productService:ProductoService ) { }


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

  //obtengo los valores de categoria desde el html
  onChange(deviceValue: any) {    
    this.obtenerunacategoria(deviceValue);
    this.valorcategoria=deviceValue;   

  }

  //obteniendo el valor de subcategoria
  subCategoria(valor:string){
    this.valorsubcategoria=valor;
  }

  //obteniendo tiempo de tiempoEntrega
  tiempoentrega(valor: number){
    
    this.tiempoEntrega=valor;

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
    
     var subcategoria=["Selecciona:"];
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

       
       
       
        this.subcategoria=subcategoria ;
        
        

        
    
        
  }



  //...............recibimos las 4 fotos.......................
  onPhotoSelected(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
         this.file=<File>event.target.files[0];
         
         //image preview
        const reader= new FileReader();
        reader.onload = e => this.photoSelected = reader.result;
        reader.readAsDataURL(this.file);

        //cuando selecciona carga la foto y recupera la url
          const filename = Math.floor(Date.now() / 1000);
          var nameImage='pictures'+filename;
          const pictures= storage().ref(nameImage);
           pictures.put(this.file).then((resp)=>{

                var storage = firebase.storage();
                var storageRef=storage.ref();
                storageRef.child(nameImage).getDownloadURL()
                  .then((resp:any)=>{
                      /* console.log("la url foto", resp); */
                      this.urlfile=resp;                      
                      
                  })
                  .catch((err)=>{
                    console.log("error al obtener","=>",err);
                  })
              
           })
        
    


    }

    
  
  }

  onPhotoSelected1(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
         this.file1=<File>event.target.files[0];
         
         //image preview
        const reader= new FileReader();
        reader.onload = e => this.photoSelected1 = reader.result;
        reader.readAsDataURL(this.file1);

        //cuando selecciona carga la foto y recupera la url
        const filename = Math.floor(Date.now() / 1000);
        var nameImage='pictures'+filename;
        const pictures= storage().ref(nameImage);
         pictures.put(this.file1).then((resp)=>{

              var storage = firebase.storage();
              var storageRef=storage.ref();
              storageRef.child(nameImage).getDownloadURL()
                .then((resp:any)=>{
                    /* console.log("la url foto", resp); */
                    this.urlfile1=resp;                      
                    
                })
                .catch((err)=>{
                  console.log("error al obtener","=>",err);
                })
            
         })
      
  
        


    }
    
  
  }

  onPhotoSelected2(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
         this.file2=<File>event.target.files[0];
         
         //image preview
        const reader= new FileReader();
        reader.onload = e => this.photoSelected2 = reader.result;
        reader.readAsDataURL(this.file2);

        //cuando selecciona carga la foto y recupera la url
        const filename = Math.floor(Date.now() / 1000);
        var nameImage='pictures'+filename;
        const pictures= storage().ref(nameImage);
         pictures.put(this.file2).then((resp)=>{

              var storage = firebase.storage();
              var storageRef=storage.ref();
              storageRef.child(nameImage).getDownloadURL()
                .then((resp:any)=>{
                    /* console.log("la url foto", resp); */
                    this.urlfile2=resp;                      
                    
                })
                .catch((err)=>{
                  console.log("error al obtener","=>",err);
                })
            
         })
      
  


    }
    
  
  }

  onPhotoSelected3(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
         this.file3=<File>event.target.files[0];
         
         //image preview
        const reader= new FileReader();
        reader.onload = e => this.photoSelected3 = reader.result;
        reader.readAsDataURL(this.file3);

        //cargamos la foto a storage
        //cuando selecciona carga la foto y recupera la url
        const filename = Math.floor(Date.now() / 1000);
        var nameImage='pictures'+filename;
        const pictures= storage().ref(nameImage);
         pictures.put(this.file3).then((resp)=>{

              var storage = firebase.storage();
              var storageRef=storage.ref();
              storageRef.child(nameImage).getDownloadURL()
                .then((resp:any)=>{
                    /* console.log("la url foto", resp); */
                    this.urlfile3=resp;                      
                    
                })
                .catch((err)=>{
                  console.log("error al obtener","=>",err);
                })
            
         })
      
  


    }
    
  
  }

//.............fin para recibir las 4 fotos...............
 

      //........... esto es para el tag de los colores...............
              visible = true;
              selectable = true;
              removable = true;
              addOnBlur = true;
              tag=0;
              readonly separatorKeysCodes: number[] = [ENTER, COMMA];
              fruits: Fruit[] = [
                {name: 'ejemplo'},
                
                
              ];

              add(event: MatChipInputEvent): void {
                const input = event.input;
                const value = event.value;

                // Add our fruit
                if ((value || '').trim()) {
                  this.fruits.push({name: value.trim()});

                  this.etiquetacolor["tag"+this.tag.toString()]=value.trim();            
                  this.tag=this.tag+1;
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
              tag1=0
         //    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
              fruits1: Fruit[] = [
                {name: 'ejemplo'},  
                
                
              ];

              add1(event: MatChipInputEvent): void {
                const input = event.input;
                const value = event.value;

                // Add our fruit
                if ((value || '').trim()) {
                  this.fruits1.push({name: value.trim()});                  
                  this.etiquetatalla["tag"+this.tag1.toString()]=value.trim();            
                  this.tag1=this.tag1+1;
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

         //........... esto es para el tag de los etiquetas de productos del producto...............
         visible2 = true;
         selectable2 = true;
         removable2 = true;
         addOnBlur2 = true;
         tag2=0
         
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
             
             this.etiquetaproducto["tag"+this.tag2.toString()]=value.trim();
            
             this.tag2=this.tag2+1;
            
             
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
        

        switch (valor) {
          case 'normal':  
           this.tipoVenta=false;          
            break;
          case 'oferta': 
            this.tipoVenta=true;
            this.valortipoventa="oferta";   
            
            break;
          case 'gold':
            this.tipoVenta=true;            
            break;
        
          
        }

        

      }  


 // crear los productos
  agregarProducto(){   
    
   /*  console.log("el titulo", this.titulo);
    console.log("cantidad", this.cantidad);
    console.log("altura", this.altura);
    console.log("ancho", this.ancho);
    console.log("espesor", this.espesor);
    console.log("peso", this.peso);
    console.log("precio", this.precio);
    console.log("categoria", this.valorcategoria);
    console.log("subcategoria",this.valorsubcategoria);
    console.log("tiempo entrega", this.tiempoEntrega);
    console.log("tipo venta", this.valortipoventa);
    console.log("desgeneral", this.descripciongeneral);
    console.log("desdetallada", this.descripciondetallada);

    //estos son arrays
    console.log("etiquetas prod", this.fruits2);
    console.log("color", this.fruits);
    console.log("talla", this.fruits1);

    //las url de las fotos
    console.log("urlfoto", this.urlfile);
    console.log("urlfoto1", this.urlfile1);
    console.log("urlfoto2", this.urlfile2);
    console.log("urlfoto3", this.urlfile3); */
    

    var record={
      titulo: this.titulo,
      cantidad: this.cantidad,
      altura: this.altura,
      ancho: this.ancho,
      espesor: this.espesor,
      peso:this.peso,
      precio: this.precio,
      categoria: this.valorcategoria,
      subcategoria: this.valorsubcategoria,
      tiempoentrega: this.tiempoEntrega,
      tipoventa:this.valortipoventa,
      descripciongeneral:this.descripciongeneral,      
      fotouno:this.urlfile,
      fotosdos: this.urlfile1,
      fototres: this.urlfile2,
      fotocuatro: this.urlfile3,
      etiquetaproducto: this.etiquetaproducto,
      etiquetacolor: this.etiquetacolor,
      etiquetatalla: this.etiquetatalla,
      descuento: this.porcentaje,
      preciodescuento: this.descuento,
    
    
    };
    
    
 // esta es la funcion para poder enviar  a la base de datos

    this.productService.createproduct(record).then((resp)=>{

        console.log("datos enviados correctamente a firebase");
    
    })
    .catch((err)=>{
      console.log(err);
    })

  }


  Descuento(valor:any){
     if(valor >0 && valor < 100){
      var cantidaddescontada=(valor/100) * this.precio;        
      this.descuento= this.precio-cantidaddescontada;

     }else{
       this.descuento=null;
     }
     

  } 

  


}
