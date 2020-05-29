import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
//login en modal principal
import {LoginService} from '../servicios/login.service';
import {UserI} from '../models/user.interface';
//formularioreactivo
import {FormGroup, FormControl, Validators} from '@angular/forms';
//modulode routing
import {Router} from '@angular/router';
//


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('closeModal',{static:false}) private closeModal: ElementRef;

  constructor(private authSvc:LoginService, private route:Router) { }
    //definir seccion de formulario
    loginForm = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    })
    
  ngOnInit() {
  }

  onLogin(form:UserI){
    this.authSvc
    .loginByEmail(form)
    .then(res =>{
      console.log('Succesfully',res);
      this.route.navigate(['/']);
    })
    .catch(err =>console.log('Error',err));
  }
//funcion para cerrar modal despues de logearse
    public hideModel() {
      this.closeModal.nativeElement.click();      
  }

}
