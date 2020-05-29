import { Component, OnInit } from '@angular/core';
//login en modal principal
import {AuthService} from '../shared/services/auth.service';
import {UserI} from '../shared/models/user.interface';


//servicefirebase
import {PostService} from '../posts/post.service';
import {PostI} from '../shared/models/post.interface';
import { Observable } from 'rxjs';
import { PassThrough } from 'stream';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';
//formularioreactivo
import {FormGroup, FormControl, Validators} from '@angular/forms';
//modulode routing
import {Router} from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public posts$: Observable<PostI[]>;
  constructor (private postSvc:PostService, private authSvc:AuthService, private route:Router){}
  //definir seccion de formulario
  loginForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  })

  ngOnInit(){
     //obtener data en pantalla de la base de datos
    this.posts$ = this.postSvc.getAllPosts();
  }
 
  onLogin(form:UserI){
    this.authSvc
    .loginByEmail(form)
    .then(res =>{
      console.log('Succesfully',res);
      this.route.navigate(['registros']);
    })
    .catch(err =>console.log('Error',err));
  }
    
}
