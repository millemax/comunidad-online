import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper , Txt, Columns, Table, Img} from 'pdfmake-wrapper';
@Component({
  selector: 'app-imprimir-recibo',
  templateUrl: './imprimir-recibo.component.html',
  styleUrls: ['./imprimir-recibo.component.scss']
})


export class ImprimirReciboComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }



  generatePDF(){
    async function generate() {
      const pdf = new PdfMakeWrapper();
      pdf.add(await new Img('https://blog.linio.com.co/wp-content/uploads/2016/10/Logo-co.png').build());
      Img.
      
      pdf.add(
        new Table([
          ['Nombre',''],
          ['Telefono',''],
          ['Dirección',''],
        ]).widths([100,'*']).end
      );


      pdf.create().print();

      
    }
    
    generate();
    
    /*
    const PDF=new PdfMakeWrapper();
    
    PDF.add(
      new Txt('AyniScript').bold().end
      );
    PDF.add(
      new Table([
        ['Nombre',''],
        ['Telefono',''],
        ['Dirección',''],
      ]).widths([100,'*']).end
    );
    PDF.create().print();
    */
  }
  

}
