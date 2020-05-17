import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Modalg1Component } from './modalg1/modalg1.component';

/*firebase*/
import {AngularFirestoreModule} from '@angular/fire/firestore';
//gestionarsubida de imagenes 
import {AngularFireStorageModule,StorageBucket} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    Modalg1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //firebasebase parametro de conexion
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    
  ],
  providers: [
    {provide: StorageBucket,useValue:'gs://comunidadbd-2053d.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
