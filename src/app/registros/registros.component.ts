import { Component, OnInit,ViewChild, ElementRef, NgZone } from '@angular/core';

// modulos importados para crear la mapa
import { MapsAPILoader, MouseEvent } from '@agm/core';

//importamos el modulo de logeo

import {LoginService} from '../servicios/login.service'

//importamos el modulo para crear un registro en la base de datos
import {UsuarioService} from '../servicios/usuario/usuario.service';


import { Router } from '@angular/router';






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
     private usuarioservice: UsuarioService,private router: Router) { }

  ngOnInit() {

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


  //esta funcion es para iniciar sesion
  iniciarsesion(){

       

        if (this.correo==null && this.contrasena==null) {
          console.log("ingrese una cuenta valida")
          
        } else {
            this.loginservice.loginByEmail(this.correo, this.contrasena).then((usercred)=>{
              console.log("el usuario logueado es", usercred.user.uid);

            })
            .catch((err)=>{
              console.log("error no se pudo actualizar el usuario", err);

              
            })
          
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


                      })
                      .catch((err)=>{
                        console.log("error al crear el usuario en la base de datos",err);

                      })

                
                


              })
              .catch((err)=>{
                console.log("no pudimos loguear al usuario")
              })      


       
    })
    .catch((err)=>{
      console.log("no pudimos transferir el usuario anonimo",err);
    })

  }





}
