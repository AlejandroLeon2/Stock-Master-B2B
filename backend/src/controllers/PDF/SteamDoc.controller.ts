import type { Request, Response } from "express";
import { PDFStorageService } from "../../services/PDF/Storage.service";
import {pipeline} from "stream/promises"

//import para test

import { PDFGeneratorService } from "../../services/PDF/Generator.service";
import { Readable } from "stream";
import { log } from "console";
export class SteamDocController {
    
    constructor (
        private pdf = new PDFStorageService()
    )
    {}

    //obtenermos la url del usuario
    streamPdf = async (req: Request, res: Response) => {
        try {
            // obtenemos el uid del usuario autenticado
            const userId = req.user?.uid || "";
            // obtenemos la url del pdf desde firestore
            const url = await this.pdf.getUrl(userId);
            // configuramos los headers para enviar el pdf
            res.setHeader("content-type", "application/pdf");
            res.setHeader("content-Disposition", "inline; filename=document.pdf");
            // conectamos el stream de drive al cliente
            const pdfStream = await this.pdf.steamToClient(url);

            // enviamos el stream al cliente
            await pipeline(
                pdfStream,
                res as any
            );
        } catch (error) {
            if(!res.headersSent) {
                console.error("Error getUrl");
                res.status(500).json({ message: (error as Error).message });
            } else {
                console.error("Error en stream", (error as Error));
                res.end();
            }                
        }
    };

    testSabeToDrive = async (req: Request, res: Response) => {
        try { const pdfGeneratorService = new PDFGeneratorService();
            const pdfStream = pdfGeneratorService.createFacturaPDF({ name: "Test" });
            const { fileID } = await this.pdf.pdfSabeDrive(pdfStream, "test.pdf");
            log( "FileID:", fileID );
            res.status(200).json({ fileID });
        }
        catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }       
    };


    streamPdfDirect = async (req: Request, res: Response) => {
        try {
            const pdfGeneratorService = new PDFGeneratorService();

            // 1. Acción: Creamos el stream del PDF.
            // Por qué: PDFKit (que es lo que suele usar tu servicio) genera un 
            // Readable Stream. No necesitamos que este stream se escriba en ningún lado.
            const pdfStream = pdfGeneratorService.createFacturaPDF({ name: "Prueba Directa" });

            // 2. Acción: Configurar cabeceras.
            // Por qué: Para que el navegador no intente descargar un archivo 
            // binario genérico, sino que sepa que es un PDF y lo abra.
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "inline; filename=test.pdf");

            // 3. Acción: Usar pipeline para conectar el generador con el cliente.
            // Por qué: El 'pipeline' manejará automáticamente los errores. 
            // Si el cliente cierra la conexión, el generador de PDF se detendrá solo.
            await pipeline(
                pdfStream,
                res
            );

        } catch (error) {
            if(!res.headersSent) {
                console.error("Error en generación directa");
                res.status(500).json({ message: (error as Error).message });
            } else {
                res.end();
            }
        }
    };
}