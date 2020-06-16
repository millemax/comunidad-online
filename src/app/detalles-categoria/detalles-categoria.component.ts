import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalles-categoria',
  templateUrl: './detalles-categoria.component.html',
  styleUrls: ['./detalles-categoria.component.scss']
})
export class DetallesCategoriaComponent implements OnInit {
  private _opened: boolean = true;
    


  constructor() { }

  ngOnInit() {
 
  }
  private _toggleSidebar() {
    this._opened = !this._opened;
  }

}
