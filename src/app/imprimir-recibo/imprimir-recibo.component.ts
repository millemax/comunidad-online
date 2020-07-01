import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper , Txt, Columns, Table, Img, SVG, Cell, Stack} from 'pdfmake-wrapper';

//modulo obtener el id del usuario
import {LoginService} from '../servicios/login.service';

//modulo para ver sus compras 
import {ComprasService} from '../servicios/compras/compras.service';





@Component({
  selector: 'app-imprimir-recibo',
  templateUrl: './imprimir-recibo.component.html',
  styleUrls: ['./imprimir-recibo.component.scss']
})


export class ImprimirReciboComponent implements OnInit {
  
  //coleccion de sus compras
  coleccioncompras=[];

  //los prodcutos que estan dentro de las ventas
  productos=[];

  //impuestos
  impuestos=25.50;

  //servicio de entrega
  serviciodeentrega=30;

  //total a pagar
  total:number;
  
  //el total de productos en la tabla
  subtotal:number;

  //datos del comprador
  nombre:string;
  telefono:string;
  direccion:string;


  constructor(private loginservice: LoginService, private comprasservice: ComprasService) {

  }

  ngOnInit() {
    this.obtenerid();

  }
  
 
  async obtenerid(){
    var iduser=await this.loginservice.readiduser();
    console.log("id de usuario", iduser);
    this.obtenersuscompras(iduser);
  }

  obtenersuscompras(iduser){
    this.comprasservice.readcompra("iduser",iduser).get().then((resp)=>{
      resp.forEach((datos)=>{
        this.coleccioncompras.push({
          iud: datos.id,
          data: datos.data()
        })

      })        

    })
    .then((resp)=>{
      this.recuperarproductos(this.coleccioncompras);
      console.log("la coleccion compras", this.coleccioncompras);
    })
    .catch((err)=>{


    })
       
    

    

    
    


  }

  generatePDF(){
    // Declarando variables
      var nombre=this.nombre;
      var telefono=this.telefono;
      var direccion=this.direccion;

      var subtotal=this.subtotal;
      var iva=this.impuestos;      
      var entrega=this.serviciodeentrega;
      var finalpagar=this.total;

    // obtenemos la fecha
      var hoy= new Date();
       var fecha= hoy.getDate()+'/'+(hoy.getMonth()+1)+'/'+hoy.getFullYear();
       var  hora=hoy.getHours()+':'+hoy.getMinutes()+':'+hoy.getSeconds();

    //fin de obtener fecha

    async function generate() {

      const pdf = new PdfMakeWrapper();
      pdf.defaultStyle({
        fontSize: 16
      });

      pdf.add(await new Img('/assets/images/logotipo.png').width(200).alignment("left").build());
      pdf.add(pdf.ln(2));
      pdf.add(
        new Table([
          ['Nombre',nombre],
          ['Telefono',telefono],
          ['Dirección',direccion]
        ]).widths([100,'*']).bold().end
      );
      pdf.add(pdf.ln(1));

      pdf.add(
        new Table([
          [ 'Cantidad', 'Item','Valor unidad','Valor final']
          ]).widths([100,180,100,100]).alignment("center").bold().end
      );
      pdf.add(        
        new Table([
        [
          [

            'Column 1',
            
 
          ],
          [
            'Column 2',
            
          ],
          [
            'Column 3',
          
          ],
          [
            'Column 4',
            
          ]
        ]
        ]).widths([100,180,100,100]).end 
      );
      

      pdf.add(
        new Table([
          ['Subtotal:',subtotal],
          ['IVA 12%:',iva],          
          ['Servicio de entrega:',entrega],
          ['Final a pagar:',finalpagar],
        ]).widths([100,100]).relativePosition(298,0).bold().fontSize(16).end
      );

      pdf.add(
        new Table([
          ['Fecha: '+fecha+' '+ hora],
        ]).widths(['*']).absolutePosition(0,770).alignment("center").layout("noBorders").bold().end
      );
      /*

      pdf.footer('fecha: '+fecha+' '+hora);
      */
      pdf.create().print();
    }
    
    
    generate();
    

  }

  recuperarproductos(compras){
    console.log("lista compras",compras[0]["data"]["productos"]);

    //la lista de los productos comprados
    this.productos=compras[0]["data"]["productos"];

    this.nombre=compras[0]["data"]["nombre"];
    this.telefono=compras[0]["data"]["telefono"];
    this.direccion=compras[0]["data"]["direccion"];


     //Calculamos el TOTAL 
     this.subtotal = this.productos.reduce((
      acc,
      obj,
    ) => acc + (obj.data.precio * obj.data.cantidadpedida),
    0);
    

    this.total=this.subtotal+this.impuestos+this.serviciodeentrega;

  }
  
  
  

}
