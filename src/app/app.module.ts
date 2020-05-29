import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RegistrosComponent } from './registros/registros.component';
import { HomeComponent } from './home/home.component';

// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);




/*firebase*/
import {AngularFirestoreModule} from '@angular/fire/firestore';
//gestionarsubida de imagenes 
import {AngularFireStorageModule,StorageBucket} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import { environment } from 'src/environments/environment';
import { RegistrotiendaComponent } from './registrotienda/registrotienda.component';
import { MapaComponent } from './mapa/mapa.component';


// importamos para el modulo
import { AgmCoreModule } from '@agm/core';


import { PostComponent } from './posts/post/post.component';
import { AdminModule } from './admin/admin.module';
import { LoginModule } from './auth/login/login.module';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
//modulo de autentificaion 
import {AngularFireAuthModule} from '@angular/fire/auth';
//Formularioreactivo
import {ReactiveFormsModule} from '@angular/forms';
import { HomeModule } from './home/home.module';
import { FooterComponent } from './footer/footer.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ConfirmarDatosComponent } from './confirmar-datos/confirmar-datos.component';
import { ImprimirReciboComponent } from './imprimir-recibo/imprimir-recibo.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegistrosComponent,
    HomeComponent,
    RegistrotiendaComponent,
    HomeComponent,  
    MapaComponent,
    PostComponent,
    AdminComponent,
    LoginComponent,
    FooterComponent,
    CarritoComponent,
    ConfirmarDatosComponent,
    ImprimirReciboComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    MatTooltipModule,
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
    AdminModule,
    LoginModule,
    //Authentificacion
    AngularFireAuthModule,
    //FormularioReactivo
    ReactiveFormsModule,
    HomeModule
  ],
  providers: [
    {provide: StorageBucket,useValue:'gs://comunidadbd-2053d.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
