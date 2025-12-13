import { Product } from '../models/product.model';

/**
 * The methods in this interface must be implemented by a concrete repository.
 */
export abstract class ProductRepository {
  /**
   * The `search` method searches for products based on the provided parameters.
   * The method returns a Promise that resolves to an array of `Product` objects.
   *
   * The `search` method is declared as an abstract method in the interface, which means it must be implemented by concrete repository classes.
   * Concrete repository classes are specific to the implementation details of the application and may use different data sources or technologies to implement the search functionality.
   */
  abstract search(params: { search?: string; page?: number; limit?: number }): Promise<Product[]>;
}
