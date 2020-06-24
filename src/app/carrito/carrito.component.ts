import { Component, OnInit } from '@angular/core';

import {CarritoService} from '../servicios/carrito/carrito.service';

import { AngularFireAuth } from '@angular/fire/auth';







@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  coleccioncarrito=[];
  iduser:string;
  id:string;

  total:number;
 


  constructor( private carritoservice: CarritoService, private afAuth:AngularFireAuth) {

   
   }

  ngOnInit(){   
   
    this.asincrono();

    
    
    
  }

  async asincrono(){
    var id= await this.recuperaid();
    console.log("el id es ", id);
   // this.recuperarcarrito(id);  
    this.recuperarcarritoprueba(id);
    this.recuperarcarrito(id);
    
    
  }


 recuperaid(){
    

    return new Promise((resolved, reject)=>{

          this.afAuth.auth.onAuthStateChanged( firebaseuser=>{          
            
            var id= firebaseuser.uid;  
            resolved(id);                      
          
        });
      

    })  

    
  
    

    

  }
  
  recuperarcarritoprueba(iduser){
    
    this.carritoservice.readcarrito("usuario",iduser).onSnapshot((doc)=>{
      this.coleccioncarrito=[];
        doc.forEach((datos)=>{
          console.log("escuchando data: ", datos.data());
          this.coleccioncarrito.push({
            iud:datos.id,
            data:datos.data(),
          })

        })

          //Calculamos el TOTAL 
          this.total = this.coleccioncarrito.reduce((
            acc,
            obj,
          ) => acc + (obj.data.precio * obj.data.cantidadpedida),
          0);
          console.log("Total: ", this.total)
    },(error)=>{
      console.log("no se pudo obtener el doc", error);
    }
    
    )
    


  }
  

 recuperarcarrito(id){

    
    console.log("id dentro de colectioncarrito",id);
    var clave="usuario"; 
    this.carritoservice.readcarrito(clave,id).get().then((res)=>{
      this.coleccioncarrito=[];
      res.forEach((datos)=>{
         
          this.coleccioncarrito.push({
            iud:datos.id,
            data:datos.data()
          })

      })
      
    }).catch((err)=>{
      console.log("no se pudo obtener su lista de carrito",err);
    })


    console.log("la coleccioncarrito", this.coleccioncarrito);
    

    

  }


  //esta funcion es para recibir los valores de las cantidades
  selectcantidad(cantidad: string, idproduct: string){
    this.carritoservice.updateproductcarrito("cantidadpedida",idproduct,parseInt(cantidad,10)).then((resp)=>{
      console.log("cantidad actualizada");
    })
    .catch((err)=>{
      console.log("error al actualizar cantidad");
    })

   
  }


  //esta funcion es para borrar productos del carritos

borrarproducto(id:string){ 
      
    this.carritoservice.deleteproductcarrito(id).then((resp)=>{
      console.log("producto borrado",id);  
     
      
    })
    .catch((err)=>{
      console.log("no pudimos borrar los productos");
    })

  }



  

}
