import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RegistrosComponent } from './registros/registros.component';
import { HomeComponent } from './home/home.component';


/*firebase*/
import {AngularFirestoreModule} from '@angular/fire/firestore';
//gestionarsubida de imagenes 
import {AngularFireStorageModule,StorageBucket} from '@angular/fire/storage';
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
import { RegistrotiendaComponent } from './registrotienda/registrotienda.component';
import { VerificarusuarioComponent } from './verificarusuario/verificarusuario.component';
import { CodigoverificadoComponent } from './codigoverificado/codigoverificado.component';
import { VerificartiendaComponent } from './verificartienda/verificartienda.component';
import { TiendaverificadoComponent } from './tiendaverificado/tiendaverificado.component';
import { PaneldecontrolComponent } from './paneldecontrol/paneldecontrol.component';

//importamos el sidebar de
import {SidebarModule} from 'ng-sidebar';




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








@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegistrosComponent,
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
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,        
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,        
    SidebarModule.forRoot(),
   
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
    HomeModule
  ],
  providers: [
    {provide: StorageBucket,useValue:'gs://comunidadbd-2053d.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
