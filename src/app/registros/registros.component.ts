import { Component, OnInit,ViewChild, ElementRef, NgZone } from '@angular/core';

// modulos importados para crear la mapa
import { MapsAPILoader, MouseEvent } from '@agm/core';

//importamos el modulo de logeo

import {LoginService} from '../servicios/login.service';

//importamos el modulo para crear un registro en la base de datos
import {UsuarioService} from '../servicios/usuario/usuario.service';


import { Router } from '@angular/router';

////modulo  para las alertas
import { ToastrService } from 'ngx-toastr';

//importamos el carrito para poder transferir a un usuario que ya existen el base de datos
import {CarritoService} from '../servicios/carrito/carrito.service'













@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent implements OnInit {
  //variables para usuarios
  correo:string;
  contrasena: string;

  //varibles para el registro
  nombres:string;
  apellidos:string;
  fechadenacimiento:string;
  numerodetelefono:string;
  direccion:string;
  correo2:string;
  contrasena2:string;

  //variable para almacenar el id de los productos
  idproduct=[];
  idold:any;
  idnew:string;


   // varibles para almacenar datos de la mapa
   title: string = 'AGM project';
   latitude: number;
   longitude: number;
   zoom:number;
 
   address: string;
   private geoCoder;
 
   @ViewChild('search', {static: false})
   public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,private ngZone: NgZone, private loginservice: LoginService,
     private usuarioservice: UsuarioService,private router: Router,private toastr: ToastrService,private carritoservice:CarritoService) { }

  ngOnInit() {
    //para recuperar la lista de los productos que tiene
    this.recuperarcarrito();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });


  }
  


   // Get Current Location Coordinates
   private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  //se coloca el markador cuando se mueve con el mouse

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
  
  //obtenemos las direcciones 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          this.direccion=this.address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

 async recuperarcarrito(){
  var id= await this.loginservice.readiduser();
  console.log("el id dueño de carrito", typeof(id));
  this.carritoservice.readcarrito("usuario",""+id).get().then((resp)=>{
    resp.forEach((datos)=>{
      this.idproduct.push(
        datos.id
      )

    })
    console.log("los productos de este usuario",this.idproduct);

  })
  
  


 }

 //funcion para iniciar sesion

async iniciarsesion(){
   this.idold=await this.loginservice.readiduser();
   console.log("iniciando sesion", this.correo,this.contrasena);
   console.log("usuario antes de ser transferido",this.idold);
   this.loginservice.loginByEmail(this.correo,this.contrasena).then((resp)=>{
     console.log("iniciando sesion");
     this.idnew=resp.user.uid;
     this.transferirproducto();
     
     
   })
   .catch((err)=>{
     console.log("no pudimos iniciar sesion", err);
     this.toastr.error('ocurrio un error','Error!')
   })

 }

transferirproducto(){
  
  if(this.idold !== this.idnew){
      for(var i=0;i <this.idproduct.length;i++){
        var doc=this.idproduct[i]
        this.carritoservice.updateproductocarrito(""+doc,"usuario",""+this.idnew)
       console.log("los ids del producto",doc);

        
      }


      console.log("productos trasferidos a un usuario existente");
      this.toastr.success('Bienvenido',"Exito!")
    

  }
}



registro(){
  console.log("datos de registro",
    this.nombres,
    this.apellidos,
    this.fechadenacimiento,
    this.numerodetelefono,
    this.direccion,
    this.correo2,
    this.contrasena2    
  )
  //transferir usuario  registra como un usuario nuevo
  this.loginservice.trasferiruser(this.correo2,this.contrasena2).then((usercred)=>{
     var iud=usercred.user.uid; // este es el id del usuario
            var record={
              id:iud,
              nombres:this.nombres,
              apellidos: this.apellidos,
              fechadenacimiento:this.fechadenacimiento,
              numerodetelefono:this.numerodetelefono,
              direccion:this.direccion,
              correo:this.correo2,
              contrasena: this.contrasena2

            }
            this.loginservice.loginByEmail(this.correo2,this.contrasena2).then((resp)=>{

                    this.usuarioservice.createuser(record).then((resp)=>{
                      console.log("usuario creado en la base de datos")
                      this.router.navigate(['/confirmar-datos']);
                      this.toastr.success('bienvenido', 'Exito!');

                    })
                    .catch((err)=>{
                      console.log("error al crear el usuario en la base de datos",err);
                      this.toastr.error('no se pudo crear el usuario','Error!')

                    })

              
              


            })
            .catch((err)=>{
              console.log("no pudimos loguear al usuario");
              this.toastr.error('no pudimos loguearte','Error!');
            })      


     
  })
  .catch((err)=>{
    console.log("no pudimos transferir el usuario anonimo",err);
    this.toastr.error('no pudimos trasferir tus productos a tu usuario','Error!');
  })

}









      
   





}
