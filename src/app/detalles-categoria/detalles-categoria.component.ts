
import { Component, OnInit,ViewChild,ElementRef,NgZone, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../servicios/categorias/categoria.service';
import { ProductoService } from '../servicios/productos/producto.service';
import { DeviceDetectorService } from 'ngx-device-detector';

// modulos importados para crear la mapa
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { isArray } from 'util';
import { DetalleproductComponent } from '../detalleproduct/detalleproduct.component';


enum CheckBoxOrdenar { mayor, menor, liquidacion, NONE };
enum CheckBoxUbicacion{todos, miciudad, NONE};

@Component({
  selector: 'app-detalles-categoria',
  templateUrl: './detalles-categoria.component.html',
  styleUrls: ['./detalles-categoria.component.scss']
})

export class DetallesCategoriaComponent implements OnInit {

  currentLat: any;
  currentLng: any;
 
  // varibles para almacenar la ubicacion del usuario
  ciudad:string;

  //variable para el sidebar
  private _opened: boolean = true;

  //variable para que angular dectecte el tipo de pantalla
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

  constructor(private _route: ActivatedRoute, private crudCategoria: CategoriaService,  private crudProduct: ProductoService, private deviceService: DeviceDetectorService, private ngZone: NgZone) { }
  
  ngOnInit() {

    this.recuperarCategoria()
    this.obtenerid();
    this.devicetypes();
    this.epicFunction();

    this.watchPosition();
  }

  //esta funcion recupera le ID
  obtenerid(){
    console.log("el id del producto detalles", this._route.snapshot.paramMap.get('id'))
    this.idCategoria=this._route.snapshot.paramMap.get('id')
    this.recuperarProductos();
    
  }

  recuperarProductos(){
    this.crudProduct.readproduct("categoria",this.idCategoria).get().then((doc)=>{
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
      this.collectionNormal=[];
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

    obtenerciudad(){
      
      console.log("direcion: ",this.ciudad);
      var str = this.ciudad;
        this.crudProduct.readproductMiciudad("categoria",this.idCategoria,str.toLowerCase()).get().then((doc)=>{
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
    
        console.log("categorias de mi ciudad: ",this.collectionNormal);

      } 

// .............................Inicio de validacion de 2 checkboks 
      validar(){ 
        var get_id_mayor= document.getElementById('customCheck1')as HTMLInputElement;
        var get_id_menor= document.getElementById('customCheck2')as HTMLInputElement;
        var get_id_liquidacion= document.getElementById('customCheck3')as HTMLInputElement;
        var get_id_todosciudad= document.getElementById('customCheck4')as HTMLInputElement;
        var get_id_miciudad= document.getElementById('customCheck5')as HTMLInputElement;

        if (get_id_mayor.checked == true &&  get_id_todosciudad.checked == true) {
          console.log("estos son los productos de mayor a menor de todas las ciudades")
          this.productosMayorMenor()
          
        }
        else if (get_id_mayor.checked == true &&  get_id_miciudad.checked == true){
          console.log("estos son los productos de mayor a menor de mi ciudad")
          this.ProductosMayorCiudad()
        }
        else if (get_id_menor.checked == true &&  get_id_todosciudad.checked == true){
          console.log("estos son los productos de menor a mayor de todas las ciudades")
          this.productosMenorMayor()
         
        }
        else if (get_id_menor.checked == true &&  get_id_miciudad.checked == true){
          console.log("estos son los productos de menor a mayor de mi ciudad")
          this.ProductosMenorCiudad()
        }

        else if (get_id_liquidacion.checked == true &&  get_id_todosciudad.checked == true){
          console.log("estos son los productos en oferta de todas las ciudades")
          this.productosLiquidacion()
        }

        else if (get_id_liquidacion.checked == true &&  get_id_miciudad.checked == true){
          console.log("estos son los productos en oferta solo de mi ciudad")
          this.ProductosLiquidacionCiudad() 
        }
        else if (get_id_liquidacion.checked == true ){
          console.log("estos son los  todos productos en oferta")
          this.productosLiquidacion() 
        }
        else if (get_id_miciudad.checked == true){
          console.log("estos son los productos de mi ciudad")
          this.obtenerciudad()
        }
        else if (get_id_todosciudad.checked == true){
          console.log("estos son los todos los productos de todas las ciudades")
          this.recuperarProductos()
        }
        else if (get_id_menor.checked == true){
          console.log("estos son los todos los productos de menor a mayor")
          this.productosMenorMayor()
        }
        else if (get_id_mayor.checked){
          console.log("estos son los todos los productos de mayor a menor jhon")
          this.productosMayorMenor()
        }

      }


//............obtenemos productos mayor a menor de mi ciudad
        ProductosMayorCiudad(){
          var str = this.ciudad;
            this.crudProduct.readproductMayorMiciudad("categoria",this.idCategoria,str.toLowerCase()).get().then((doc)=>{
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
        
            console.log("categorias de mi ciudad de mayor a menor: ",this.collectionNormal);
        }
//................obtenemos productos de orden menor a mayor de mi ciudad
        ProductosMenorCiudad(){
          var str = this.ciudad;
            this.crudProduct.readproductMenorMiciudad("categoria",this.idCategoria,str.toLowerCase()).get().then((doc)=>{
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
        
            console.log("categorias de mi ciudad de mayor a menor: ",this.collectionNormal);
        }
//..................obtenemos productos liquidados de mi ciudad
        ProductosLiquidacionCiudad(){
          var str = this.ciudad;
            this.crudProduct.readproductLiquidacionMiciudad("categoria",this.idCategoria,str.toLowerCase()).get().then((doc)=>{
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
            console.log("categorias de mi ciudad en liquidacion: ",this.collectionNormal);
        }

//............las IDs categorias de los productos del menu izquierdo
        buscarProductosCat(cat:string){
          this.idCategoria=cat;
          this.recuperarProductos();

        }

//.......................aqui comienza la geolocalizacion del usuario
      watchPosition() {
        const that = this;
        var options = {
            maximumAge: 3600000,
            timeout: 3000,
            enableHighAccuracy: true,
        }
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

        async function onSuccess(position){
          const geocode = await fetch(`https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`);
          const geoResponse = await geocode.json();
          that.ciudad=geoResponse.city;
          that.obtenerciudad(); 
         
        }
        function onError(error) {
          console.log("Failed to locate. Error");
        } 

        
      }
//...........fin de la geolocalizacion del usuario

//.....para desclickear todos los checkboxes al momento de cambiar  de categoria

uncheckAll() 
  {
    var clist = document.getElementsByTagName("input");
    for (var i = 0; i < clist.length; ++i) { clist[i].checked = false; }

  }

}


      



    



    








