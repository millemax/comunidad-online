

import { Component, OnInit } from '@angular/core';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'comunidad-online';//original
  
  public posts:{
    id:string;
    titlePost:string;
    contentPost:string;
  }

  constructor (){}

  ngOnInit(){
    
  }

}
