import { Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import {MapsAPILoader, MouseEvent} from '@agm/core';



//modulo para recuperar el id del usuario
import {LoginService} from '../servicios/login.service';

//importamos para recuperar los productos del usuario
import { CarritoService } from '../servicios/carrito/carrito.service';

//importamos para enviar a la base de datos a la seccion donde  se vendieron
import {ComprasService} from '../servicios/compras/compras.service';

////modulo  para las alertas
import { ToastrService } from 'ngx-toastr';


import { Router } from '@angular/router';








@Component({
  selector: 'app-confirmar-datos',
  templateUrl: './confirmar-datos.component.html',
  styleUrls: ['./confirmar-datos.component.scss']
})
export class ConfirmarDatosComponent implements OnInit {
  // varibles para almacenar datos de la mapa
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom:number;

  //colecccion del carrito que va ha mostrar
  collectioncarrito=[];

  //el total de productos en la tabla
  total:number;

  //varibles para capturar los datos de confirmacion
  nombres:string;
  apellidos:string;
  telefono:string;
  correo:string;
  direccion:string;
  referencia:string;

  address: string;
  private geoCoder;

  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,private ngZone: NgZone, private loginservice: LoginService,
     private carritoservice: CarritoService, private comprasservice: ComprasService, private toastr: ToastrService, private router:Router) { }


  ngOnInit() {

    //funciones que ejecutan el producto
    this.recuperarid();

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
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  //funcion para recuperar el id del usuario
 async recuperarid(){    
    var id= await this.loginservice.readiduser();
    console.log("el usuario es ", id);
    this.recuperarproductos(id);

  

  }


  //recuperar todos los productos en carrito del usuario 
  recuperarproductos(id){
    this.carritoservice.readcarrito("usuario",id).get().then((doc)=>{
      doc.forEach((datos)=>{
        this.collectioncarrito.push({
          iud: datos.id,
          data:datos.data()

        });
      })
      //Calculamos el TOTAL 
      this.total = this.collectioncarrito.reduce((
        acc,
        obj,
      ) => acc + (obj.data.precio * obj.data.cantidadpedida),
      0);
      console.log("Total: ", this.total)


    })
    .catch((err)=>{
      console.log("no pudimos recuperar el carrito de productos");
    })

    console.log("coleccion carrito", this.collectioncarrito);


  }



  // la funcion para hacer el proceso de compra
 async comprar(){
   try {

        var iduser=await this.loginservice.readiduser();
        var record={
          nombre: this.nombres,
          apellido: this.apellidos,
          telefono: this.telefono,
          correo: this.correo,
          direccion: this.address,
          referencia: this.referencia,
          productos: this.collectioncarrito,
          iduser: iduser    
    
          }
      
    
        this.comprasservice.createcompra(record).then((result) => {         
          this.borrardecarrito();              
          
        })
        .then((result) => {           
           this.toastr.success('gracias por comprar','En hora en buena!');
           this.router.navigate(['/imprimir-recibo']);
        })
        .catch((err)=>{
          this.toastr.error("ha ocurrido un error asegurese de agregar datos validos","Error!")
        })
        
   } catch (error) {
        this.toastr.error("ha ocurrido un error asegurese de agregar datos validos","Error!")


     
   }    
  }

  borrardecarrito(){
    for(var i=0;i<this.collectioncarrito.length;i++){
      var iddoc= this.collectioncarrito[i].iud;      
      this.carritoservice.deleteproductcarrito(iddoc);


    }


  }






}
