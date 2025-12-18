import { Filter } from "firebase-admin/firestore";
import { db } from "../config/firebase";

export class ProductService {
  constructor() {}
  /**
   * Servicio para buscar productos con filtros opcionales
   */
  async searchProducts(params: {
    search?: string;
    limit?: number;
    page?: number;
    categoryId?: string;
    subcategoryId?: string;
    brand?: string;
    inStockOnly?: boolean;
  }) {
    try {
      const searchTerm = params.search?.toUpperCase() ?? "";
      const page = params.page || 1;
      const limit = params.limit || 10;
      const offset = (page - 1) * limit;

      let query = db.collection("products") as any;

      // Aplicar filtros de igualdad primero (Firestore requiere que estos se apliquen antes de OR)
      if (params.categoryId) {
        query = query.where("categoryId", "==", params.categoryId);
      }

      if (params.subcategoryId) {
        query = query.where("subcategoryId", "==", params.subcategoryId);
      }

      if (params.brand) {
        query = query.where("brand", "==", params.brand);
      }

      if (params.inStockOnly) {
        query = query.where("stockUnits", ">", 0);
      }

      // Aplicar búsqueda de texto si existe
      if (searchTerm) {
        const firstTerm = searchTerm.split(" ")[0];
        query = query.where(
          Filter.or(
            Filter.and(
              Filter.where("searchName", ">=", firstTerm),
              Filter.where("searchName", "<=", firstTerm + "\uf8ff")
            ),
            Filter.and(
              Filter.where("sku", ">=", searchTerm),
              Filter.where("sku", "<=", searchTerm + "\uf8ff")
            ),
            Filter.where("searchArray", "array-contains", searchTerm)
          )
        );
      }

      // Obtener total de productos (para paginación)
      const snapshotTotal = await query.count().get();
      const totalProducts = snapshotTotal.data().count;

      // Obtener productos paginados
      const snapshot = await query.offset(offset).limit(limit).get();

      let products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Si hay múltiples términos de búsqueda, filtrar en memoria para mayor precisión
      if (searchTerm && searchTerm.split(" ").length > 1) {
        const searchTerms = searchTerm.split(" ").filter((t) => t.length > 0);
        products = products.filter((product: any) => {
          const searchName = (product.searchName || "").toUpperCase();
          const sku = (product.sku || "").toUpperCase();
          const searchArray = product.searchArray || [];

          return searchTerms.every(
            (term) =>
              searchName.includes(term) ||
              sku.includes(term) ||
              searchArray.some((item: string) =>
                item.toUpperCase().includes(term)
              )
          );
        });
      }

      return {
        products,
        metadata: {
          count: searchTerm && searchTerm.split(" ").length > 1
            ? products.length
            : totalProducts,
          pages: Math.ceil(
            (searchTerm && searchTerm.split(" ").length > 1
              ? products.length
              : totalProducts) / limit
          ),
        },
      };
    } catch (error) {
      console.error("Search error", error);
      return { products: [], metadata: { count: 0, pages: 0 } };
    }
  }
}
