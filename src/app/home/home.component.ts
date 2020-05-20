import { Component, OnInit } from '@angular/core';

//servicefirebase
import {PostService} from '../posts/post.service';
import {PostI} from '../shared/models/post.interface';
import { Observable } from 'rxjs';
import { PassThrough } from 'stream';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public posts$: Observable<PostI[]>
  constructor (private postSvc:PostService){}
 

  ngOnInit(){
     //obtener data en pantalla de la base de datos
    this.posts$ = this.postSvc.getAllPosts();
  }
 

    
}
