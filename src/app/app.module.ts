import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RegistrosComponent } from './registros/registros.component';
import { HomeComponent } from './home/home.component';
//import mask
import { NgxMaskModule} from 'ngx-mask';


//esto para que reconosca mi modal ng-template
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//modulo para los mensajes de avisos
import {ToastrModule} from 'ngx-toastr';



// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);





/*firebase*/
import {AngularFirestoreModule} from '@angular/fire/firestore';
//gestionarsubida de imagenes 
import {AngularFireStorageModule,StorageBucket,BUCKET} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';

import { environment } from 'src/environments/environment';

import { MapaComponent } from './mapa/mapa.component';


// importamos para el modulo
import { AgmCoreModule } from '@agm/core';

import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
//modulo de autentificaion 
import {AngularFireAuthModule} from '@angular/fire/auth'; 
//Formularioreactivo
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HomeModule } from './home/home.module';

import { VerificarusuarioComponent } from './verificarusuario/verificarusuario.component';
import { CodigoverificadoComponent } from './codigoverificado/codigoverificado.component';
import { VerificartiendaComponent } from './verificartienda/verificartienda.component';
import { TiendaverificadoComponent } from './tiendaverificado/tiendaverificado.component';
import { PaneldecontrolComponent } from './paneldecontrol/paneldecontrol.component';

//importamos el sidebar de
import {SidebarModule} from 'ng-sidebar';
//tiendas
import { RegistrotiendaComponent } from './registrotienda/registrotienda.component';
import { ListatiendasComponent } from './listatiendas/listatiendas.component';

//componentes dentro del panel de administracion
import { MisordenesComponent } from './misordenes/misordenes.component';
import { MislistasComponent } from './mislistas/mislistas.component';
import { MitiendaComponent } from './mitienda/mitienda.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { MiplanComponent } from './miplan/miplan.component';
import { PaneladministracionComponent } from './paneladministracion/paneladministracion.component'


//modulo para detectar dispositivos
import { DeviceDetectorModule } from 'ngx-device-detector';


//importamos para el tag input 

import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

import {MatFormFieldModule} from '@angular/material/form-field';


//estoy importando el tag las estrellitas
import { RatingModule } from 'ng-starrating';





import { FooterComponent } from './footer/footer.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ConfirmarDatosComponent } from './confirmar-datos/confirmar-datos.component';
import { ImprimirReciboComponent } from './imprimir-recibo/imprimir-recibo.component';
import { DetalleproductComponent } from './detalleproduct/detalleproduct.component';



//el carrousel
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { DetallesCategoriaComponent } from './detalles-categoria/detalles-categoria.component';


//esto para el select option
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegistrosComponent,
    HomeComponent,
    RegistrotiendaComponent,
    HomeComponent,  
    MapaComponent,   
    
    LoginComponent,
    RegistrotiendaComponent,
    VerificarusuarioComponent,
    CodigoverificadoComponent,
    VerificartiendaComponent,
    TiendaverificadoComponent,
    PaneldecontrolComponent,
    MisordenesComponent,
    MislistasComponent,
    MitiendaComponent,
    ConfiguracionComponent,
    MiplanComponent,
    PaneladministracionComponent,
    
    
    FooterComponent,
    CarritoComponent,
    ConfirmarDatosComponent,
    ImprimirReciboComponent,
    DetalleproductComponent,
    DetallesCategoriaComponent,
    ListatiendasComponent,
   
    
    
  ],
  imports: [
    NgxMaskModule.forRoot(),

    BrowserModule,
    RatingModule,
    AppRoutingModule,        
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatTooltipModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,  
    MatSelectModule,      
    SidebarModule.forRoot(),

    //para el carrousel
    BrowserAnimationsModule,
    CarouselModule,

    //para el modal ng-template
    NgbModule,
   
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBQ2wl-PEYo_y3vpjO6E0ZzQOrKB6leYJI',
      libraries: ['places']
    }),
    //importamos google Maps
    

    //firebasebase parametro de conexion
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    LoginModule,
    
    //Authentificacion
    AngularFireAuthModule,
    //FormularioReactivo
    ReactiveFormsModule,
    FormsModule,
    DeviceDetectorModule.forRoot(),
    HomeModule,
    
  ],
  providers: [
    {provide: StorageBucket,useValue:'gs://comunidadbd-2053d.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
