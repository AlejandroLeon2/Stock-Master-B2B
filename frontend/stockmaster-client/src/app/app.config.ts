import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SearchProductsUseCase } from './core/application/use-cases/product/search-product.usecase';
import { ProductRepository } from './core/domain/repositories/product.repository';
import { ProductHttpRepository } from './core/infraestruture/repositories/product-http.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: ProductRepository, useClass: ProductHttpRepository },
    SearchProductsUseCase,
  ],
};
