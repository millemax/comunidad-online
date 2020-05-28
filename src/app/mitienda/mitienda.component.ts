//import { Component, OnInit } from '@angular/core';

//importamos los modulos para los chips de angular
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component,OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Fruit {
  name: string;
}

//esto es para cargar la foto
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-mitienda',
  templateUrl: './mitienda.component.html',
  styleUrls: ['./mitienda.component.scss']
})
export class MitiendaComponent implements OnInit {
  //variables para las imagenes
  file: File;
  photoSelected: string | ArrayBuffer;



  //variables de la categoria
  categoria=["Calzado","Vestimenta", "Bebes", "Pasteleria", "Libros", "Alimentos","Flores y chocolateria","Plasticos", "Electronicos",
"juguetes","Florerias", "Ferreteria", "Deportivos","Productos de limpieza Aseo","Productos de madera","Oficina","Cuero","Hogar"];



  constructor() { }


  ngOnInit() {

  }

  //recibimos la foto cargada
  onPhotoSelected(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
         this.file=<File>event.target.files[0];
         
         //image preview
        const reader= new FileReader();
        reader.onload = e => this.photoSelected = reader.result;
        reader.readAsDataURL(this.file);


    }
  
  }
 

//........... esto es para el tag...............
        visible = true;
        selectable = true;
        removable = true;
        addOnBlur = true;
        readonly separatorKeysCodes: number[] = [ENTER, COMMA];
        fruits: Fruit[] = [
          {name: 'negro'},
          {name: 'verde'}
          
        ];

        add(event: MatChipInputEvent): void {
          const input = event.input;
          const value = event.value;

          // Add our fruit
          if ((value || '').trim()) {
            this.fruits.push({name: value.trim()});
          }

          // Reset the input value
          if (input) {
            input.value = '';
          }
        }

        remove(fruit: Fruit): void {
          const index = this.fruits.indexOf(fruit);

          if (index >= 0) {
            this.fruits.splice(index, 1);
          }
        }
  //..............fin de los tags....................
  
}
