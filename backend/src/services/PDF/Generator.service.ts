import PDFDocument from "pdfkit";
import "pdfkit-table";
import { Readable } from "stream";

   // header: {
    //   serie: string,
    //   numero: string,
    //   fechaEmision: string
    // },
    // userData: { 
    //   ruc: string, name: string, direccion:string,
    // },
    // items: Array<{
    //   descripcion: string,
    //   cantidad: number,
    //   precioUnitario: number,
    // }>,
    // totals: {
    //   subTotal: number,
    //   igv: number,
    //   total: number,
    // }

export class PDFGeneratorService {

  createFactura( ruc: string, name: string, direccion:string, facturaNumber: number, ): Readable {

    // 1. Crea el documento
    const doc = new PDFDocument({
      size: "A4",
      margin: 50
    }) ;

    // 2. Escribir el contenido
    doc.fontSize(20).text(`Factura de ${name}`, {
      align: "center"
    });

    doc.moveDown();
    doc.fontSize(12).text("Gracias por su compra.");

    // 3. Cerrar documento
    doc.end();

    // 4. Devolver el PDF como flujo
    return (  doc as unknown) as Readable;
  };

  createGuia( name: string ): Readable {
    // 1. Crea el documento
    const doc = new PDFDocument({
      size: "A4",
      margin: 50
    }) ;

    // 2. Escribir el contenido
    doc.fontSize(20).text(`guia de ${name}`, {
      align: "center"
    });

    doc.moveDown();
    doc.fontSize(12).text("Gracias por su compra.");

    // 3. Cerrar documento
    doc.end();

    // 4. Devolver el PDF como flujo
    return (  doc as unknown) as Readable;
  }
}
