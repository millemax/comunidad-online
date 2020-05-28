import { Component, OnInit } from '@angular/core';

//importamos jquery

//import * as $ from 'jquery';


@Component({
  selector: 'app-paneldecontrol',
  templateUrl: './paneldecontrol.component.html',
  styleUrls: ['./paneldecontrol.component.scss']
})
export class PaneldecontrolComponent implements OnInit {
  //variable para el estado de sidebar
  private _opened: boolean = false;

  nombre:string="Romel huaraca pocco";

  constructor() { }

  ngOnInit() {
  
  }

  private _toggleSidebar(){
    this._opened = !this._opened;

  }

}
