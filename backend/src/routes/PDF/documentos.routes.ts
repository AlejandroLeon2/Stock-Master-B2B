import { Router } from "express";
import { UserDocCheck } from "../../middlewares/PDF/documentCheck.middleware";
import streamDocController from "../../controllers/PDF/SteamDoc.controller";
import pdfController from "../../controllers/PDF/PDF.controller";
const router = Router();

// ruta para mostrar el pdf de factura
router.get("/factura/:orderDoc", UserDocCheck , (req, res, next) => streamDocController.streamPdf(req, res, "factura"));
// ruta para mostrar guias
router.get("/guide/:orderDoc", UserDocCheck , (req, res, next) => streamDocController.streamPdf(req, res, "guide"));

router.post("/", UserDocCheck, pdfController.emitGuia);

export default router;