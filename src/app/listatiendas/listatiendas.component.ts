import { Component, OnInit } from '@angular/core';

//importamo el crud para cargar tiendas
import {RegistrotiendaService} from '../servicios/registrotienda/registrotienda.service';

//------categora service--
import {CategoriaService} from '../servicios/categorias/categoria.service'



@Component({
  selector: 'app-listatiendas',
  templateUrl: './listatiendas.component.html',
  styleUrls: ['./listatiendas.component.scss']
})
export class ListatiendasComponent implements OnInit {
 
  //------------contiene un objeto con una categoria y tienda respectiva--------
  colleccionGeneral=[];
  
  collectionCategorias:any[] = [];  

  tipotienda:string;
 
  constructor(private readonly crudTiendas:RegistrotiendaService,private crudCategoria: CategoriaService) { }

  ngOnInit() {
    
    this.recuperarCategoria();
    

  }




recuperarCategoria(){

this.crudCategoria.obtenercategoria().then((resp)=>{
      resp.forEach((datos)=>{
        this.collectionCategorias.push(

            datos.id
        )

      })

})
.then((resp)=>{
  this.recuperarTiendas();

})
.catch((err)=>{
    console.log("No se pudo obtener las categorias ");

})
console.log("coleccitoncategorias",this.collectionCategorias)

}


// ------------fni recuperarcategrias ---------

//------------------recuperar tiendas de acuero a la categoria----------

recuperarTiendas(){
  

  var tamano=this.collectionCategorias.length;
  console.log("tamaño de array",tamano);

  for( let  i=0; i<tamano;i++){
    var tipo=this.collectionCategorias[i];
    
    this.buscartienda(tipo)
    
  }


}

buscartienda(tipo){
  var tienda=[];
  var categoria="categoria"
  this.crudTiendas.readstore(categoria,tipo).get().then((resp)=>{
    resp.forEach((datos)=>{
      tienda.push({
        uid:datos.id,
        data:datos.data()
      }
      )
      
    })
   this.colleccionGeneral.push({
     categoria:tipo,
     tiendas:tienda
   })
    //this["tienda"+i]=tienda; 
      
     console.log("las tiendas ",this.colleccionGeneral) ;
     
    
  })                                                                                                                                                                                                                                                                                                                                                        
  
}


                                                                                                                                                                                                                                                                                                                                                










}

