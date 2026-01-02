import  type { Request, Response } from "express";
import { PDFStorageService } from "../../services/PDF/Storage.service";
import { PDFGeneratorService } from "../../services/PDF/Generator.service";
import {Readable} from "stream";

export class PDFController {
    
    constructor (
        private pdfStorage = new PDFStorageService(),
        private pdfGenerator = new PDFGeneratorService()
    ){} 

    emitFactura = async (req: Request, res: Response) => {
        
        //extraemos id de order generada en el controller anterior
        const orderId = res.locals.orderId;
        if (!orderId) {
            return  res.status(400).json({ message: "Order ID not found in request context" });
        }
        console.log("Order ID:", orderId);
        // aumentar el contador de guias y obtener el nuevo valor
        const newValue :number = await this.pdfStorage.increaseCount("Factura");
        console.log("valo actual es :", newValue);
        // generar el PDF de la factura
        const pdf : Readable = this.pdfGenerator.createFactura(
            "20123456789",
            "Empresa S.A.C.",
            "Av. Siempre Viva 123",
            newValue,
        );

        try {
            // subir el PDF a Google Drive
            const { fileID } = await this.pdfStorage.sabeDocument(
                pdf,
                `FACTURA-${newValue}`,
                "factura"
            );
            console.log("File ID de la factura subida:", fileID);
            // guadar el ID del archivo en Firestore
            await this.pdfStorage.SabeId(fileID, orderId, "factura");
            // responder al cliente con el ID del archivo
            console.log(`id de achivo subido es ${fileID}`);
            
            res.status(200).json({ fileID });
        } catch (error) {
            console.error("Error al emitir la factura:", (error as Error).message);
            res.status(500).json({ message: "Error al emitir la factura" });
        }   
    };

    emitGuia = async (req: Request, res: Response) => {
        
        //extraemos id de order generada en el controller anterior
        const orderId = res.locals.orderId;
        if (!orderId) {
            return  res.status(400).json({ message: "Order ID not found in request context" });
        }
        console.log("Order ID:", orderId);
        // aumentar el contador de guias y obtener el nuevo valor
        const newValue :number = await this.pdfStorage.increaseCount("Guia");
        console.log("valo actual es :", newValue);
        // generar el PDF de la guia
        const pdf : Readable = this.pdfGenerator.createGuia(
            "Empresa S.A.C.",
        );

        try {
            // subir el PDF a Google Drive
            const { fileID } = await this.pdfStorage.sabeDocument(
                pdf,
                `FACTURA-${newValue}`,
                "factura"
            );
            console.log("File ID de la factura subida:", fileID);
            // guadar el ID del archivo en Firestore
            await this.pdfStorage.SabeId(fileID, orderId, "guia");
            // responder al cliente con el ID del archivo
            console.log(`id de achivo subido es ${fileID}`);
            
            res.status(200).json({ fileID });
        } catch (error) {
            console.error("Error al emitir la factura:", (error as Error).message);
            res.status(500).json({ message: "Error al emitir la factura" });
        }   
    };
}

const pdfController = new PDFController();
export default pdfController;