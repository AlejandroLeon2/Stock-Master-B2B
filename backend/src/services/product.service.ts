import {
  Transaction,
} from "@google-cloud/firestore";
import { Filter } from "firebase-admin/firestore";
import { db } from "../config/firebase";

import type {
  Product,
  ProductDoc,
} from "../models/product.model";

export class ProductService {
  private productsCollection = db.collection("products");

  constructor() {}

  /**
   * Servicio para buscar productos (listado + paginación)
   * Ligero para búsquedas rápidas en B2B.
   */
  async searchProducts(params: {
    search: string;
    limit: number;
    page: number;
  }) {
    try {
      const searchTerm = params.search?.toUpperCase() ?? "";
      const page = params.page || 1;
      const limit = params.limit || 10;
      const offset = (page - 1) * limit;

      let query = this.productsCollection;

      // Sin término de búsqueda: solo paginación
      if (!searchTerm) {
        const snapshotTotal = await query.count().get();
        const totalProducts = snapshotTotal.data().count;

        const snapshot = await query.offset(offset).limit(limit).get();

        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        return {
          products,
          metadata: {
            count: totalProducts,
            pages: Math.ceil(totalProducts / limit),
          },
        };
      }

      // Con término de búsqueda: searchName, sku y searchArray
      const baseQuery = query.where(
        Filter.or(
          ...searchTerm
            .split(" ")
            .map((term) =>
              Filter.and(
                Filter.where("searchName", ">=", term),
                Filter.where("searchName", "<=", term + "\uf8ff")
              )
            ),
          Filter.and(
            Filter.where("sku", ">=", searchTerm),
            Filter.where("sku", "<=", searchTerm + "\uf8ff")
          ),
          Filter.and(
            Filter.where("searchArray", "array-contains", searchTerm)
          )
        )
      );

      const snapshotTotal = await baseQuery.count().get();
      const totalProducts = snapshotTotal.data().count;

      const snapshot = await baseQuery.offset(offset).limit(limit).get();

      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      return {
        products,
        metadata: {
          count: totalProducts,
          pages: Math.ceil(totalProducts / limit),
        },
      };
    } catch (error) {
      console.error("Search error", error);
      return { products: [], metadata: { count: 0, pages: 0 } };
    }
  }

  /**
   * Obtiene el detalle de un producto por ID
   * Ideal para la página de detalle en Angular.
   */
  async getProductById(id: string): Promise<Product | null> {
    const snap = await this.productsCollection.doc(id).get();

    if (!snap.exists) {
      return null;
    }

    return {
      id: snap.id,
      ...snap.data(),
    } as Product;
  }

  /**
   * Obtiene un mapa de productos por su ID
   * @param ids - Array de IDs de productos
   * @param tx - Transacción opcional
   * @returns Un mapa de productos con sus IDs como claves
   */
  async getProductsMapById(ids: string[], tx?: Transaction) {
    const handler = tx || db;

    const productsSnapshots = await handler.getAll(
      ...ids.map((id) => this.productsCollection.doc(id))
    );

    const products = productsSnapshots.reduce((acc, snap) => {
      acc[snap.id] = snap.data() as ProductDoc;
      return acc;
    }, {} as Record<string, ProductDoc>);

    return products;
  }
}
