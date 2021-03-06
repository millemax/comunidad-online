import { Component, OnInit} from '@angular/core';
import {CategoriaService} from '../servicios/categorias/categoria.service';
import { StarRatingComponent } from 'ng-starrating';
import {ProductoService} from '../servicios/productos/producto.service';

//el carrousel
import { OwlOptions } from 'ngx-owl-carousel-o';

//importamos el servicio de autenticacion 
import {LoginService} from '../servicios/login.service'


//modulo  para las alertas
import { ToastrService } from 'ngx-toastr';

//importamo el crud para cargar tiendas
import {RegistrotiendaService} from '../servicios/registrotienda/registrotienda.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent implements OnInit {

  //prueba
  categoriii:string;
  //para el carrousel
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  //esta es la colección categoria
  collectionCategorias=[]; 

  //collecion de los productos oferta
  collectionOferta=[];
  collectionOfertainverso=[];

  //collection productos
  collectionNormal=[];
  collectionNormalinverso=[];

  //collection productos Populares
  collectionPopulate=[];

  //collection tiendas cercanas
  collectionTiendascercanas=[];

  constructor (private crudCategoria: CategoriaService, private crudProductos: ProductoService, 
    private loginservice: LoginService, private toastr: ToastrService, private CrudTiendas: RegistrotiendaService){

  }
 

  ngOnInit(){
    this.recuperarCategoria();
    this.recuperarProductosoferta();
    this.recuperarProductos();
    this.productospopulares();
    this.recuperarTiendas();
   

  } 


 

  recuperarProductosoferta(){
    var variabledb="tipoventa";
    var tipoproducto="oferta";
    this.crudProductos.readproduct(variabledb,tipoproducto).limit(5).get().then((res)=>{      
      res.forEach((datos)=>{
            // console.log(doc.id, " => ", doc.data());
            this.collectionOferta.push({
              iud: datos.id,
              data:datos.data()
            }
               
            );
         });
        
    
      
      

    })
    .catch((err)=>{
      console.log("no se puedo recuperar de la base de datos", err);

    })
    

  }

  recuperarProductos(){
    var variabledb="tipoventa";
    var tipoproducto="normal";
    this.crudProductos.readproduct(variabledb,tipoproducto).limit(5).get().then((res)=>{
      res.forEach((datos)=>{
        this.collectionNormal.push({
          iud: datos.id,
          data:datos.data()
        }
          
        );

      });
      

    })
    .catch((err)=>{
      console.log("no se puede recuperar productos normales");
    })

    console.log("la collecion normal",this.collectionNormal);

    


  }

  //recuperar los productos populares
  productospopulares(){
    console.log("obteniendo productos populares");
    this.crudProductos.readproductpopulate().then((doc)=>{
      doc.forEach((datos)=>{
        
        this.collectionPopulate.push({
          iud: datos.id,
          data:datos.data()          
        }
          
        );

      })
      

    })
    .catch((err)=>{
      console.log("no se pudo obtener el documento",err);

    })

  }
  

  recuperarCategoria(){
    this.crudCategoria.readcategorys().subscribe((resultados)=>{
      resultados.forEach((datostarea)=>{
        this.collectionCategorias.push({
          iud:datostarea.payload.doc.id,
          data:datostarea.payload.doc.data(),
        }
          
        );
      })
    });
    console.log("categorias hola : ",this.collectionCategorias);

  } 





  //esto recibe los puntajes de la estrella
onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);

  }



  // mostrar detalles de producto seleccionado ofertas
  detallesProductos(valor:string){

    console.log("hola soy el producto mi id", valor);
    

  }


  //probar la funcion para las notificaciones
  toastrshow(){
    this.toastr.info('hola mundo','Exito!',{
      timeOut:1000,
      progressBar:false,
    });

  }
  
  //recuperar tiendas
  recuperarTiendas(){
    this.CrudTiendas.readtienda().get().then((resp)=>{
      resp.forEach((datos)=>{
        this.collectionTiendascercanas.push({
          iud: datos.id,
          data:datos.data()
        });

      });

      
    })
    .catch((err)=>{
      console.log("no se puede recuperar las tiendas");
    })
    console.log("la tienda",this.collectionTiendascercanas)

  }
  






  
  


}
