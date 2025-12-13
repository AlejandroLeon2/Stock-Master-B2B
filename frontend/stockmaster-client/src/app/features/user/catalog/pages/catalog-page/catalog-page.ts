import { Component, inject, signal } from '@angular/core';
import { ProductSearch } from '../../components/product-search/product-search';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-catalog-page',
  imports: [ProductSearch],
  templateUrl: './catalog-page.html',
  styleUrls: ['./catalog-page.css'],
})
export class CatalogPage {
  catalogService = inject(CatalogService);

  products: unknown[] = [];
  loading = signal(false);
  /**
   * Maneja el cambio en el campo de búsqueda.
   * @param searchTerm - El término de búsqueda ingresado por el usuario.
   */
  onSearchChange(searchTerm: string) {
    this.catalogService.searchProducts(searchTerm);
  }
}
