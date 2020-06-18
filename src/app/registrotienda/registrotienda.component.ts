import { Component, OnInit,ViewChild,ElementRef,NgZone, Input} from '@angular/core';


// modulos importados para crear la mapa
import { MapsAPILoader, MouseEvent } from '@agm/core';

//incrustar video de youtube con angular
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

//importamos el servicio crud de Categoria
import {CategoriaService} from '../servicios/categorias/categoria.service';

//importamo el crud para cargar tiendas
import {RegistrotiendaService} from '../servicios/registrotienda/registrotienda.service'; 


import { storage } from 'firebase';
import * as firebase from 'firebase/app';
//archivos


//autocompletado de eneto target
interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-registrotienda',
  templateUrl: './registrotienda.component.html',
  styleUrls: ['./registrotienda.component.scss'],
  
})
export class RegistrotiendaComponent implements OnInit {
 //variables para los do
  filedoc:File;
  urlfiledoc:string;
  //variables guardar fotos cuando exista un archivo
  
  file:File;
  fileuno:File;
  filedos:File;
  filetres:File;

  //url de las imagenes para cargar
  urlfile:string;
  urlfileuno:string;
  urlfiledos:string;
  urlfiletres:string;

  fotoceroSelected:string | ArrayBuffer;
  fotoSelected:string | ArrayBuffer;
  fotounoSelected:string | ArrayBuffer;
  fotodosSelected:string | ArrayBuffer;
  
  //guardar video en registro teinda
  video:any;
  
  //collecion categorias
  collectionCategorias=["Selecciona:"];
  
  //variables de la tienda 
  nombrelegal:string;
  ruc:number;
  categoria:string;
  personacontacto:string;
  telefono:number;
  direccion:string;
  //guardarr documento
  //filedoc:File;
  urlvideo:string;
  urlweb:string;
  urlfacebook:string;
  urltwiter:string;

  //objetos para recibir los archivos
  collectionfotos= new Object();
  foto=0;



  // varibles para almacenar datos de la mapa
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom:number;

  address: string;
  private geoCoder;

  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

  

  constructor(private mapsAPILoader: MapsAPILoader,private ngZone: NgZone, private Dom:DomSanitizer,
  private storeService:RegistrotiendaService,private fireService: CategoriaService,
  private readonly regTiendaSvc:RegistrotiendaService ) { }

  ngOnInit() {
    //--video por defecto de la tienda
    this.video=this.Dom.bypassSecurityTrustResourceUrl('/assets/videos/tiendavideo.mp4');

    //---------
    this.obtenercategorias();
   

     //.................... metodo de mapa................
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
  //-----------------------------cargar multiples documentos----------------


  //----------------------------fin cargar multiples documentos----------------


  cargarcategoria(valor:any){
    this.categoria=valor;
    console.log("Este es el valor de categoria",valor)
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

  //............fin metodo mapa........

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



    //----------------------------------------metodo subir logo tiend
    onFotoceroSelected(event: HtmlInputEvent): void {
      if (event.target.files && event.target.files[0]){
        this.file=<File>event.target.files[0];
        //previsualizarimagen
        const reader=new FileReader();
        reader.onload= e => this.fotoceroSelected=reader.result;
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
  
    
  //-----------------------------------------metodo subir foto tiend
  onFotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]){
      this.fileuno=<File>event.target.files[0];
      //previsualizarimagen
      const reader=new FileReader();
      reader.onload= e => this.fotoSelected=reader.result;
      reader.readAsDataURL(this.fileuno);

      //cuando selecciona carga la foto y recupera la url
      const filename = Math.floor(Date.now() / 1000);
      var nameImage='pictures'+filename;
      const pictures= storage().ref(nameImage);
      pictures.put(this.fileuno).then((resp)=>{

            var storage = firebase.storage();
            var storageRef=storage.ref();
            storageRef.child(nameImage).getDownloadURL()
              .then((resp:any)=>{
                  /* console.log("la url foto", resp); */
                  this.urlfileuno=resp;                      
                  
              })
              .catch((err)=>{
                console.log("error al obtener","=>",err);
              })
          
      })


    }


  }
  
  //metodo subir foto uno tiend
  onFotounoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]){
      this.filedos=<File>event.target.files[0];
      //previsualizarimagen
      const reader=new FileReader();
      reader.onload= e => this.fotounoSelected=reader.result;
      reader.readAsDataURL(this.filedos);

      //cuando selecciona carga la foto y recupera la url
      const filename = Math.floor(Date.now() / 1000);
      var nameImage='pictures'+filename;
      const pictures= storage().ref(nameImage);
      pictures.put(this.filedos).then((resp)=>{

            var storage = firebase.storage();
            var storageRef=storage.ref();
            storageRef.child(nameImage).getDownloadURL()
              .then((resp:any)=>{
                  /* console.log("la url foto", resp); */
                  this.urlfiledos=resp;                      
                  
              })
              .catch((err)=>{
                console.log("error al obtener","=>",err);
              })
          
      })




    }
  }
  //983624838
  //932328103

  //----------------------------------------------------metodo subir foto dos tiend
  onFotodosSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]){
      this.filetres=<File>event.target.files[0];
      //previsualizarimagen
      const reader=new FileReader();
      reader.onload= e => this.fotodosSelected=reader.result;
      reader.readAsDataURL(this.filetres);

      //cuando selecciona carga la foto y recupera la url
      const filename = Math.floor(Date.now() / 1000);
      var nameImage='pictures'+filename;
      const pictures= storage().ref(nameImage);
      pictures.put(this.filetres).then((resp)=>{

            var storage = firebase.storage();
            var storageRef=storage.ref();
            storageRef.child(nameImage).getDownloadURL()
              .then((resp:any)=>{
                  /* console.log("la url foto", resp); */
                  this.urlfiletres=resp;                      
                  
              })
              .catch((err)=>{
                console.log("error al obtener","=>",err);
              })
          
      })


    }
  }


  /*//--------------------------obtener documento legales----
  isHovering: boolean;

  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
      console.log("estes son las fotoss ",files)
       //this.cargarfotos(files[i]); 
     
      
      
    }
    
  }

   cargarfotos(file: File){
    const filename=Math.floor(Date.now()/1000);
    var nameImage='archivos'+filename;
    
    const pictures=storage().ref(nameImage);
    pictures.put(file).then((resp)=>{
            var storage=firebase.storage();
            var storageRef=storage.ref();
            storageRef.child(nameImage).getDownloadURL()
            .then((resp)=>{
              this.collectionfotos["foto"+this.foto.toString()]=resp;
              this.foto=this.foto+1;
              
              
            })
    })

    console.log("coleeccion de fotos", this.collectionfotos);


  }  */
  //----------------------------------------subir un documento------------------------------
  onObtenerocumento(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]){
      this.filedoc=<File>event.target.files[0];

      //cuando selecciona carga la foto y recupera la url
      const filename = `documentos/${Math.floor(Date.now() / 1000)}_${this.filedoc.name}`;
      var nameDoc=filename;
      const documento= storage().ref(nameDoc);
      documento.put(this.filedoc).then((resp)=>{

            var storage = firebase.storage();
            var storageRef=storage.ref();
            storageRef.child(nameDoc).getDownloadURL()
              .then((resp:any)=>{
                  console.log("la url documento", resp); 
                  this.urlfiledoc=resp;                      
                  
              })
              .catch((err)=>{
                console.log("error al obtener","=>",err);
              })
          
      })


    }
  }

  //----------------------------------------fin subir documento------------------------------
  
//---registro video de tienda---
  pasarurlvideo(urlvideos:HTMLInputElement){
   
    console.log(urlvideos.value);
    this.renderVideo(urlvideos.value)
    this.urlvideo=urlvideos.value;

  }
//----------previsualizar video------
  renderVideo(video:string){
  //reemplazar whatch?v por embed/ obligatorio  
    if(!video){
      this.video=this.Dom.bypassSecurityTrustResourceUrl(video);
    }
    if(video){
      video = video.replace('watch?v=','embed/');
      }
      //previsualizarvideo
      this.video=this.Dom.bypassSecurityTrustResourceUrl(video);
    }

//-------------------metodo para agregar a bd -----
    agregarTienda(){

    var record={

        nombrelegal:this.nombrelegal,
        ruc:this.ruc,
        categoria:this.categoria,
        personacontacto:this.personacontacto,
        telefono:this.telefono,
        direccion:this.address,
        //filedoc:File;
        foto1:this.urlfile,
        foto2: this.urlfileuno,
        foto3: this.urlfiledos,
        foto4: this.urlfiletres,

        urlvideo:this.urlvideo,
        urlweb:this.urlweb,
        urlfacebook:this.urlfacebook,
        urltwiter:this.urltwiter,
        
        urlfiledoc:this.urlfiledoc,
      };
    
    
    // esta es la funcion para poder enviar  a la base de datos
    this.storeService.createstorage(record).then((resp)=>{

      console.log("datos enviados correctamente a firebase");
  
      })
      .catch((err)=>{
        console.log(err);
      })

    }

//------fin metodo para enviar a bd-------




}
