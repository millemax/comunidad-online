
import { Component, OnInit,ViewChild,ElementRef,NgZone, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../servicios/categorias/categoria.service';
import { ProductoService } from '../servicios/productos/producto.service';
import { DeviceDetectorService } from 'ngx-device-detector';

// modulos importados para crear la mapa
import { MapsAPILoader, MouseEvent } from '@agm/core';


enum CheckBoxOrdenar { mayor, menor, liquidacion, NONE };
enum CheckBoxUbicacion{todos, miciudad, NONE};

@Component({
  selector: 'app-detalles-categoria',
  templateUrl: './detalles-categoria.component.html',
  styleUrls: ['./detalles-categoria.component.scss']
})

export class DetallesCategoriaComponent implements OnInit {
  // varibles para almacenar datos de la mapa
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  address: string;
  private geoCoder;
  // varibles para almacenar datos de la mapa

  private _opened: boolean = true;

  deviceInfo = null;

  //collection productos categoria
  collectionNormal=[];

  //esta es la colección categoria
  collectionCategorias=[]; 

  //esta es para los chekbox ordenar
  check_box_type = CheckBoxOrdenar;
  currentlyChecked: CheckBoxOrdenar;

  //esta es para los chekbox ubicacion
  check_box= CheckBoxUbicacion;
  currentChecked: CheckBoxUbicacion;

  // para recuperar los IDs ce categoria
  idCategoria:string;
  product=[];

  // para recuperar de mayor a menor
  collectionMayorMenor=[];

  // para recuperar de mayor a menor
  collectiondemiCiudad=[];




  constructor(private _route: ActivatedRoute, private crudCategoria: CategoriaService,  private crudProduct: ProductoService, private deviceService: DeviceDetectorService,private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }
  
  ngOnInit() {

    //load Places Autocomplete
     this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      
    }); 
    
    this.recuperarCategoria()
    this.obtenerid();
    this.devicetypes();
    this.epicFunction();

    
/*    navigator.geolocation.getCurrentPosition(this.onSucccess, this.onError, this.config ); */
  }



  //esta funcion recupera le ID
  obtenerid(){
    console.log("el id del producto detalles", this._route.snapshot.paramMap.get('id'))
    this.idCategoria=this._route.snapshot.paramMap.get('id')
    this.recuperarProductos();
    
  }

  recuperarProductos(){
    this.crudProduct.readproduct("categoria",this.idCategoria).get().then((doc)=>{
      doc.forEach((datos)=>{
        this.collectionNormal.push({
          iud: datos.id,
          data:datos.data()
        }
        );

      })
    })
    .catch((err)=>{
      console.log("no se puede obtener el documento",err);
    });

    console.log("categorias productos: ",this.collectionNormal);
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


  //reconocimiento de dispositivos
  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
  }

  devicetypes(){            
      const isMobile = this.deviceService.isMobile();
      const isTablet = this.deviceService.isTablet();
      const isDesktopDevice = this.deviceService.isDesktop();

      if (isMobile == true){
           this._opened=false;

      }else{
        if(isDesktopDevice){
          this._opened=true;

        }

      }

  }

  //ordenar de mayor a menor
  productosMayorMenor(){
   
    this.crudProduct.readproductmayorMenor("categoria",this.idCategoria).get().then((doc)=>{
      this.collectionNormal=[];
      doc.forEach((datos)=>{
        this.collectionNormal.push({
          iud: datos.id,
          data:datos.data()
        }
        );

      })
    })
    .catch((err)=>{
      console.log("no se puede obtener el documento",err);
    });

    console.log("categorias productos mayor: ",this.collectionNormal);
  }



  //ordenar de menor a mayor
  productosMenorMayor(){
    this.crudProduct.readproductmenorMayor("categoria",this.idCategoria).get().then((doc)=>{
      this.collectionNormal=[];
      doc.forEach((datos)=>{
        this.collectionNormal.push({
          iud: datos.id,
          data:datos.data()
        }
        );
  
      })
    })
    .catch((err)=>{
      console.log("no se puede obtener el documento",err);
    });

    console.log("categorias productos menor: ",this.collectionNormal);
  }


  //ordenar de menor a mayor
  productosLiquidacion(){
    this.crudProduct.readproductliquidacion("categoria",this.idCategoria).get().then((doc)=>{
      this.collectionNormal=[];
      doc.forEach((datos)=>{
        this.collectionNormal.push({
          iud: datos.id,
          data:datos.data()
        }
        );
  
      })
    })
    .catch((err)=>{
      console.log("no se puede obtener el documento",err);
    });

    console.log("categorias liquidacion: ",this.collectionNormal);
  }


// obtener el valor de las casillas amayor
  checkboxesMayor(valor:any){

    this.collectionNormal=[];
    console.log("el valor es ",valor);
    if (valor==true) {
      this.productosMayorMenor()

      
    } else {
      this.collectionNormal=[];
      console.log("se borro la vaina")
      
    }

  }

// obtener el valor de las casillas menor
  checkboxesMenor(valor:any){
    this.collectionNormal=[];
    console.log("el valor es",valor);
    if (valor==true) {
      this.productosMenorMayor()

      
    } else {
      this.collectionNormal=[];
      console.log("se borro la vaina")
      
    }

  }


// obtener el valor de las casillas menor
  checkboxesLiquidacion(valor:any){
    this.collectionNormal=[];
    console.log("el valor es",valor);
    if (valor==true) {
      this.productosLiquidacion()

      
    } else {
      this.collectionNormal=[];
      console.log("se borro la vaina")
      
    }

  }

  // obtener todos los pŕoductos
  checkboxesTodos(valor:any){
    this.collectionNormal=[];
    console.log("el valor es",valor);
    if (valor==true) {
      this.recuperarProductos()

      
    } else {
      this.collectionNormal=[];
      console.log("se borro la vaina")
      
    }

  }


    // obtener todos los pŕoductos
    checkboxesMiciudad(valor:any){
      this.collectionNormal=[];
      console.log("el valor es",valor);
      if (valor==true) {
        this.obtenerciudad()
  
      } else {
        this.collectionNormal=[];
        console.log("se borro la vaina")
        
      }
  
    }

//.......................aqui comienza la geolocalizacion del usuario

  // Get Current Location Coordinates
     private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
     
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.getAddress(this.latitude, this.longitude);
          
        });

        
      }

    } 

    //obtenemos las direcciones 
    getAddress(latitude, longitude) {
      this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            
            this.address = results[8].formatted_address;
            this.obtenerciudad()
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    }

    obtenerciudad(){
      
      console.log("direcion",this.address);
      var str = this.address;
      var res = str.split(',');
        this.crudProduct.readproductMiciudad("categoria",this.idCategoria,res[0].toLowerCase()).get().then((doc)=>{
          doc.forEach((datos)=>{
            this.collectionNormal.push({
              iud: datos.id,
              data:datos.data()
            }
            );
    
          })
        })
        .catch((err)=>{
          console.log("no se puede obtener el documento",err);
        });
    
        console.log("categorias de mi ciudad: ",this.collectionNormal);

      } 

      validar(){ 
       
       
        var get_id_mayor= document.getElementById('customCheck1')as HTMLInputElement;
        var get_id_menor= document.getElementById('customCheck2')as HTMLInputElement;
        var get_id_liquidacion= document.getElementById('customCheck3')as HTMLInputElement;
        var get_id_todosciudad= document.getElementById('customCheck4')as HTMLInputElement;
        var get_id_miciudad= document.getElementById('customCheck5')as HTMLInputElement;

        if (get_id_mayor.checked == true &&  get_id_todosciudad.checked == true) {
          this.productosMayorMenor()
          
        }

        else if (get_id_mayor.checked == true &&  get_id_miciudad.checked == true){
          console.log("haloooo222222");
        }
        else if (get_id_menor.checked == true &&  get_id_todosciudad.checked == true){
          this.productosMenorMayor()
         
        }
        else if (get_id_menor.checked == true &&  get_id_miciudad.checked == true){
          console.log("haloooo4444");
        }
        else if (get_id_liquidacion.checked == true &&  get_id_todosciudad.checked == true){
          this.productosLiquidacion()
        }
        else if (get_id_liquidacion.checked == true &&  get_id_miciudad.checked == true){
          console.log("halooo666666666");
        }
      
  
        }

        //obtenemos productos mayor de todas las ciudades
        productosMayorTodos(){
          this.crudProduct.readproductmenorMayor("categoria",this.idCategoria).get().then((doc)=>{
            doc.forEach((datos)=>{
              this.collectionNormal.push({
                iud: datos.id,
                data:datos.data()
              }
              );
        
            })
          })
          .catch((err)=>{
            console.log("no se puede obtener el documento",err);
          });
      
          console.log("categorias productos menor: ",this.collectionNormal);
        }

      }



    



    








