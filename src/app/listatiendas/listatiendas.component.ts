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
 
  
  //coleccion tiendas
  /* coleccionTiendas = [] */
  ListaTiendas=[];
  /* ListaTipoTiendas1=[]; */
  /* categorias:any[]=[];   */
  collectionCategorias:any[] = [];  

  tipotienda:string;
  categoria:string;

  constructor(private readonly crudTiendas:RegistrotiendaService,private crudCategoria: CategoriaService) { }

  ngOnInit() {
    
    this.recuperarCategoria();
    
    /* this.iterarsobrecollection(); */

  }



//--------------------lista de categorias --------------
  recuperarCategoria(){
     
  
    /* let collectionCategorias:any[]=[]; */

    this.crudCategoria.readcategorys().subscribe((resultados)=>{
      resultados.forEach((datostarea)=>{
        this.collectionCategorias.push(
          datostarea.payload.doc.id,
          
          
        );
      })

      
      this.recuperarTiendas();

      /* for( let i=0; i < this.collectionCategorias.length; i++ ){
         console.log("categorias nuevas",this.collectionCategorias[i]);  
        
        this.categoria=this.collectionCategorias[i];

       // console.log("categoria",this.categoria)  

      }
 */
     /*  for(let cat in this.collectionCategorias){
        categoria=this.collectionCategorias[cat]
      
        console.log("coomom no",cat);
      } */


});    
/*      */ 


}

  

  

// ------------recuperar lista de tiendas de una sola categoria ---------
  


recuperarTiendas(){

  /*  this.recuperarCategoria();
   
*/ 

  let tipotienda:string;

   console.log("prueba de categorias ",this.collectionCategorias)

   for( let i=0; i < this.collectionCategorias.length; i++ ){
    /* console.log("categorias nuevas",this.collectionCategorias[i]);   */
  
    this.categoria=this.collectionCategorias[i];
    console.log("asignado valor ",this.categoria);


  
    tipotienda = this.collectionCategorias[i];
  
   const variabledb="categoria";
   
   console.log("reneeeeeeeeee",tipotienda);

   this.crudTiendas.readstore(variabledb,tipotienda.toLocaleLowerCase()).limit(6).get().then((res)=>{
     res.forEach((datos)=>{
       /* this.ListaTiendas.push(

         datos.data()
       
         ); */ 

     });
     

   })
     .catch((err)=>{
     console.log("no se puede recuperar lista de tiendas");
   })
  }

 /*   //----------------
   this.coleccionTiendas.push(this.ListaTipoTiendas);
   console.log("la collecion todaslistaTiendas",this.coleccionTiendas);
   //---------  */

   console.log("la collecion listaTiendas",this.ListaTiendas);

 }

//-------------fin recuperar lista de tiendas de unsa sola categria-----------  




















}

