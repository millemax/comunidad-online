

import { Component, OnInit } from '@angular/core';
//prueba
import {PostService} from './posts/post.service';
import {PostI} from './shared/modals/post.interface';



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

  constructor (private postSvc:PostService){}

  ngOnInit(){
    this.postSvc.getAllPosts().subscribe(res => console.log('POSTS',res)); 
  }

}
