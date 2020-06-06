import { Component, OnInit,ViewChild,ElementRef,NgZone, Input} from '@angular/core';


// modulos importados para crear la mapa
import { MapsAPILoader, MouseEvent } from '@agm/core';

//incrustar video de youtube con angular
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Url } from 'url';
import { R3TargetBinder } from '@angular/compiler';

//autocompletado de eneto target
interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-registrotienda',
  templateUrl: './registrotienda.component.html',
  styleUrls: ['./registrotienda.component.scss']
})
export class RegistrotiendaComponent implements OnInit {

  //guardar logo cuando exista un archivo
  file:File;
  logoSelected:string | ArrayBuffer;
  //guardar foto cuando exista un archivo
  fileuno:File;
  fotoSelected:string | ArrayBuffer;
  //guardar fotodos cuando exista un archivo
  filedos:File;
  fotounoSelected:string | ArrayBuffer;
  //guardar fototres cuando exista un archivo
  filetres:File;
  fotodosSelected:string | ArrayBuffer;
  
  //guardar video en registro teinda
  video:any;
  
  
  

  // varibles para almacenar datos de la mapa
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom:number;

  address: string;
  private geoCoder;

  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

  

  constructor(private mapsAPILoader: MapsAPILoader,private ngZone: NgZone, private Dom:DomSanitizer  ) { }

  ngOnInit() {
    //--video por defecto de la tienda
    this.video=this.Dom.bypassSecurityTrustResourceUrl('/assets/videos/tiendavideo.mp4');
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
    //metodo subir logo tiend
    onLogoSelected(event: HtmlInputEvent): void {
      if (event.target.files && event.target.files[0]){
        this.file=<File>event.target.files[0];
        //previsualizarimagen
        const reader=new FileReader();
        reader.onload= e => this.logoSelected=reader.result;
        reader.readAsDataURL(this.file);
      }
    } 
  //metodo subir foto tiend
  onFotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]){
      this.fileuno=<File>event.target.files[0];
      //previsualizarimagen
      const reader=new FileReader();
      reader.onload= e => this.fotoSelected=reader.result;
      reader.readAsDataURL(this.fileuno);
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
    }
  }
  //983624838
  //932328103
  //metodo subir foto dos tiend
  onFotodosSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]){
      this.filetres=<File>event.target.files[0];
      //previsualizarimagen
      const reader=new FileReader();
      reader.onload= e => this.fotodosSelected=reader.result;
      reader.readAsDataURL(this.filetres);
    }
  }
//---registro video de tienda---
  pasarurlvideo(urlvideo:HTMLInputElement){
   
    console.log(urlvideo.value);
    this.renderVideo(urlvideo.value)
  

  }

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

  //---registro fin tieeda video

  









}
