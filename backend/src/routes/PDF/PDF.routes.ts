import { Router } from "express";
import { UserDocCheck } from "../../middlewares/PDF/UserDocCheck.middleware";
import { SteamDocController } from "../../controllers/PDF/SteamDoc.controller";

const router = Router();
const steamDocController = new SteamDocController();

// /v1/api/pdf/download/:pdfId  (ruta para mostrar o descargar un PDF desde su ID para usuarios autenticados)
router.get("/download/:pdfId", UserDocCheck , steamDocController.streamPdf);

// ruta de test para guardar un pdf de prueba en drive ruta es: /v1/api/pdf/test/save
router.get("/test/save", steamDocController.streamPdfDirect);

export default router;