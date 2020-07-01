

import { Component, OnInit } from '@angular/core';
import {LoginService} from './servicios/login.service';

//modulo de la autetnticacion
import { AngularFireAuth } from '@angular/fire/auth';










@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'comunidad-online';//original
  
  

  constructor (private loginservice: LoginService,private afAuth:AngularFireAuth){}

  ngOnInit(){

    

     this.presenciadeuser();



    
  }
  
 async  presenciadeuser(){


  var user= await this.loginservice.userexists();
  if (user) {
    console.log("usuario existe en la principal", user);
    
  } else {
    console.log("no existe ningun usuario en la principal, se asignara un usuario anonimo");
    this.autenticacionanonima();
    
  }




       
    


  }








  async autenticacionanonima(){
    await this.loginservice.anonimuslogin(); 
   
  
  }

  

}
