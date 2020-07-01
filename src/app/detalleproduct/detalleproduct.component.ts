import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

//estamos importando a la casa de la moneda
import { StarRatingComponent } from 'ng-starrating';


//importamos los servicios para reucperar un solo producto
import {ProductoService} from '../servicios/productos/producto.service';

//esto son componentes para el modal
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// importamos los servicios para obtener el estado de autenticacion

import {LoginService} from '../servicios/login.service';

//importamos para crear productos en los cacrritos

import {CarritoService} from '../servicios/carrito/carrito.service';

//para poder autenticacion del usuario
import { AngularFireAuth } from '@angular/fire/auth';





@Component({
  selector: 'app-detalleproduct',
  templateUrl: './detalleproduct.component.html',
  styleUrls: ['./detalleproduct.component.scss'],

  // add NgbModalConfig and NgbModal para que funcione el modal
  providers: [NgbModalConfig, NgbModal]
})
export class DetalleproductComponent implements OnInit {

  idProducto:string;
  producto:any;

  //variable para cambiar cuando le da click
  fotoproduct: string;

  //variable para recpeionar los colores y tallas
  valortalla:any;
  valorcolor:any;

  estadocolor=true;
  estadotalla=true;
  tipodeventa:string;
  precio:number;
  preciodescuento:number;
  



  constructor( private _route: ActivatedRoute,
     private crudProduct:ProductoService,
     config: NgbModalConfig,
     private modalService: NgbModal,
     private loginservice: LoginService, 
     private carritoservice: CarritoService,
     private afAuth:AngularFireAuth
      
      ) { 
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.obtenerid();

    

  }

 
  

  


  obtenerid(){
    console.log("el id del producto detalles", this._route.snapshot.paramMap.get('id'))
    this.idProducto=this._route.snapshot.paramMap.get('id');
    this.obtenerproducto();

  }
  

   //esto recibe los puntajes de la estrella
onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}){
    alert(`Old Value:${$event.oldValue}, 
    New Value: ${$event.newValue}, 
    Checked Color: ${$event.starRating.checkedcolor}, 
    Unchecked Color: ${$event.starRating.uncheckedcolor}`);

}

obtenerproducto(){ 
  var imagen:string;
  var product=[]; 
  this.crudProduct.recuperarproducto(this.idProducto).then(doc=>{
        if (doc.exists) {
          product.push({
            iud: doc.id,
            data: doc.data()
          }
            );
          this.fotoproduct=doc.data().fotouno;
          this.valorcolor=doc.data().etiquetacolor;
          this.valortalla=doc.data().etiquetatalla; 
          this.tipodeventa=doc.data().tipoventa;
         // this.precio=doc.data().precio;
          this.preciodescuento=doc.data().preciodescuento;

          

      } else {
          // doc.data() will be undefined in this case
          console.log("no se encuentra el documento!");
      } 
    
    
  })
  .then((res)=>{
    this.producto=product;
    this.producto[0].data["cantidadpedida"]=1;
     if (this.valorcolor.length==0){
         this.estadocolor=false;
         

     } else {
      this.producto[0].data.etiquetacolor=this.valorcolor[0];

       
     }
  })
  .then((res)=>{
    
    if (this.valortalla.length==0) {
       this.estadotalla=false;
      
    } else {
      this.producto[0].data.etiquetatalla=this.valortalla[0];
      
    }
  })

  
   
  .catch((err)=>{
    console.log("no se pudo obtener el documento");

  })

  
  
  
  

  
}




//funcion para cambiar las fotos
cambiarimagen(image:any){
  console.log("imagen", image);
  this.fotoproduct=image;
}

// esto es para capturar los valores de los colores
capturarcolor(color:any){
  console.log("captura de color", color);
  this.producto[0].data.etiquetacolor=color;


}
//esto captura los valores de talla seleccionado
capturartalla(talla:any){
  console.log("captura de talla", talla);
  this.producto[0].data.etiquetatalla=talla;

}

//esto captura la cantidad que escogio
capturarcantidad(cantidad:string){
  console.log("captura de cantidad",cantidad);
  this.producto[0].data["cantidadpedida"]=parseInt(cantidad,10);
}


//esta es la funcion para añadir al carrito de compras

async anadir1(content){

  var record=this.producto[0].data;
  var id:string; 

  if (this.tipodeventa=="oferta"){
    record["precio"]=this.preciodescuento;
           /*    //obtengo el id de usuario
            this.afAuth.auth.onAuthStateChanged(firebaseuser=>{     
                    
              console.log("el usuario autenticado",firebaseuser.uid);
              id=firebaseuser.uid;
              record["usuario"]=id;

                      this.carritoservice.createproductocarrito(record).then((result)=>{

                        //para abrir el modal de aviso
                        this.modalService.open(content);

                        console.log("producto agregado a carrito correctamente");
                        
                      })
                    .catch((err)=>{
                        console.log("no se puedo agregar al carrito");
                      
                    })


            }) */

      
       //correccion de cargar productos   por que se esta activando el suthstate y esta ejecutando el modal
      
     var iud = await this.loginservice.readiduser();
     console.log("el usuario autenticado",iud);
     record["usuario"]=iud;
     this.carritoservice.createproductocarrito(record).then((result)=>{

          //para abrir el modal de aviso
          this.modalService.open(content);

          console.log("producto agregado a carrito correctamente");
          
        })
      .catch((err)=>{
          console.log("no se puedo agregar al carrito");
    
  })
     

       



    
  } else{
      var iud = await this.loginservice.readiduser();
      console.log("el usuario autenticado",iud);
      record["usuario"]=iud;
      this.carritoservice.createproductocarrito(record).then((result)=>{

        //para abrir el modal de aviso
        this.modalService.open(content);

        console.log("producto agregado a carrito correctamente");
        
      })
    .catch((err)=>{
        console.log("no se puedo agregar al carrito");
      
    })


      /*     //obtengo el id de usuario
        this.afAuth.auth.onAuthStateChanged(firebaseuser=>{     
                
          console.log("el usuario autenticado",firebaseuser.uid);
          id=firebaseuser.uid;
          record["usuario"]=id;

                  this.carritoservice.createproductocarrito(record).then((result)=>{

                    //para abrir el modal de aviso
                    this.modalService.open(content);

                    console.log("producto agregado a carrito correctamente");
                    
                  })
                .catch((err)=>{
                    console.log("no se puedo agregar al carrito");
                  
                })


  }) */






  }


  

 
  

  
  

}



}
