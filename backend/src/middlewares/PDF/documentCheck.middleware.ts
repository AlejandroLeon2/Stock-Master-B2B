import { Request, Response, NextFunction } from "express";
import { db } from "../../config/firebase.js";

export const UserDocCheck = async (req: Request, res: Response, next: NextFunction) => {

    // obtenemos el uid de orders dentro de query
    const orderId = req.params.orderId as string;
    if (!orderId) {
        return res.status(400).json({ message: "Order ID is required in query params" });
    }
    // obetenemos valor uid de usuario autenticado
    const userId: string = req.headers.userid as string;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required in headers" });
    }
    // obtenemos el documento de la orden desde firestore
    try {
        const orderDoc = await db.collection("orders").doc(orderId).get();
        if(!orderDoc.exists) {
            return res.status(404).json({ message: "Order not found" });
        }
        const orderData = orderDoc.data() as { userId: string };
        // verificamos que el uid del usuario autenticado coincida con el uid de la orden
        if(orderData?.userId !== userId) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this document" });
        }
    } catch (error) {
        console.error("Error checking user document access:", (error as Error).message);
        return res.status(500).json({ message: "Internal server error" });
    }

    next();
};