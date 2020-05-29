import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
//login en modal principal

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

  constructor() { }
  
    
  ngOnInit() {
  }



}
