import type { Customer, OrderItem, Payment } from "../../models/PDF/document.model";
import PDFDocument from "pdfkit";
import "pdfkit-table";
import { Readable } from "stream";

export class PDFGeneratorService {

  createFactura(
    facturaNumber: string,
    dataUser: Customer,
    dataOrder: OrderItem[],
    payment: Payment
  ): Readable {
        // Tamaño del documento A4: 595 * 841
        // Mantenemos el margen 10 como pediste
        const doc = new PDFDocument({ size: 'A4', margin: 10 });

        // --- HEADER ---
        doc.font('Helvetica-Bold').fontSize(13)
        .text('NOMBRE COMPLETO DE LA EMPRESA', 0, 30, { width: 595, align: 'center' });

        doc.font('Helvetica').fontSize(11)
        .text('DIRECCION COMPLETA DE LA EMPRESA', { width: 595, align: 'center' });

        doc.moveDown(0.5);
        doc.fontSize(10)
        .text('telefono: 987987987\nE-mail: test@ejemplo.com\nSucursal: Principal', 
        { width: 595, align: 'center', lineGap: 5 });

        // Zona de cuadro para logo
        doc.rect(20, 10, 100, 100)
        .lineWidth(1)
        .strokeColor('green')
        .stroke();

        // Zona de cuadro para texto de factura
        doc.rect(440, 10, 150, 100)
        .lineWidth(1)
        .strokeColor('green')
        .stroke();

        doc.fillColor('black').fontSize(14)
        .text('RUC: 3216549871', 440, 30, { width: 150, align: 'center' });
        
        doc.font('Helvetica-Bold').fontSize(14)
        .text('FACTURA ELECTRONICA', 440, 50, { width: 150, align: 'center' });
        
        doc.font('Helvetica').fontSize(14)
        .text('FFA9-6543', 440, 86, { width: 150, align: 'center' });

        // Separador azul
        doc.moveTo(0, 120).lineTo(595, 120)
        .lineWidth(1)
        .strokeColor('blue')
        .stroke();

        // --- DESCRIPCION DE USUARIO ---
        doc.fillColor('black').fontSize(12)
        .text('Señores: \nDireccion: \nRuc: \nMedio de Pago:', 20, 130, { width: 595, lineGap: 5 });

        doc.text('nombre de empresa \nDIREECCION DE EMPRESA COMPLETA UNIDA \n20654654525 \nContado', 130, 130, { width: 595, lineGap: 5 });

        doc.fontSize(12).text('Fecha Emision: ', 250, 187);
        doc.text('15/6465-452: ', 335, 187);
        doc.text('Moneda: ', 460, 187);
        doc.text('PEN', 510, 187);
        
        doc.moveTo(0, 205).lineTo(595, 205)
        .lineWidth(1).strokeColor('blue').stroke();
        
        // --- CABECERA DE TABLA ---
        // Corregido: Separamos fillColor de la acción de dibujar
        doc.rect(0, 210, 595, 20)
        .lineWidth(1)
        .fillColor('green')
        .fillAndStroke();
        
        // Resetear a negro para el texto de la tabla
        doc.fillColor('black').fontSize(11);
        const tableY = 215;
        doc.text('#', 0, tableY, { width: 30, align: 'center' })
        .text('Cant.', 30, tableY, { width: 40, align: 'center' })
        .text('Codigo', 70, tableY, { width: 70, align: 'center' })
        .text('Und', 140, tableY, { width: 50, align: 'center' })
        .text('Descripcion', 190, tableY, { width: 210, align: 'center' })
        .text('Precio', 400, tableY, { width: 60, align: 'center' })
        .text('Dscto', 460, tableY, { width: 50, align: 'center' })
        .text('Valor Venta', 510, tableY, { width: 80, align: 'center' });

        // --- SECCIÓN DE TOTALES ---
        doc.moveTo(0, 720).lineTo(595, 720).strokeColor('blue').stroke();
        doc.moveTo(300, 745).lineTo(595, 745).stroke();
        doc.moveTo(480, 762).lineTo(595, 762).stroke();
        doc.moveTo(480, 782).lineTo(595, 782).stroke();

        doc.fillColor('black').fontSize(11)
        .text('Total Venta Exonerada \nTotal IGV \nImporte Total de la Venta', 340, 730, { width: 595, lineGap: 5 });

        doc.text('S/. \nS/. \nS/.', 480, 730, { width: 595, lineGap: 5 });

        // Corregido: Alineación derecha usando un width seguro
        doc.text('123456.00 \n100.00 \n123456789', 0, 730, { width: 585, align: 'right', lineGap: 5 });
        
        // --- FOOTER ---
        doc.rect(0, 810, 300, 20)
        .fillColor('green')
        .fillAndStroke();

        doc.fillColor('black').fontSize(11)
        .text('SON: MONTO INGRESADO EN TEXTO', 10, 795, { width: 300 });
        
        doc.text('Detalle de Forma de Pago: Contado', 0, 815, { width: 300, align: 'center' });

        doc.end();
    return doc as unknown as Readable;
  }
 // Generador de GUIA de Remicion
    createGuia(name: string): Readable {
        const doc = new PDFDocument({
            size: "A4",
            margin: 50,
        });

        let y = 50;

        // ─────────────────────────────
        // HEADER
        // ─────────────────────────────

        // Logo (placeholder)
        doc.rect(50, y, 150, 50).stroke();
        doc.fontSize(10).text("LOGO", 50, y + 18, {
            width: 150,
            align: "center",
        });

        // Título
        doc.font("Helvetica-Bold").fontSize(16)
            .text("GUÍA DE REMISIÓN – REMITENTE", 0, y, {
            align: "center",
            });

        // Cuadro RUC / Serie
        doc.rect(350, y, 180, 70).stroke();
        doc.fontSize(10).text("RUC: 20123456789", 350, y + 10, {
            width: 180,
            align: "center",
        });
        doc.fontSize(12).text("T001-000001", 350, y + 30, {
            width: 180,
            align: "center",
        });

        y += 90;

        // ─────────────────────────────
        // DATOS DEL TRASLADO
        // ─────────────────────────────
        doc.font("Helvetica-Bold").fontSize(11)
            .text("DATOS DEL TRASLADO", 50, y);

        y += 15;

        doc.font("Helvetica").fontSize(10)
            .text("Punto de partida: Almacén Central", 50, y)
            .text("Punto de llegada: Cliente Final", 50, y + 15)
            .text("Motivo del traslado: Venta", 50, y + 30)
            .text("Fecha de traslado: 28/12/2025", 350, y);

        y += 55;
        doc.moveTo(50, y).lineTo(545, y).stroke();
        y += 15;

        // ─────────────────────────────
        // DATOS DEL DESTINATARIO
        // ─────────────────────────────
        doc.font("Helvetica-Bold").text("DATOS DEL DESTINATARIO", 50, y);
        y += 15;

        doc.font("Helvetica")
            .text(`Nombre: ${name}`, 50, y)
            .text("DNI / RUC: 74589632", 50, y + 15)
            .text("Dirección: Jr. Los Olivos 123", 50, y + 30);

        y += 55;
        doc.moveTo(50, y).lineTo(545, y).stroke();
        y += 15;

        // ─────────────────────────────
        // DATOS DEL TRANSPORTISTA
        // ─────────────────────────────
        doc.font("Helvetica-Bold").text("DATOS DEL TRANSPORTISTA", 50, y);
        y += 15;

        doc.font("Helvetica")
            .text("Empresa: Transportes Perú SAC", 50, y)
            .text("RUC: 20547896321", 50, y + 15)
            .text("Placa del vehículo: ABC-123", 350, y)
            .text("Conductor: Juan Torres", 350, y + 15);

        y += 50;
        doc.moveTo(50, y).lineTo(545, y).stroke();
        y += 15;

        // ─────────────────────────────
        // DETALLE DE BIENES
        // ─────────────────────────────
        doc.font("Helvetica-Bold").text("DETALLE DE BIENES", 50, y);
        y += 15;

        doc.fontSize(10).text("Descripción", 50, y);
        doc.text("Unidad", 300, y);
        doc.text("Cantidad", 400, y);

        y += 10;
        doc.moveTo(50, y).lineTo(545, y).stroke();
        y += 10;

        doc.font("Helvetica")
            .text("Producto de prueba", 50, y)
            .text("UND", 300, y)
            .text("5", 400, y);

        y += 40;

        // ─────────────────────────────
        // FOOTER
        // ─────────────────────────────
        doc.fontSize(9)
            .text(
            "Documento generado electrónicamente conforme a SUNAT",
            50,
            760,
            { width: 495, align: "center" }
            );

        // Cerrar
        doc.end();

        return doc as unknown as Readable;
    }
}