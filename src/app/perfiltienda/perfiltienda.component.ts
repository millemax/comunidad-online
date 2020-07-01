import { Component, OnInit } from '@angular/core';
import {RegistrotiendaService} from '../servicios/registrotienda/registrotienda.service';
 
@Component({
  selector: 'app-perfiltienda',
  templateUrl: './perfiltienda.component.html',
  styleUrls: ['./perfiltienda.component.scss']
})
export class PerfiltiendaComponent implements OnInit {

  constructor(private tiendaservice:RegistrotiendaService) { }

  ngOnInit() {
    this.recuperartienda();
  }

  recuperartienda(){
    this.tiendaservice.readtiendaid("1592342480506").get().then((resp)=>{
      console.log("la tienda", resp.data());
    })
  }

}
