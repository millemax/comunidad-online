import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper , Txt, Columns, Table, Img, SVG, Cell, Stack} from 'pdfmake-wrapper';
@Component({
  selector: 'app-imprimir-recibo',
  templateUrl: './imprimir-recibo.component.html',
  styleUrls: ['./imprimir-recibo.component.scss']
})


export class ImprimirReciboComponent implements OnInit {
  constructor() {

  }

  ngOnInit() {

  }

  generatePDF(){
    // Declarando variables
      var nombre='romel miller  huaraca pocco';
      var telefono='987654321 ';
      var direccion='Av. los pinos 567';

      var subtotal='$12:00';
      var iva='$158.00';
      var total='$200.00';
      var entrega='$12.00';
      var finalpagar='$78.00';

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
            'Column 1',
            'Column 1',
            'Column 1',
            'Column 1',
            'Column 1',
            'Column 1',
          ],
          [
            'Column 2',
            'Column 2',
            'Column 2'
          ],
          [
            'Column 3',
            'Column 3',
            'Column 3'
          ],
          [
            'Column 4',
            'Column 4',
            'Column 4 '
          ]
        ]
        ]).widths([100,180,100,100]).end 
      );
      

      pdf.add(
        new Table([
          ['Subtotal:',subtotal],
          ['IVA 12%:',iva],
          ['Total:',total],
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
  
  

}
